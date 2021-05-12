import React from 'react'
import style from './Setting.module.css'
import {useSelector} from "react-redux"
import {updateContainerSettings, selectProfile, selectContainers} from "../../reducers/profileSlice"
import {BOOLEAN_TYPE, ENUM_TYPE, getIntfType} from "../../reducers/profileUtils"
import {Boolean} from "./Boolean"
import {Enum} from "./Enum"
import {editAble} from "../../components/editable"
import {useSetEditableCallback} from "../../app/editableCallbackHooks"
import {NavBar} from "../../components/NavBar"


const EditableEnum = editAble(Enum, true)
const EditableBoolean = editAble(Boolean, true)
const EditableContainer = editAble(Container)

function Container({id, forwardedRef}) {
    const keys = useSelector(state => selectContainers(state).settingsPage)
    const profile = useSelector(selectProfile)

    useSetEditableCallback(forwardedRef,
        () =>(
            {
                key: id,
                schema: {
                    "type": "array",
                    "items": {
                        "type": "string",
                    },
                    "default": keys
                }
            }
        ),
        (dispatch, updates) => dispatch(updateContainerSettings(updates)))

    return (
        <div className={style.page}>
            <NavBar title={'功能设置'} homePage={false}/>
            {
                keys.map(key=>{
                    const type = getIntfType(profile, key)
                    if (type === ENUM_TYPE) {
                        return <EditableEnum key={key} id={key}/>
                    } else if (type === BOOLEAN_TYPE) {
                        return <EditableBoolean key={key} id={key}/>
                    }
                })
            }
        </div>
    )
}

export function Setting() {

    return (
        <EditableContainer id={'settingsPage'}/>
    )
}