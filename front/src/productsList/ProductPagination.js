import React from 'react'
import classnames from 'classnames'
import Paginate  from 'react-paginate'

import './ProductPagination.css'

export const ProductsPagination = ({
                                    currentPage,
                                    pageCount,
                                    onPageChange
                                }) => {
    return (
        <div className={'issuesPagination'}>
            <Paginate
                forcePage={currentPage}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                nextLabel="&rsaquo;"
                previousLabel="	&lsaquo;"
            />
        </div>
    )
}
