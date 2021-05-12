import JDSMART from './jdsmart'

const _standardStatus=function (platStatus) {
    const result={};
    if(platStatus.status+'' ==='1' ||platStatus.status+'' ==='0'){
        result['online'] = platStatus.status == '1'?'2':'3';
    }
    if(platStatus.device && platStatus.device.device_name){
        result['name'] =platStatus.device.device_name;
    }
    result['status'] ={};
    platStatus.streams.forEach(function ({stream_id,current_value}) {
        if(typeof current_value === 'string' && Number(current_value) === Number(current_value)){
            result['status'][stream_id+''] = Number(current_value);
        }else{
            result['status'][stream_id+''] = current_value;
        }

    });
    return result;
};
const _standardError=function (error) {
    return {
        message:error.errorInfo,
        code:error.errorCode,
        msg:error.errorInfo,
    };
};
const _platformCommand =function (status) {
    const command = [];
    Object.keys(status).forEach(function (p) {
        command.push({stream_id:p,current_value:status[p]})
    });
    return {command};
};
const setDeviceStatus=function (status) {
    const commands = _platformCommand(status);
    return new Promise(function(resolve, reject) {
        function onSucceed(data) {
            let response = typeof data === 'string' ? JSON.parse(data):data;
            if(response&&response.streams&&response.streams.length>0){
                resolve(_standardStatus(response));
            }else{
                resolve();
            }
        }
        function onFailed(e) {
            reject(_standardError(e));
        }
        JDSMART.io.controlDevice(commands, onSucceed,onFailed);
    });
};
const getDeviceStatus=function () {
    return new Promise(function(resolve, reject) {
        function onSucceed(data) {
            let response = typeof data === 'string' ? JSON.parse(data):data;
            resolve(_standardStatus(response));
        }
        function onFailed(e) {
            reject(_standardError(e));
        }
        JDSMART.io.getSnapshot(onSucceed,onFailed)
    })
};

const ready=function () {
    return new Promise(function(resolve, reject) {
        JDSMART.ready(resolve);
    }).then(function () {
        return getDeviceStatus();
    });
};

export default {
    platform:'jd',
    ready,
    setDeviceStatus,
    getDeviceStatus,
    platformSDK:JDSMART,
}