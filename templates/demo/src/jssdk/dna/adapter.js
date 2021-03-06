import {callNative, deviceInfoPromise, dnaControl} from "./call-native";
import {combine, split} from "./utils";
import task from "./task";
import taskV2 from "./taskV2";
import navbar from "./navbar";

const _getDeviceInfo = function () {
    return callNative('deviceinfo');
};

const _controlStatus = function (status=[],action) {
    let act, params =[],vals =[];

    if(Array.isArray(status)){
        act = 'get';
        params = status;
    }else if(typeof status ==='object'){
        act = action;
        ({params,vals} = split(status));
    }

    return dnaControl({act,params,vals}).then((response)=>({
        status :combine(response.data)
    }));

};

const setDeviceStatus = function (status) {
    return _controlStatus(status,'set');
};


const getDeviceStatus = function (params) {

    return _getDeviceInfo().then(function (info) {
        const deviceStatus = info.deviceStatus+'';
        if(deviceStatus!=='3' && deviceStatus!=='0'){
            return _controlStatus(params,'get').then(function (result) {
                result['online']= deviceStatus;
                result['name']= info.deviceName;
                return result;
            });
        }else{
            return {online:deviceStatus,name:info.deviceName}
        }
    }).catch(function (e) {
        console.error(e);
        throw e||new Error('getDeviceStatus failed');
    });
};

const platformSDK = (() => {

    const closeWebView =  function (){
        return callNative("closeWebView",[]);
    };
    const openDevicePropertyPage =  function (){
        return deviceInfoPromise.then((info)=>callNative("openDevicePropertyPage",[{did:info.deviceID}]));
    };

    return {
        task,
        taskV2,
        navbar,
        closeWebView,
        openDevicePropertyPage,
        getDevice:()=>deviceInfoPromise.then(device=>device),
        callNative
    };
})();

const ready = ()=>deviceInfoPromise;

export default {
    platform:'dna',
    ready,
    setDeviceStatus,
    getDeviceStatus,
    platformSDK,
}
