import React, {useState} from 'react'
import classNames from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import style from './ProductsPageHeader.module.css'

export const ProductsPageHeader = ({categories, setCategory, search}) => {
    const [name, setName] = useState('');
    const [flag, clickaa] = useState(null);
    const onEnter = event => {
        if(event.nativeEvent.keyCode === 13){//enter
            search(name)
        }
    };
    const clicked=(i,c)=>{
        setCategory(c);
        // console.log(i,'iiiiiiiii',c);
        clickaa(c)
    };
   console.log(categories, 'dddd');
    return (
        <div  className={style.ProductsPageHeader}>
            <div className={style.allCategory}>
                <span>全部产品：</span>
                <span onClick={() => clicked(null,null)} className={classNames({[style.clicked]:flag ==null})} >全部</span>
                {
                    categories.map(c => <span key={c} onClick={(i) =>clicked(i,c)}  className={classNames({[style.clicked]:flag==c})} >{c}</span>)
                }
            </div>
            <div className={style.detailItem}>
                具体项目：<input placeholder={'请输入'} value={name} onKeyPress={onEnter} onChange={e => setName(e.target.value.trim())}/>
                <a onClick={(e)=>{e.stopPropagation();search(name)}}>搜索</a>
            </div>

        </div>
    )
};
