import React, {useEffect, useMemo} from 'react'
import {ProductsPageHeader} from "./ProductsPageHeader"
import {ProductsList} from "./ProductsList"
import {useSelector, useDispatch} from 'react-redux'
import {createSelector} from '@reduxjs/toolkit'
import {setCurrentPage, setNameFilter, setCategoryFilter} from "./productsSlice"
import {ProductsPagination} from "./ProductPagination"
import {selectAllCategories, selectProductsByCategory} from "../app/templatesSlice"

import './ProductsListPage.css'

//单页显示的个数，但首页需要减1（被新增图标占据一格）
const PAGE_SIZE = 11;

const selectFilteredProducts = createSelector(
    state => state.productsList.categoryFilter,
    state => state.productsList.nameFilter,
    state => state.templates,

    (categoryFilter, nameFilter, templates) => {

        let products = selectProductsByCategory(templates, categoryFilter)

        if (nameFilter) {
            products = products.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
        }
        return products
    }
);

const selectCurrentPageProducts = createSelector(
    selectFilteredProducts,
    state => state.productsList.currentPage,

    (products, currentPage) => {
        const start = (currentPage - 1) * PAGE_SIZE, end = currentPage * PAGE_SIZE
        return products.slice(start, end)
    }
);

export const ProductsListPage = () => {
    const dispatch = useDispatch();
    const {
        currentPage
    } = useSelector(state => state.productsList);

    const filteredProducts = useSelector(selectFilteredProducts);
    const currentPageProducts = useSelector(selectCurrentPageProducts);
    const totalCount = filteredProducts.length;
    const totalPage = Math.ceil(totalCount / PAGE_SIZE);
    const categories = useSelector(state => selectAllCategories(state.templates));

    const search = filter => {
        dispatch(setNameFilter(filter))
    };

    const filterByCategory = category => {
        dispatch(setCategoryFilter(category))
    };

    const jumpToPage = ({selected}) => dispatch(setCurrentPage(selected + 1));

    return (
        <div  className="ProductsListPage">
            <ProductsPageHeader categories={categories} setCategory={filterByCategory} search={search}/>
            <ProductsList products={currentPageProducts} totalNumber={totalCount}/>
            <ProductsPagination forcePage={currentPage} pageCount={totalPage} onPageChange={jumpToPage}/>
        </div>
    )
};
