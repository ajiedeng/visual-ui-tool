import React, {useState, useEffect} from 'react'
import classNames from 'classnames'
import {CreateProductProgressBar} from "../../components/CreateProductProgressBar"
import {useDispatch, useSelector, shallowEqual} from "react-redux"
import {NextStep,LastStep} from "../../components/StepButton"
import {useHistory} from "react-router-dom"
import {selectAllCategories, selectTemplateById, selectTemplatesByCategory} from "../../app/templatesSlice"
import {addProduct} from "../../api/cloudApi"
import {createProduct, setCategory, setFormValue, setTemplateId} from "./addProductSlice"
import ItemsCarousel from 'react-items-carousel';
import {ReactComponent as LeftButton} from "../configProduct/img/arrow_left.svg";
import {ReactComponent as RightButton} from "../configProduct/img/arrow_right.svg";
import {ReactComponent as Select} from "../configProduct/img/benefits.svg";
import { Input } from 'antd';

import style from './NewProductPage.module.css'

const useForm = (callback) => {

    const [values, setValues] = useState({})

    const handleSubmit = (event) => {
        if (event) event.preventDefault()
        callback()
    }

    const handleChange = (event) => {
        event.persist()
        setValues(values => ({...values, [event.target.name]: event.target.value}))
    }

    return {
        handleChange,
        handleSubmit,
        values,
    }
}


export const NewProductPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {category, templateId, formData} = useSelector(state => state.addProduct);
    // console.log('---useSelector(state => state.addProduct)---',useSelector(state => state));
    const templates = useSelector(state => selectTemplatesByCategory(state.templates, category));
    // console.log('---selectTemplatesByCategory---',templates);
    const categories = useSelector(state => selectAllCategories(state.templates));
    // console.log('---categories---',categories);
    const template = useSelector(state => selectTemplateById(state.templates,templateId));
    // console.log('---template---',template);

    const chooseCategory = category => {
        dispatch(setCategory(category))
    }
    // console.log(templates, '---------templates',categories);
    console.log(templates.supports,'----------template');
    useEffect(() => {
        chooseCategory(categories[0])
    }, [categories[0]])


    const nextStep = () => {
        // // history.push('config?model=2134')
        // addProduct(templateId, {})
        // console.error(values)

        const callback = (model)=>{
            history.push('config?model='+model+'&templateId='+templateId)
        }

        const {name,model} =formData
        if(templateId && name && model){
            console.error(templateId,formData)
            dispatch(createProduct(templateId,formData,callback))
        }else{
            alert('信息不完整')
        }

    }

    const handleChange = (event) => {
        // event.persist();
        dispatch(setFormValue({[event.target.name]: event.target.value}))
    }

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 80;
    const columns = templates.length>3?3:templates.length;

    return (
        <div>
            <CreateProductProgressBar curStep={0}/>

            <div className={style.NewProductPage}>
                <div className={style.container}>
                <div className={style.row}>
                    <span>产品名称：</span>
                    <div className={style.inputBox}><Input size={"large"} name={'model'} onChange={handleChange} value={formData.model} placeholder='请输入'/></div>
                </div>

                <div className={style.row}>
                    <span>产品型号：</span>
                    <div className={style.inputBox}><Input size={"large"} name={'name'} onChange={handleChange} value={formData.name} placeholder='请输入'/></div>
                </div>

                <div className={classNames({[style.row]:true,[style.category]:true})}>
                    <span>选择品类：</span>
                    <div>
                        {
                            categories.map(_category => <p key={_category} onClick={() => chooseCategory(_category)}   className={classNames({[style.selected]:_category===category})}>{_category}</p>)
                        }
                    </div>
                </div>
                <div className={classNames(style.row,style.template)}>
                    <span>选择模板</span>
                    <div className={classNames(style.carouselContainer,[style.oneCard,style.twoCard,null][columns-1])}>
                        <ItemsCarousel
                            requestToChangeActive={setActiveItemIndex}
                            activeItemIndex={activeItemIndex}
                            numberOfCards={columns}
                            gutter={0}
                            leftChevron={<div className={style.carouselBtn}><LeftButton/></div>}
                            rightChevron={<div className={style.carouselBtn}><RightButton/></div>}
                            outsideChevron
                            chevronWidth={chevronWidth}
                        >
                            {
                                templates.map((_template,i) =><div key={i} className={classNames(style.carouselDiv,template && template.id === _template.id?style.carouselDivSelected:"")}
                                                               onClick={() => dispatch(setTemplateId(
                                                                   (template && template.id === _template.id)?null:_template.id))}>
                                    {((template && template.id !== _template.id)|| !template)&& <div className={style.carouselMask}>
                                    </div>}
                                    {template && template.id === _template.id &&<div className={style.selectedIcon}><Select/></div>}
                                    <img key={_template.id} src={_template.snapshot} /></div>)
                            }
                        </ItemsCarousel>
                    </div>
                    {/*<div className={style.preview}>*/}
                        {/*{*/}
                            {/*templates.map(template =><div> <img key={template.id} src={template.snapshot}*/}
                                {/*onClick={() => dispatch(setTemplateId(template.id))}/></div>)*/}
                        {/*}*/}
                    {/*</div>*/}
                </div>
                <div className={classNames(style.supports,template?'':style.hidden)}>
                    <p>该模板产品功能包括:</p>
                    <ul>{
                    template && Array.from(template.supports).map((template,i)=><li key={i}>{template}</li>)
                    }
                    </ul>
                </div>

                </div>
            </div>
            <div className={style.paging}>
                <LastStep onClick={history.goBack}/>
                <NextStep onClick={nextStep}/>
                </div>
        </div>
    )
}
