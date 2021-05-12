import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    BOOLEAN_TYPE,
    ENUM_TYPE,
    getEnumValueName,
    getEnumValues,
    getIntfName,
    getIntfsFromProfile,
    getIntfType,
    getItemFromProfile,
    getItemFromStrings,
    Intf,
    IntfString,
    IntfType,
    Profile,
    ProfileStrings
} from "./profileUtils"
import {RootState} from "./index"
import {getSelector} from "./getSelectors"
import {array, func} from "prop-types"
// import profile from '../dependents/profile.json'
// import settings from '../dependents/settings.json'
// import strings from '../dependents/profileStrings/zh.json'

const profile = require('../dependents/profile.json')
const settings = require('../dependents/settings.json')
const strings = require('../dependents/profileStrings/zh.json')

type UiSettings = {
    global: GlobalSetting;
    component: {
        [prop: string]: BooleanSetting | EnumSetting;
    },
    container: {
        homePageReadonly: string[];
        homePageOperate: string[];
        settingsPage: string[];
    }
}
export type GlobalSetting = {
    updateStrategy: 'immediate' | 'success' | 'loop',
    themeColor: string
}
type BooleanSetting = {
    location: 'home' | 'setting';
    addToTimer: boolean;
    icon: string;
}
type EnumSettingItem = {
    value: number;
    icon: string;
}
type EnumSetting = BooleanSetting & {
    style: "text&icon" | "text";
    items: EnumSettingItem[]
}
type ProfileState = {
    profile: Profile,
    strings: ProfileStrings,
    uiSettings: UiSettings
}

type AddIntf = {
    key: string;
    name: string;
    type: IntfType;
    items: [
        EnumSettingItem & { text: string }
        ]
} & Pick<EnumSetting, 'location' | 'style' | 'addToTimer' | 'icon'> & Pick<Intf, 'act' | 'enable'>

type UpdateIntf = {
    key: string;
    json: Omit<AddIntf, 'type' | 'key' | 'enable' | 'act'>
}

const updateContainerArray = (state: ProfileState) => {
    /*
    * 下面的3个数组分别为：首页上方只读参数的数组、首页下方操作区域的功能参数数组、功能参数'界面的功能参数数组
    * 都用来调节显示顺序
    *
    * 动作类型act
    Bit0 置1 get
    Bit1 置1set
    两个bit都是1 读写都支持

    * */
    if (!state.uiSettings.container) {
        state.uiSettings.container = {} as any
    }

    const {homePageReadonly = [], homePageOperate = [], settingsPage = []} = state.uiSettings.container
    const readonlyMax = 4, homePageOperateMax = 4

    const uiSettings = state.uiSettings.component

    const homeReadonly:string[] = [], homeOperate:string[] = [], setting:string[] = []
    Object.keys(uiSettings).forEach(key => {
            if (getIntfsFromProfile(state.profile)[key]) {
                //profile中也存在
                const {location} = uiSettings[key]
                const {act, enable = true} = getItemFromProfile(state.profile, key)
                console.error('-----------', key, location, act, enable)
                if (!enable) {
                    return
                }
                if (location === "home") {
                    if (act === 1 && homeReadonly.length < readonlyMax) {
                        //只读
                        homeReadonly.push(key)
                        return
                    } else if (act !== 1 && homeOperate.length < homePageOperateMax) {
                        homeOperate.push(key)
                        return
                    }
                }
                setting.push(key)
            }
        }
    )
    state.uiSettings.container.homePageOperate = reorder(homePageOperate,homeOperate)
    state.uiSettings.container.homePageReadonly = reorder(homePageReadonly,homeReadonly)
    state.uiSettings.container.settingsPage = reorder(settingsPage,setting)

    function reorder <T>(base:T[],source:T[]):T[]{
        const set = new Set(source)
        const result :T[]= []
        for (let item of base) {
            if(set.has(item)){
                result.push(item)
                set.delete(item)
            }
        }
        if(set.size >0){
            return result.concat(Array.from(set.values()))
        }else{
            return result
        }
    }
}

const upsert = (intfItem: Intf, stringItem: IntfString, uiSetting: BooleanSetting | EnumSetting, payload: AddIntf | UpdateIntf['json']) => {
    const type: IntfType = intfItem.in[0]

    stringItem.name = payload.name

    uiSetting.addToTimer = payload.addToTimer
    uiSetting.location = payload.location
    uiSetting.icon = payload.icon

    if (type === ENUM_TYPE) {
        //update profile
        let values = payload.items.map(i => i.value)
        intfItem['in'] = [ENUM_TYPE, ...values]
        //update strings
        stringItem['values'] = payload.items.reduce((obj, i) => {
            obj[i.value + ''] = i.text
            return obj
        }, <Record<string, string>>{})

        ;(uiSetting as EnumSetting).items = payload.items
        ;(uiSetting as EnumSetting).style = payload.style

    } else if (type === BOOLEAN_TYPE) {
        //nothing special
        intfItem['in'] = [BOOLEAN_TYPE]
    }
}
const initialState: ProfileState = {
    profile: profile,
    strings: strings,
    uiSettings: settings
}

const slice = createSlice({
    name: 'persistenceState',
    initialState: initialState,
    reducers: {
        init: (state, {payload}) => {
            Object.assign(state, payload)
            state.profile = payload.profile
            state.strings = payload.strings
            state.uiSettings = payload.settings

            updateContainerArray(state)
        },
        updateGlobalSettings: (state, {payload}) => {
            Object.assign(state.uiSettings.global, payload)
            updateContainerArray(state)
        },
        toggleIntf: (state, {payload}) => {
            const {key, enable} = payload
            const item = getItemFromProfile(state.profile, key)
            item.enable = enable

            updateContainerArray(state)
        },
        updateContainerSettings: (state, {payload}) => {
            // @ts-ignore
            state.uiSettings.container[payload.key] = payload.json
            // updateContainerArray(state)
        },
        addIntf: (state, {payload}: PayloadAction<AddIntf>) => {
            const intfs = getIntfsFromProfile(state.profile), key = payload.key

            const intfItem = {} as Intf, stringItem = {} as IntfString, uiSetting: any = {}
            intfItem.act = payload.act
            intfItem.enable = payload.enable
            intfItem.in = [payload.type]
            upsert(intfItem, stringItem, uiSetting, payload)

            intfs[key] = [intfItem]
            state.strings.intfs[key] = stringItem
            state.uiSettings.component[key] = uiSetting
            updateContainerArray(state)

        },
        updateIntfSettings: (state, {payload}: PayloadAction<UpdateIntf>) => {
            const {json, key} = payload
            const intf = getItemFromProfile(state.profile, key)
            let stringItem = getItemFromStrings(state.strings, key) || {}
            const uiSetting = state.uiSettings.component[key]

            upsert(intf, stringItem, uiSetting, json)

            state.strings.intfs[key] = stringItem

            updateContainerArray(state)
        },

    }
})

const create = getSelector(state => state.profile)

const getProfile = (state: ProfileState) => state.profile
const getStrings = (state: ProfileState) => state.strings
const getComponentSettingsByKey = (state: ProfileState, key: string) => state.uiSettings.component[key]
const getGlobalSettings = (state: ProfileState) => state.uiSettings.global

export const selectProfile = create(getProfile)
export const selectStrings = create(getStrings)
export const selectComponentSettingsByKey = create(getComponentSettingsByKey)
export const selectGlobalSettings = create(getGlobalSettings)
export const selectThemeColor = create((state: ProfileState) => getGlobalSettings(state).themeColor)
export const selectContainers = create((state: ProfileState) => state.uiSettings.container)

export const selectSettingsByIntf = create((state: ProfileState, intfKey: string) => {
    const profile = getProfile(state)
    const strings = getStrings(state)
    const settings = getComponentSettingsByKey(state, intfKey)

    const name = getIntfName(strings, intfKey)
    const type = getIntfType(profile, intfKey)
    if (type === BOOLEAN_TYPE) {
        return {name, ...settings}
    } else if (type === ENUM_TYPE) {
        let enumValues = getEnumValues(profile, intfKey)
        let items = (settings as EnumSetting).items || enumValues.map(v => ({value: v}))

        let itemWithText = items.map((item) => ({
            ...item,
            text: getEnumValueName(strings, intfKey, item.value),
        }))
        return {name, ...settings, items: itemWithText}
    }
})

export const {
    init,
    updateContainerSettings,
    updateGlobalSettings,
    toggleIntf,
    addIntf,
    updateIntfSettings,
} = slice.actions

export default slice.reducer