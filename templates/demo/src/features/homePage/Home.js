import React from 'react'
import logo from './socketIcon.png'
import style from './Home.module.css'
import {useSelector} from "react-redux"
import {Enum} from "./Enum"
import {
    selectContainers,
    selectProfile,
    selectThemeColor,
    updateContainerSettings
} from "../../reducers/profileSlice"
import {BOOLEAN_TYPE, ENUM_TYPE, getIntfsFromProfile, getIntfType} from "../../reducers/profileUtils"
import {editAble} from "../../components/editable"
import {Boolean} from "./Boolean"

import {useSetEditableCallback} from "../../app/editableCallbackHooks"
import {NavBar} from "../../components/NavBar"
import {useHistory} from "react-router-dom"

const EditableEnum = editAble(Enum, true)
const EditableBoolean = editAble(Boolean, true)
const EditableBottom = editAble(Bottom)

export function Home() {
    const themeColor = useSelector(selectThemeColor)
    const history = useHistory();

    return (
        <div className={style.App} style={themeColor && {'background':themeColor}}>
            <NavBar homePage title={'设备名称'} subtitle={'房间'} right={{text:'功能设置',handler:()=>history.push('setting')}}/>
            <div className={style.socket}><img src={logo} alt=''/></div>
            <EditableBottom id='homePageOperate'/>
            {/*<Popup title={'模式'}/>*/}
        </div>
    )
}


function Bottom({id,forwardedRef}) {
    const profile = useSelector(selectProfile)
    const intfs = getIntfsFromProfile(profile)
    const operateContainer = useSelector(state => selectContainers(state).homePageOperate)
    useSetEditableCallback(forwardedRef,
        () => {
            return {
                key: id,
                schema: {
                    "type": "array",
                    "items": {
                        "type": "string",
                    },
                    "default": operateContainer
                }
            }
        },
        (dispatch, updates)=>dispatch(updateContainerSettings(updates))
        )
    return <div className={style.btnBottom}>
        {
            operateContainer.map(key => {
                const type = getIntfType(profile, key)
                if (type === ENUM_TYPE) {
                    return <EditableEnum key={key} id={key}/>
                } else if (type === BOOLEAN_TYPE) {
                    return <EditableBoolean key={key} id={key}/>
                }
            })
        }
    </div>

}
