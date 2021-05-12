import React from "react"
import {Button} from "../../components/Button"

import style from './Boolean.module.css'
import {useSetIntfEditableCallback} from "../../app/editableCallbackHooks"
import {useDeviceStatus} from "../../app/deviceStateHooks"

export const Boolean = ({id: intfKey, forwardedRef}) => {
    const [status, setStatus] = useDeviceStatus(intfKey)

    const {icon, name} = useSetIntfEditableCallback(intfKey, forwardedRef)

    return (<div className={style.Boolean}>
        <Button imgStr={icon} label={name} on={status === 1} onClick={() => {
            setStatus(status === 1 ? 0 : 1)
        }}/>
    </div>)
}