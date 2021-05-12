import productsReducer from '../productsList/productsSlice'
import productDetail from '../create/configProduct/productDetailSlice'
import templatesReducer from './templatesSlice'
import addProductReducer from '../create/newProduct/addProductSlice'
import { combineReducers } from '@reduxjs/toolkit'


const rootReducer = combineReducers({
    templates: templatesReducer,
    productsList:productsReducer,
    addProduct:addProductReducer,
    productDetail : productDetail,
    // downloadTemplate
})

export default rootReducer
