import {Item} from "./Item"
import React, {Fragment, useMemo, useState} from "react"
import style from "./Enum.module.css"
import {EnumPopup} from "../../components/EnumPopup"
import {useSetIntfEditableCallback} from "../../app/editableCallbackHooks"
import {useDeviceStatus} from "../../app/deviceStateHooks"

export const Enum = ({id: intfKey, forwardedRef}) => {
    const [showPopup, setShowPopup] = useState(false)
    const {name, items} = useSetIntfEditableCallback(intfKey, forwardedRef)
    const [status, setStatus] = useDeviceStatus(intfKey)

    const onItemClick = value => {
        if (value !== status) {
            setStatus(value)
        }
    }

    const currentValText = useMemo(() => {
        for (let i = 0; i < items.length; i++) {
            if (status + '' === items[i].value + '') {
                return items[i].text
            }
        }
    }, [status, items])

    return <Fragment>
        <Item title={name} onClick={() => setShowPopup(true)}>
            <div className={style.content}>
                {currentValText}
            </div>
        </Item>
        {showPopup &&
        <EnumPopup model={items} clickAway value={status} onItemClick={onItemClick} title={name} closeSelf={(e) => {
            setShowPopup(false)
            e.stopPropagation()
        }}/>
        }
    </Fragment>
}