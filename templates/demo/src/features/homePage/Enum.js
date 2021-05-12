import React, {useState} from 'react'
import {EnumPopup} from "../../components/EnumPopup"
import {Button} from "../../components/Button"
import {useDeviceStatus} from "../../app/deviceStateHooks"
import {useSetIntfEditableCallback} from "../../app/editableCallbackHooks"

export const Enum = ({id: intfKey, forwardedRef}) => {
    const [showPopup, setShowPopup] = useState(false)
    const {name,items,icon} = useSetIntfEditableCallback(intfKey, forwardedRef)
    const [status, setStatus] = useDeviceStatus(intfKey)

    const onItemClick = value => {
        if (value !== status) {
            setStatus(value)
        }
    }

    return (<div onClick={() => {
        setShowPopup(true)
    }}>
        <Button imgStr={icon} label={name}/>
        {showPopup &&
        <EnumPopup model={items} clickAway value={status} onItemClick={onItemClick} title={name} closeSelf={(e) => {
            setShowPopup(false)
            e.stopPropagation()
        }}/>}
    </div>)
}