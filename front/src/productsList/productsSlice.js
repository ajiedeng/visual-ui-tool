import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllTemplates } from '../api/cloudApi'

const initialState = {
    currentPage:1
}

const slice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        setCurrentPage:(state,{payload})=>{
            state.currentPage = payload
        },
        setNameFilter:(state,{payload})=>{
            state.nameFilter = payload
        },
        setCategoryFilter:(state,{payload})=>{
            state.categoryFilter = payload
        },
    }
})

export const {
    setCurrentPage,
    setNameFilter,
    setCategoryFilter
} = slice.actions

export default slice.reducer
