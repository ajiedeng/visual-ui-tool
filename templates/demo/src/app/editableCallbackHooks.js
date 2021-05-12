import {useImperativeHandle} from "react"
import {useSelector} from "react-redux"
import {BOOLEAN_TYPE, ENUM_TYPE, getIntfType} from "../reducers/profileUtils"
import {selectProfile, selectSettingsByIntf, updateIntfSettings} from "../reducers/profileSlice"
import {booleanSchema, enumSchema} from "./preseSchema"

export function useSetEditableCallback(ref, getSchema, updater) {
    useImperativeHandle(ref, () => {
        return {
            handleUpdate: updater,
            getSchema: getSchema
        }
    }/*, [forwardedRef]*/)
}


export function useSetIntfEditableCallback(intfKey,forwardedRef) {
    const settings = useSelector(state => selectSettingsByIntf(state, intfKey))
    const type = useSelector(state => getIntfType(selectProfile(state), intfKey))

    let getSchema
    if (type === BOOLEAN_TYPE) {
        getSchema = () => booleanSchema(intfKey, settings)
    } else if (type === ENUM_TYPE) {
        getSchema = () => enumSchema(intfKey, settings)
    }

    useSetEditableCallback(forwardedRef, getSchema,
        (dispatch, updates) => dispatch(updateIntfSettings(updates)))

    return settings
}