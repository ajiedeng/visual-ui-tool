import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addProduct} from '../../api/cloudApi'
import {getTemplatesSuccess} from "../../app/templatesSlice"

const initialState = {
    formData: {},
}

const slice = createSlice({
    name: 'addProduct',
    initialState,
    reducers: {
        setFormValue: (state, {payload}) => {
            Object.assign(state.formData, payload)
        },
        setCategory: (state, {payload}) => {
            state.category = payload
        },
        setTemplateId: (state, {payload}) => {
            state.templateId = payload
        },
        addProductStart: state => {
            state.isLoading = true
            state.error = null
        },
        addProductFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        addProductSuccess: (state, action) => {
            state.isLoading = true
            state.error = null
            state.formData = {}
            state.templateId = action.templateId
        }
    }
})

export const selectFormValue = (state, name) => state.formData[name]

export const {
    setFormValue,
    setCategory,
    setTemplateId,
    addProductStart,
    addProductFailure,
    addProductSuccess
} = slice.actions

export const createProduct = (templateId, product, callback) => async dispatch => {
    try {
        dispatch(addProductStart())
        const result = await addProduct(templateId, product)
        dispatch(addProductSuccess({templateId}))
        dispatch(getTemplatesSuccess(result))

        callback(product.model)
    } catch (err) {
        dispatch(addProductFailure(err.toString()))
        console.error(err)
    }
}

export default slice.reducer