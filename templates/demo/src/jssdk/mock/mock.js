
let currentState = (function () {
    /* eslint-disable */
    const intfs = PROFILE.suids && PROFILE.suids[0] && PROFILE.suids[0].intfs;
    /* eslint-enable */
    if(!intfs){
        throw new Error('profile error!');
    }
    const status = {};
    Object.keys(intfs).forEach(function (p) {
        const descriptor = intfs[p][0];
        // 1 表示枚举型
        // 2 表示连续型
        // 3 表示简单类型
        const type = descriptor.in[0];

        if(type === 1){
            //[1, V1,V2,V3]
            // {"act": 3,"idx": 1,"ifttt": 0,"in": [1,0,1]}
            status[p] = descriptor.in[0];
        }else if(type === 2){
            //[2, 最小值，最大值，步长，倍数]
            // { "act": 1,"idx": 1,"ifttt": 0, "in": [ 2,0,255,1,1] }
            status[p] = descriptor.in[1];
        }else if(type === 3){
            status[p] = null;
        }else{
            console.log(`unsupported param type ${p} :${type}`)
        }
    });

    return {
        status,
        online:'1',
        name:'mock device'

    };

})();

let _statusChangedCallback;

const ready =function () {
    return Promise.resolve(currentState);
};

const setDeviceStatus =function (status) {
    const newStatus = Object.assign({}, currentState.status,status);
    currentState.status = newStatus;
    if(_statusChangedCallback){
        _statusChangedCallback(currentState);
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(currentState)
        },3000)
    });
};

const getDeviceStatus =function () {
    return Promise.resolve(currentState);
};

const onStatusChanged =function (fn) {
    _statusChangedCallback = fn;
};

export default {
    platform:'mock',
    ready,
    setDeviceStatus,
    getDeviceStatus,
    onStatusChanged
}
