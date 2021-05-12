import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSelector} from "./getSelectors";

enum OnlineState {
    UNKNOWN = '0', LOCAL = '1', REMOTE = '2', OFFLINE = '3'
}

type DeviceStatus = {
    status: { [p: string]: string | number };
    online: OnlineState;
    name: string;
}

const initialState: DeviceStatus & { ready: boolean } = {
    status: {},
    online: OnlineState.REMOTE,
    name: '',
    ready: false
}

type StateType = typeof initialState

const slice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        updateStatus: (state, action: PayloadAction<DeviceStatus>) => {
            state.ready = true
            Object.assign(state, action.payload)
        },
        ready: (state, action: PayloadAction<undefined | null>) => {
            state.ready = true
        }
    }
})

const create = getSelector(state => state.device)

export const getOnline = create((state: StateType) => {
    return state.online
})
export const getName = create((state: StateType) => {
    return state.name
})
export const getReady = create((state: StateType) => {
    return state.ready;
})
export const getStatus = create((state: StateType, params: string | string[]) => {
    const status = state.status;
    if (!params) {
        //不传则返回全部
        return status && {...status};
    } else if (Array.isArray(params)) {
        const result: any = {};
        params.forEach(p => result[p] = status[p]);
        return result
    } else {
        return status[params];
    }
})


export const {
    updateStatus,
    ready
} = slice.actions

export default slice.reducer