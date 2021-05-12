import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import style from './Popup.module.css'
import {useSelector} from "react-redux"
import {selectThemeColor} from "../reducers/profileSlice"

//渲染挂载dom元素对象
const container = document.createElement('div')
document.body.appendChild(container)


export function Popup({children, title, onConfirm,clickAway,closeSelf}) {
    const themeColor = useSelector(selectThemeColor)

    return ReactDOM.createPortal(
        <div>
            <div className={style.mask} onClick={(e)=>clickAway&&closeSelf(e)}></div>
            <div className={style.content}>
                <div className={style.titleBar}>
                    {
                        onConfirm ?
                            <div onClick={closeSelf}>取消</div> :
                            <div className={style.close} onClick={closeSelf}></div>
                    }
                    <div>{title}</div>
                    <div className={style.confirm} style={{'color': themeColor}}>{onConfirm ? '确定' : undefined}</div>
                </div>
                <div className={style.operation}>
                    {children}
                </div>
            </div>
        </div>, container)
}


Popup.propTypes = {
    title: PropTypes.string, //名称
    closeSelf: PropTypes.func,
    onConfirm: PropTypes.func,
    clickAway:PropTypes.bool
}