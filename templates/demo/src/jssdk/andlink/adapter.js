import './hejia.js';

const Hejia = window.Hejia;
const device ={};

const _standardError=(msg,error) =>({
    message:msg|| error.resultCodeMessage,
    code:error.resultCode,
    msg:error.resultCodeDesc,
});

const commonFail = reject=>(msg, obj) =>{
    reject(_standardError(msg, obj));
};

const getDeviceStatus = params => new Promise(function(resolve, reject) {
    function onSucceed({parameters}) {
        try {
            const state = {
                /*
                 'online': '0/1/2/3',//设备状态:未知/本地/远程/离线(京东平台对应:在线/离线)
                */
                'online':'0',
                'name':device.name,
                'status':{}
            };
            parameters.forEach(({name,value}) => {
                if(name === 'connectionStatus'){
                    state.online = value==='0'?'3':'2';
                }else{
                    state.status[name] = value;
                }
            });

            resolve(state);
        }catch (e){
            reject(e);
        }

    }
    const onFailed = commonFail(reject);

    if(params && Array.isArray(params)){
        Hejia.getCurrentParam({ paramName: params },onSucceed,onFailed);
    }else{
        Hejia.getCurrentParam(onSucceed,onFailed)
    }
});
/*
     andlink文档示例代码  https://open.home.komect.com/jssdk/doc/andlink.html
    Hejia.setControlParam({
        parameters: {
            param: [{
                name: 'outletStatus',
                content: '1'
            }]
        }
    }, function() {
        // success, no response
    }, function(msg, obj) {
        // msg - String => error message
        // obj – Object => { resultCode:!0, resultCodeMessage: string }
        alert(msg);
        alert(obj.resultCode + obj.resultCodeMessage);
    });
*/
const setDeviceStatus = status=> new Promise(function(resolve, reject) {
    function onSucceed() {
        // success, no response
        resolve();
    }

    const onFailed = commonFail(reject);

    const param = [];
    Object.keys(status).forEach(p=>param.push({
        name: p,
        content: status[p]
    }));

    Hejia.setControlParam({parameters:{param}},onSucceed,onFailed)
});

const _getDeviceInfo = ()=>new Promise(function(resolve, reject) {
    Hejia.getDeviceInfo(resolve, commonFail(reject));
});


const ready = ()=>new Promise(function(resolve, reject) {
    Hejia.ready(resolve);
})
    .then(()=>_getDeviceInfo())
    .then(info=>{
        Object.defineProperty(device, "id", {
            value: info.device.id || null,
            writable: false
        });
        Object.defineProperty(device, "name", {
            value: info.device.desc || null,
            writable: false
        });

        return getDeviceStatus()
    });

export default {
    platform:'andlink',
    ready,
    setDeviceStatus,
    getDeviceStatus,
    platformSDK:Hejia,
}

