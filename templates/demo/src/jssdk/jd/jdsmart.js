// if the module has no dependencies, the above pattern can be simplified to
;(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
        // eslint-disable-next-line
    }else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // eslint-disable-next-line
        define([], factory);
    }else {
        // Browser globals (root is window)
        root.JDSMART = factory();
    }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    var JSBridge;
    var readyCallback;
    function init(config) {
        JSBridge = config.bridge;
        JSBridge.init(function(msg,callback){
        });
        readyCallback();
    }

    function ready(fn) {
        readyCallback = fn;
    }

    var fn = {
        getSnapshot:function(successCallback,failedCallback){
            JSBridge.send({type:'getSnapshot'},function(result){

                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getSnapshotByMode:function(mode,successCallback,failedCallback){
            JSBridge.send({type:'getSnapshot',data:mode},function(result){

                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getUserId:function(successCallback,failedCallback){
            JSBridge.send({type:'getUserId'},function(result){

                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getWifiHistory:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getWifiHistory',data:params},function(result){

                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        initDeviceData:function(successCallback){
            JSBridge.send({type:'initDeviceData'},function(result){
                successCallback(result);
            });
        },
        controlDevice:function(params, successCallback,failedCallback){
            JSBridge.send({type:'controlDevice', data:params["command"]},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getHistory:function(successCallback){
            JSBridge.send({type:'history'},function(result){
                successCallback(result);
            });
        },
        getDeviceHistoryData:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getDeviceHistoryData',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },getKeyUsers:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getKeyUsers',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getIftttInfoByDeviceInfo:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getIftttInfoByDeviceInfo',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        cleanDeviceHistoryData:function(params,successCallback,failedCallback){
            JSBridge.send({type:'cleanDeviceHistoryData',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        writeAliasOfKey:function(params,successCallback,failedCallback){
            JSBridge.send({type:'writeAliasOfKey',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        unbindKeys:function(params,successCallback,failedCallback){
            JSBridge.send({type:'unbindKeys',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getSmartLockRecords:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getSmartLockRecords',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        deleteSmartLockRecords:function(params,successCallback,failedCallback){
            JSBridge.send({type:'deleteSmartLockRecords',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        clearKeysHistory:function(params,successCallback,failedCallback){
            JSBridge.send({type:'clearKeysHistory',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getRecipeList:function(params, successCallback,failedCallback){
            JSBridge.send({type:'getRecipeList', data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getRecipeDetail:function(params, successCallback,failedCallback){
            JSBridge.send({type:'getRecipeDetail', data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        excuteRecipe:function(params, successCallback,failedCallback){
            JSBridge.send({type:'excuteRecipe', data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getCurrentRecipe:function(params, successCallback,failedCallback){
            JSBridge.send({type:'getCurrentRecipe', data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        }


    };

    var app = {
        getNetworkType:function(successCallback){
            JSBridge.send({type:'getNetworkType'},function(result){
                successCallback(result);
            });
        },
        openUrl:function(url){
            JSBridge.send({type:'openUrl', url:url});
        },
        config:function(data){
            JSBridge.send({type:'config',data:data});
        },
        addSubDevice:function(data){
            JSBridge.send({type:'addSubDevice',data:data});
        },
        jumpSubDevice:function(data){
            JSBridge.send({type:'jumpSubDevice',data:data});
        },
        jumpNativePage:function(data){
            JSBridge.send({type:'jumpNativePage',data:data});
        },
        alert:function(data,successCallback){
            JSBridge.callHandler('showAlertView', data, function(response) {
                successCallback(response);
            });
        },
        toast:function(data,successCallback){
            JSBridge.callHandler('messageToast', data, function(response) {
                successCallback(response);
            });
        },
        loading:function(show){
            JSBridge.send({type:'loading', show:show});
        }
    };

    var util = {
        get:function(url,callBack){
            JSBridge.send({type:'get',url:url},function(result){
                callBack(result);
            });
        },

        post:function(url,params,callBack){
            JSBridge.send({type:'post',url:url, data:params},function(result){
                callBack(result);
            });
        },
        configActionBar:function(params){
            JSBridge.send({type:'configActionBar',data:params},function(result){

            });
        },
        closeWindow:function(){
            JSBridge.send({type:'closeWindow'},function(result){

            });
        },
        getToken:function(appkey,callBack){
            JSBridge.send({type:'token',data:appkey},function(result){
                callBack(result);
            });
        }
    };

    var ble = {
        queryBleSnapshot:function(params,successCallback,failedCallback){
            JSBridge.send({type:'queryBleSnapshot',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        sendDataToBle:function(params,successCallback,failedCallback){
            JSBridge.send({type:'sendDataToBle',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        localBleControl:function(params,successCallback,failedCallback){
            JSBridge.send({type:'localBleControl',data:params["command"]},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getBleControl:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getBleControl ',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        getBleHistory:function(params,successCallback,failedCallback){
            JSBridge.send({type:'getBleHistory',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        },
        deleteBleHistory:function(params,successCallback,failedCallback){
            JSBridge.send({type:'deleteBleHistory',data:params},function(result){
                if (result.status != 0) {
                    if (failedCallback)
                        failedCallback(result.error);
                } else {
                    successCallback(result.result);
                }
            });
        }
    };

    var JDSMART = {
        init: init,
        ready:ready,
        io:fn,
        app:app,
        util:util,
        ble:ble
    }

    document.addEventListener('JDSmartBridgeReady', function onReady(ev) {
        JDSMART.init({'bridge':ev.bridge});
    });

    return JDSMART;
}));


