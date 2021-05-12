/*
 * hejia-jssdk v1.1.0 (http://open.home.komect.com/dev/index.jsp)
 * @Copyright 2014-2018 The CMCC HY Authors (http://hy.10086.cn/)
 * @Licensed under ISC (https://opensource.org/licenses/isc)
 */
!function(){"use strict";"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,n){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),i=1;i<arguments.length;i++){var a=arguments[i];if(null!=a)for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},writable:!0,configurable:!0});var e=function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e};var n=null,t=null,i={getUrlParam:function(e,n){if(!e)throw new Error("Hejia.utils.getUrlParam parameter url is required.");if(!n)throw new Error("Hejia.utils.getUrlParam parameter key is required.");return decodeURIComponent(e).replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(n).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1").split("#")[0]},isNullOrUndefined:function(e){return null==e},isObject:function(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)},isFunction:function(e){return null!=e&&"[object Function]"===Object.prototype.toString.call(e)}};function a(a){var r,o,l,c,s,u,d,f,g,p,w,m,v,b,O,h,I,y,H,j,C;n=a,window.Hejia=Object.assign(window.Hejia,(m=n,v=i,b="phoneNumber",O="area",h="loginType",I="account",y="gatewayMAC",H="gatewaySN",j="deviceId",C="appVersion",{getPhoneNumber:function(e,n){m.callHandler("getInfomation",{key:b},function(t){t?e(t):n()})},getUserArea:function(e,n){m.callHandler("getInfomation",{key:O},function(t){t?e(t):n()})},getLoginType:function(e,n){m.callHandler("getInfomation",{key:h},function(t){v.isNullOrUndefined(t)?n():(t=t.toString(),e(t))})},getAccount:function(e,n){m.callHandler("getInfomation",{key:I},function(t){t?e(t):n()})},getGatewayMAC:function(e,n){m.callHandler("getInfomation",{key:y},function(t){t?e(t):n()})},getGatewaySN:function(e,n){m.callHandler("getInfomation",{key:H},function(t){t?e(t):n()})},getDeviceId:function(e,n){m.callHandler("getInfomation",{key:j},function(t){t?e(t):n()})},getAppVersion:function(e,n){m.callHandler("getInfomation",{key:C},function(t){t?e(t):n()})},addLog:function(e){m.callHandler("addLog",e)},isAppInstalled:function(e,n,t){m.callHandler("isAppInstalled",e,function(e){"1"==(e=e.toString())?n(e):t(e)})}}),(w=n,{setToolbarItems:function(e){w.callHandler("setToolbarItems",e)},openUrl:function(e){w.callHandler("openUrl",e)},closeWebView:function(){w.callHandler("closeWebView")},refreshWebView:function(){w.callHandler("refreshWebView")}}),(u=n,d=1,f=2,g=4,p=5,{shareToWeChatMessage:function(e,n,t){u.callHandler("shareImageToOtherAPP",Object.assign(e,{platformType:d}),function(e){"1"==e?n(e):t(e)})},shareToWeChatTimeLine:function(e,n,t){u.callHandler("shareImageToOtherAPP",Object.assign(e,{platformType:f}),function(e){"1"==e?n(e):t(e)})},shareToQQ:function(e,n,t){u.callHandler("shareImageToOtherAPP",Object.assign(e,{platformType:g}),function(e){"1"==e?n(e):t(e)})},shareToQZone:function(e,n,t){u.callHandler("shareImageToOtherAPP",Object.assign(e,{platformType:p}),function(e){"1"==e?n(e):t(e)})}}),(r=n,o=i,s=0,{checkIfReadyForAndlink:function(e,n){r.callHandler("checkIfReadyForAndlink",null,function(t){var i=o.isNullOrUndefined(t)?{}:window.JSON.parse(t);parseInt(i.resultCode,10)===s?o.isFunction(e)&&e(i.resultCodeMessage):o.isFunction(n)&&n(i.resultCodeMessage,i)})},startAndlink:function(e,n,t){o.isObject(e)||(t=n,n=e,e={});var i=Object.assign({},{deviceType:o.getUrlParam(window.location.href,"deviceType")},e);r.callHandler("startAndlink",i,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n(i.deviceId):o.isFunction(t)&&t(i.resultCodeMessage,i)})},updateAndlinkPlugin:function(e,n,t){o.isObject(e)||(t=n,n=e,e={}),r.callHandler("updateAndlinkPlugin",e,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n(i.resultCodeMessage):o.isFunction(t)&&t(i.resultCodeMessage,i)})},getCurrentParam:function(e,n,t){o.isObject(e)||(t=n,n=e,e={});var i=Object.assign({},{deviceId:o.getUrlParam(window.location.href,"deviceId")},e);r.callHandler("fetchDeviceCurrentParam",i,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n(i.devices[0]||{}):o.isFunction(t)&&t(i.resultCodeMessage,i)})},getHistoryParam:function(e,n,t){var i=Object.assign({},{deviceId:o.getUrlParam(window.location.href,"deviceId")},e);r.callHandler("fetchDeviceHistoryParam",i,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n(i.readings||[]):o.isFunction(t)&&t(i.resultCodeMessage,i)})},getAlarmParam:function(e,n,t){var i=Object.assign({},{deviceId:o.getUrlParam(window.location.href,"deviceId")},e);r.callHandler("fetchDeviceAlarmParam",i,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n(i.alerts||[]):o.isFunction(t)&&t(i.resultCodeMessage,i)})},setControlParam:function(e,n,t){var i=Object.assign({},{deviceId:o.getUrlParam(window.location.href,"deviceId")},e);r.callHandler("fetchDeviceControlParam",i,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n():o.isFunction(t)&&t(i.resultCodeMessage,i)})},getDeviceInfo:(l=function(e,n,t){r.callHandler("fetchDeviceInfo",e,function(e){var i=o.isNullOrUndefined(e)?{}:window.JSON.parse(e);parseInt(i.resultCode,10)===s?o.isFunction(n)&&n({device:i.device,location:i.location}):o.isFunction(t)&&t(i.resultCodeMessage,i)})},c="deviceId",function(){var n=null,t=null,i=null,a=Array.prototype.slice.call(arguments,0);return o.isObject(a[0])||(t=a[0],n=a[1],i={}),c&&(i=Object.assign({},e({},c,o.getUrlParam(window.location.href,c)),i||a[0])),l.call(this,i,t||a[1],n||a[2])}),onMessage:function(e){function n(n){var t=JSON.parse(n);"function"==typeof e&&e.call(this,t)}return r.registerHandler("onMessage",n),window.onMessage=n}})),t&&t()}window.Hejia=window.Hejia||{ready:function(e){t=i.isFunction(e)?e:function(){}},utils:i},function(e){if(window.WebViewJavascriptBridge)return e(window.WebViewJavascriptBridge);if(document.addEventListener("WebViewJavascriptBridgeReady",function(){e(window.WebViewJavascriptBridge)},!1),window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var n=document.createElement("iframe");n.style.display="none",n.src="https://__bridge_loaded__",document.documentElement.appendChild(n),setTimeout(function(){document.documentElement.removeChild(n)},0)}(function(e){a(e)})}();