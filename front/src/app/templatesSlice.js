import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getAllTemplates} from '../api/cloudApi'

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
}

const initialState = {
    isLoading: true,
    error: false,
    templateById: {},
    productsByCategory: {},
    templatesByCategory: {},
}

const pushToField = (obj, field, ...items) => {
    if (!obj[field]) {
        obj[field] = []
    }
    obj[field].push(...items)
}

const slice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        getTemplatesStart: startLoading,

        getTemplatesSuccess(state, {payload}) {
            const {data: {list}} = payload
            state.isLoading = false
            state.error = null
            state.templateById = {}
            state.productsByCategory = {}
            state.templatesByCategory = {}

            console.log('--list--',list);
            

            list.forEach(template => {
                state.templateById[template.id] = template
                pushToField(state.templatesByCategory, template.category, template.id)
                const {products = []} = template;
                products.forEach(p=>{p.templateCategory = template.category;p.templateId = template.id});
                // products.forEach(p=>p.templateId = template.id)

                pushToField(state.productsByCategory, template.category, ...products)
            })
        },
        getTemplatesFailure: loadingFailed,
    }
})

export const selectProductsByCategory = (state, category) => {
    let products = []
    if (category) {
        products = state.productsByCategory[category]
    } else {
        Object.keys(state.productsByCategory).forEach(key => products.push(...state.productsByCategory[key]))
        //todo
        //排序
    }
    return products
}
export const selectAllCategories = state => Object.keys(state.templatesByCategory)

export const selectTemplateById = (state, id) => state.templateById[id]

export const selectTemplatesByCategory = (state, category) => {
    return category ? state.templatesByCategory[category].map(id => selectTemplateById(state, id)) : Array.from(Object.values(state.templateById))
}

export const wholeState = state=>state;

export const {
    getTemplatesStart,
    getTemplatesSuccess,
    getTemplatesFailure,
} = slice.actions

export default slice.reducer

export const fetchTemplates = () => async dispatch => {
    try {
        dispatch(getTemplatesStart())

        dispatch(getTemplatesSuccess(await getAllTemplates()))
    } catch (err) {
        dispatch(getTemplatesFailure(err.toString()))
    }
}

