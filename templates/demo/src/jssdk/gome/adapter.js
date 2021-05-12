import GS from './gomesmart'

const device = new GS.Device();
let readyFlag = false;
let currentState={
    status:{},
    online:'2',
};
let theCallback;

const setDeviceStatus = function (status) {

    const as = [],values =[];
    Object.keys(status).forEach(function (p) {
        as.push(parseInt(p));
        values.push(status[p]);
    });
    device.opt(as, values);
    return Promise.resolve();
};

const getDeviceStatus = function () {
    return Promise.resolve(currentState);

};

const onStatusChanged =function (callback) {
    theCallback = callback;
};


const ready =function () {

    return new Promise(function(resolve, reject) {

        device.setOnlineListener(function(result){
            // “0/1/2/3” 设备状态 未知/本地/远程/离线
            const online = result=='0'?'3':'2';
            currentState.online = online;
            //设备不在线setOnPostListener的callback方法不会被调用
            if(online === '3'){
                resolve(currentState);
            }
            theCallback && theCallback({online})
        });


        device.setOnPostListener(function(data){
            console.log(data);
            const as = JSON.parse(data)["as"];
            currentState.status = {...currentState.status,...as};
            if(!readyFlag){
                resolve(currentState);
                readyFlag = true;
            }
            theCallback && theCallback({status:as})
        });
    })
};


const platformSDK =function () {
    return device;
};

export default {
    platform:'gome',
    ready,
    setDeviceStatus,
    getDeviceStatus,
    platformSDK,
    onStatusChanged
}
/*
    device.setOnPostListener(function(data){
        console.log(data);
        var as = JSON.parse(data)["as"];
        for (var key in as) {
            if (key == "0") {
                as0 = as[key];
                if(as0=="0")
                {
                    //属性0的功能逻辑
                }
                else{

                }
            }
        }
    });

    device.setOnlineListener(function(result){
        if(result=="0"){
            //离线逻辑
        }else {
            //在线逻辑
        }
    })
 */


