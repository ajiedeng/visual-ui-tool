import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSelector} from "./getSelectors";

const initialState: {
    editing: boolean;
    currentChosenComponentId: string | null
} = {editing: true, currentChosenComponentId: null}

type StateType = typeof initialState

const slice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        toggleEditingFlag: (state, action: PayloadAction<boolean>) => {
            state.editing = action.payload
        },
        currentChosenComponentId: (state, action: PayloadAction<string | null>) => {
            state.currentChosenComponentId = action.payload
        }
    }
})
const create = getSelector(state => state.editing)

export const {
    toggleEditingFlag,
    currentChosenComponentId
} = slice.actions

export default slice.reducer

export const getCurrentChosenComponentId = create((state: StateType) => {
    return state.currentChosenComponentId
})

export const isEditing = create(
    (state: StateType, str: string) => {
        return state.editing
    }
)