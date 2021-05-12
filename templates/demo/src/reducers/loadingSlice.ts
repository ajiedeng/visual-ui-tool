import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSelector} from "./getSelectors";

const initialState = false
const slice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        loading: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
})
const create = getSelector(state => state.loading)

// type StateType = typeof initialState
type StateType = boolean

export const {
    loading
} = slice.actions

export const getLoading = create((state:StateType) :boolean=> {
    return state
})

export default slice.reducer



