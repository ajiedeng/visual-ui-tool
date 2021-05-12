import React, {useState, useEffect} from 'react'
import classNames from 'classnames'
import './ProductConfigPage.css'
import style from './PreviewPanel.module.css'
const locationMap = new Map([['home','首页'],['setting','功能设置'],['timer','定时']]);
export const PreviewPanel = React.forwardRef(({location,setLocation,previewState,previewUrl},ref) => {
    const pageJump = (count)=>{
        setLocation([...locationMap][[...locationMap].findIndex((item)=>item[0]===location)+count][0])
    };

    useEffect(function () {

        Object.defineProperty(
            document.getElementsByTagName('iframe')[0].contentWindow.navigator,
            'userAgent',
            {
                get: function () {
                    return 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Mobile Safari/537.36'
                }
            })
        // console.error( document.getElementsByTagName('iframe')[0].contentWindow.navigator.userAgent)
    }, [])

    return (<div className={classNames('layer',style.PreviewPanel)}>
        <div className={style.iframeBox}>
            <iframe ref={ref}  src={previewUrl||'http://10.10.30.229:3001'}>
            </iframe>
            {previewState&&<div className={style.maskLayer}></div>}
        </div>
        <div className={style.previewControl}>
            <div className={classNames(style.btn,location ==='home'?style.hidden:'')} onClick={()=>pageJump(-1)}>上一页</div>
            <div>{locationMap.get(location)}</div>
            <div className={classNames(style.btn,location ==='timer'?style.hidden:'')} onClick={()=>pageJump(1)}>下一页</div>
        </div>
    </div>)
});
