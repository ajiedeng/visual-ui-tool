import {control} from '../logic'
import {getStatus} from "../reducers/deviceStatusSlice"
import {useSelector} from "react-redux"

export function useDeviceStatus(intfKey) {
    const status = useSelector(state => getStatus(state, intfKey))

    const setStatus = value => control({[intfKey]: value})

    return [status, setStatus]
}