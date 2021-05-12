import React from "react"
import style from "./Item.module.css"

export function Item({title,onClick,children}) {

    return (<div onClick={onClick} className={style.item}>
        <span className={style.right}>{title}</span>
        {children}
    </div>)
}