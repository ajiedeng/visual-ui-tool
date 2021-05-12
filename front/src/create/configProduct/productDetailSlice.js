import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProductDetail,saveTemplateFile,downLoadTemplateZip } from '../../api/cloudApi'

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
    alert('失败')
}
const initialState = {
    isLoading:false,
    error:false,
}

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        getProductsDetailStart: startLoading,

        getProductsDetailSuccess(state, { payload }) {
            console.error('---getProductsDetailSuccess--',payload);
            const { data } = payload
            state.detailInitData = data;
            state.profile = data.profile
            state.strings = data.strings
            state.settings = data.settings
            state.previewUrl = data.previewUrl
            state.isLoading = false
            state.error = null;

        },
        saveProductsSuccess(state,{payload}){
            console.error('---saveProductsSuccess--',payload);
            state.error = null
            alert('保存成功')
        },
        getProductsDetailFailure: loadingFailed,

    }
})

export const {
    getProductsDetailStart,
    getProductsDetailSuccess,
    getProductsDetailFailure,
    saveProductsSuccess,
} = productDetailSlice.actions

export default productDetailSlice.reducer

export const fetchProductsDetail = (model,templateId) => async dispatch => {
    try {
        dispatch(getProductsDetailStart())

        dispatch(getProductsDetailSuccess(await getProductDetail(model,templateId)))
    } catch (err) {
        dispatch(getProductsDetailFailure(err.toString()))
        throw err
    }
}

export const saveTemplateDetailFile = ({model,templateId,files}) => async dispatch =>{
    try {
        dispatch(getProductsDetailStart())

        dispatch(saveProductsSuccess(await saveTemplateFile({model,templateId,files})))
    } catch (err) {
        dispatch(getProductsDetailFailure(err.toString()))
        throw err
    }
}

export const downloadTemplate = ({model,templateId}) => async dispatch =>{
    try {
        dispatch(getProductsDetailStart())

        dispatch(saveProductsSuccess(await downLoadTemplateZip({model,templateId})))
    } catch (err) {
        dispatch(getProductsDetailFailure(err.toString()))
        throw err
    }
}