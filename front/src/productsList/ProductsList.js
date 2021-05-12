import React from 'react';
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { setTemplateId} from "../create/newProduct/addProductSlice"
import { useHistory } from "react-router-dom";
import './ProductsListPage.css'
import style from  './ProductsList.module.css'

import addBtn from './images/add-btn.png'

const categoryToTemplate = {
    'socket':style.elec_yellow,
    'light':style.elec_blue,
    'default':style.elec_blue
};

const ProductBox = function ({product}) {
    let history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className={style.productContent}>
            <div  className={style.item} onClick={()=>{dispatch(setTemplateId(product.templateId));history.push('config?model='+encodeURIComponent(product.model)+'&templateId='+encodeURIComponent(product.templateId))}} key={product.model}>
                <div  className={classnames(style.category,categoryToTemplate[product.templateCategory||'default'])}>{product.templateCategory}</div>
                <div className={style.info}>
                    <div className={style.productName}>{product.name}</div>
                    <div className={style.productMode}>{product.model}</div>
                </div>
            </div>
        </div>
    )
};

export const ProductsList = ({products,totalNumber,addProduct,chooseProduct})=>{
    console.log('------products---',products);
    let history = useHistory();

    return (
        <div className="ProductsList">
            <div  className={style.allProducts}>
                全部产品&ensp; ({totalNumber})
            </div>
            <div  className={classnames('ProductsListPage','clearfloat', style.allProducts)}>
               <div className={style.productContent}> <div  className={style.item} onClick={()=>history.push('create')}> <div><a><img src={addBtn} alt=""/></a>新增产品</div></div></div>
                {
                    products.map((product,index)=>(
                        <ProductBox key={index} product={product}/>
                    ))
                }
            </div>
        </div>
    )
}
