import React from 'react'
import {Popup} from "./Popup"
import {Button} from "./Button"
import style from './EnumPopup.module.css'

/*
    Map type 1:(纯文字)
    1:'mode1',2:'mode2',...
    [
        {
          "value":1,
          "text":"高"
        },{
          "value":2,
          "text":"中"
        },{
          "value":3,
          "text":"低"
        }
      ]

    Map type 2:(图片与文字)
    [
        {
          "value":1,
           "text":"高"
          "icon":""
        },{
          "value":2,
          "text":"中"
          "icon":""
        },{
          "value":3,
          "text":"低"
          "icon":""
        }
      ]
*/

export const EnumPopup = ({model, value, onItemClick ,...rest}) => {

    const children = []
    model.forEach(({value: val, text, icon}) => {
        let item
        if (icon) {
            item = <div key={val}>
                <Button onClick={()=> onItemClick(val)} imgStr={icon} label={text} on={value === val} isOnWhiteBg/>
            </div>
        } else {
            item = <div onClick={()=> onItemClick(val)} className={style.textItem} key={val}>{text}</div>
        }
        children.push(item)
    })


    return <Popup {...rest}>
        <div className={style.content}>
            {children}
        </div>

    </Popup>
}