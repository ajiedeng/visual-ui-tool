import React from 'react';
import classnames from 'classnames'

import style from './StepButton.module.css'

export const LastStep = ({onClick})=>{
    return (
            <div onClick={onClick} className={classnames({[style.btn]:true,[style.previous]:true})}>返回</div>
    )
}

export const Preview = ({onClick,on})=>{
    return (
        <div onClick={onClick} className={classnames(style.btnLight,style.btn,on?style.active:'')}>实时预览</div>
    )
}

export const NextStep = ({onClick})=>{
    return (
            <div onClick={onClick} className={classnames({[style.btn]:true,[style.active]:true})}>下一步</div>
    )
}

export const NormalButton = ({onClick,on,text})=>{
    return (
        <div onClick={onClick} className={classnames({[style.btn]:true,[style.active]:on})}>{text}</div>
    )
}
