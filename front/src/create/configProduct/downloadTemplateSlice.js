import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { downLoadTemplateZip } from '../../api/cloudApi'


function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
}
const initialState = {
    isLoading:false,
    error:false,
}

const downloadTemplateSlice = createSlice({
    name: 'downloadTemplate',
    initialState,
    reducers: {
        downloadStart: startLoading,

        downloadSuccess(state, { payload }) {
            console.error('---downloadSuccess--',payload);
            state.isLoading = false
            state.error = null

        },
        downloadFailure: loadingFailed,

    }
})

export const {
    downloadStart,
    downloadSuccess,
    downloadFailure,
} = downloadTemplateSlice.actions

export default downloadTemplateSlice.reducer

export const downloadTemplate = ({model,templateId}) => async dispatch =>{
    try {
        dispatch(downloadStart())

        dispatch(downloadSuccess(await downLoadTemplateZip({model,templateId})))
    } catch (err) {
        dispatch(downloadFailure(err.toString()))
        throw err
    }
}