import {addIntf, toggleIntf, updateGlobalSettings,init} from "../reducers/profileSlice"
import {toggleEditingFlag} from "../reducers/liveEditSlice"
import store from '../app/stroe'
// export const GLOBAL_SCHEMA= 'GLOBAL_SCHEMA', GLOBAL_JSON ="GLOBAL_JSON",
//     COMPONENT_SCHEMA ="COMPONENT_SCHEMA",COMPONENT_JSON="COMPONENT_JSON",
//     ADD_INTF ="ADD_INTF",TOGGLE_INTF = "TOGGLE_INTF",
//     TOGGLE_PREVIEW_FLAG = 'TOGGLE_PREVIEW_FLAG',
//     DEVICE_INTFS_INFO = 'DEVICE_INTFS_INFO',
// CHANGE_LOCATION = 'CHANGE_LOCATION'

type ReceiveMessageType = "GLOBAL_JSON"|"COMPONENT_JSON"|"ADD_INTF"| "TOGGLE_INTF"|'TOGGLE_PREVIEW_FLAG'|'CHANGE_LOCATION'
    |'REQUEST_SAVE_ALL_SETTINGS'|'INIT_SETTINGS'

type PostMessageType = "COMPONENT_SCHEMA"|'GLOBAL_SCHEMA'|'DEVICE_INTFS_INFO'|'SAVE_ALL_SETTINGS'|"READY"

type Updaters = {
    [p:string]:Function
}
const updaters:Updaters = {
}

export const postGlobalSchema = (schema:any) => {
    postMessage('GLOBAL_SCHEMA', schema)
}

export const postReadyEvent = ()=>{
    postMessage("READY",{})
}

export const postProfileInfo = (schema:any) => {
    postMessage('DEVICE_INTFS_INFO', schema)
}

export const postMessage = (type:PostMessageType,payload:any) =>{
    console.error('-------send message---------')
    console.error(type,JSON.stringify(payload))
    console.error('-------send message over---------')
    // if(window.top !==  window){
        window.top.postMessage({type,payload},'*')
    // }
}

export const postComponentSchema = (data:any,handler:any) =>{
    updaters[data.key] = handler
    postMessage('COMPONENT_SCHEMA',data)
}

const postSaveFiles = ()=>{
    let state = store.getState()
    const files = {
        'profile.json':JSON.stringify(state.profile.profile),
        'settings.json':JSON.stringify(state.profile.uiSettings),
        'profileStrings/zh.json':JSON.stringify(state.profile.strings)
    }
    postMessage('SAVE_ALL_SETTINGS', {
        files
    })
}

export const onReceiveMessage = (dispatch:any,history:any) => (event:any) => {
    console.error('onReceiveMessage :',JSON.stringify(event.data))
    if(!event.data){
        return ;
    }
    const {payload} = event.data
    const type = <ReceiveMessageType> event.data.type
    switch (type) {
        case "COMPONENT_JSON":
            if(!payload.key){
                console.error("收到组件配置但未能找到key")
                return ;
            }
            if(!updaters[payload.key]){
                console.error("未能找到callback函数，无法更新")
                return ;
            }
            let handler = updaters[payload.key]
            handler(dispatch,payload)
            break
        case "GLOBAL_JSON":
            dispatch(updateGlobalSettings(payload))
            break
        case "TOGGLE_PREVIEW_FLAG":
            dispatch(toggleEditingFlag(!payload))
            break
        case "ADD_INTF":
            dispatch(addIntf(payload))
            break
        case "TOGGLE_INTF":
            dispatch(toggleIntf(payload))
            break
        case "CHANGE_LOCATION":
            window.location.hash = payload.location
            break
        case "REQUEST_SAVE_ALL_SETTINGS":
            postSaveFiles()
            break
        case "INIT_SETTINGS":
            dispatch(init(payload))
            break
        default:
            let never:never = type
    }
}