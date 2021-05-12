import React from "react"

import {useSetIntfEditableCallback} from "../../app/editableCallbackHooks"
import {Item} from "./Item"
import {SwitchButton} from "../../components/SwitchButton"
import {useDeviceStatus} from "../../app/deviceStateHooks"

export const Boolean = ({id: intfKey, forwardedRef}) => {
    const [status, setStatus] = useDeviceStatus(intfKey)

    const {name} = useSetIntfEditableCallback(intfKey, forwardedRef)

    return <Item title={name}>
        <SwitchButton on={status === 1} onClick={() => setStatus(status === 1 ? 0 : 1)}/>
    </Item>
}