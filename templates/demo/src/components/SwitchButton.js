import style from './SwitchButton.module.css'
import React from 'react'
import classNames from 'classnames'
import {useSelector} from "react-redux"
import {selectThemeColor} from "../reducers/profileSlice"

export function SwitchButton({on,onClick}) {

    const handClick = on=>onClick(on)
    const themeColor = useSelector(selectThemeColor)
    const themeColorStyle = on&&themeColor ? {'background':themeColor} :undefined
    return (
        <div className={style.btn} onClick={handClick}>
            <p className={classNames({[style.on]:on})} style={themeColorStyle}></p>
        </div>
    );
}