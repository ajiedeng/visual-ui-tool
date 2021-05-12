import React, {useState, useEffect,useRef} from 'react'
import {useHistory} from "react-router-dom"
import {CreateProductProgressBar} from "../../components/CreateProductProgressBar"
import {useDispatch, useSelector, shallowEqual} from "react-redux"
import {NextStep,Preview,LastStep,NormalButton} from "../../components/StepButton"
import {createSelector} from '@reduxjs/toolkit'
import {FunctionConfigPanel} from "./FunctionConfigPanel"
import {fetchProductsDetail,saveTemplateDetailFile} from "./productDetailSlice"
import {downloadTemplate} from './downloadTemplateSlice'
import {PreviewPanel} from "./PreviewPanel"
import {PropsConfigPanel} from "./PropsConfigPanel"
import {ProductNewFuncPopup} from './ProductNewFuncPopup'
import {ProductMutexPopup} from "./ProductMutexPopup";
import {Loadable} from "../../components/Loadable"
import {useLocation} from "react-router-dom"


import './ProductConfigPage.css'
export const ProductConfigPage = () => {
    
    const previewUrl = useSelector(state=>state.productDetail.previewUrl)
    const history = useHistory();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const {templateId} = useSelector(state => state.addProduct);

    const keyValArr = history.location.search.split('&');
    const _model = decodeURIComponent(keyValArr[0].split('=')[1]);
    const _templateId = decodeURIComponent(keyValArr[1].split('=')[1]);

    const initData = useSelector(state => state.productDetail.detailInitData);
    console.log('----initData-------',initData);
    const _profile = useSelector(state => state.productDetail.profile);
    const _strings = useSelector(state => state.productDetail.strings);
    const [profile,setProfile] = useState(_profile);
    const [strings,setStrings] = useState(_strings);
    const [cloudProfile,setCloudProfile] = useState({
        timer:{enable: true,name:'定时',act:0b11},
        delay:{enable: true,name:'延时',act:0b11},
        history:{enable: true,name:'历史数据',act:0b01}
    });
    const [newFuncFlag,setNewFuncFlag] = useState(false);
    const [mutexFlag,setMutexFlag] = useState(false);
    const [location,setLocation] = useState('home');
    const newFunc = (data)=>{
        setNewFuncFlag(true);
        console.log('----newFunc--',data)
    };
    const sendCmd = function (cmd) {
        console.log('send---cmd',cmd);
        ref.current.contentWindow.postMessage(cmd,'*');
    };
    const updateToggle =(val,key)=>{
        // console.log('ref.current.contentWindow--updateToggle',ref.current);
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'TOGGLE_INTF',payload:{key,enable:val}},'*');
        }
    };
    const cloudKeyToggle =(val,key)=>{
        // console.log('ref.current.contentWindow--cloudKeyToggle',ref.current);
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'CLOUD_TOGGLE_INTF',payload:{key,enable:val}});
        }
    };
    const query = new URLSearchParams(useLocation().search);

    const changeData = (data)=>{
        // console.log('ref.current.contentWindow',ref.current);
        if(ref.current && ref.current.contentWindow){
            sendCmd({...data});
        }
    };

    const [previewState,setPreviewState] = useState(false);
    const changePreview = (flag)=>{
        setPreviewState(!flag);
        // console.log('ref.current.changePreview',ref.current);
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'TOGGLE_PREVIEW_FLAG',payload:!flag});
        }
    };

    const setInitData = (initData)=> {
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'INIT_SETTINGS',payload:initData});
        }
    }

    useEffect(()=>{
        setProfile(_profile);
        setStrings(_strings);
    },[_profile,_strings])

    useEffect(()=>{
        window.addEventListener("message", receiveMessage, false);

        function receiveMessage(event) {
            // For Chrome, the origin property is in the event.originalEvent
            // object.
            // 这里不准确，chrome没有这个属性
            const origin = event.origin || event.originalEvent.origin;
            // var origin = event.origin

            // if(origin !== 'http://10.10.30.239:3000'){
            //     return
            // }
            // console.log('message-----event',event);
            if(event.data.type === 'DEVICE_INTFS_INFO'){
                console.log('message-----DEVICE_INTFS_INFO',event);
                // setPreviewState(event.data.payload);
                setProfile(event.data.payload.profile);
                setStrings(event.data.payload.strings);
                return
            }
            if(event.data.type === 'CLOUD_INTFS_INFO'){
                console.log('message-----CLOUD_INTFS_INFO',event);
                // setPreviewState(event.data.payload);
                setCloudProfile(event.data.payload.profile);
                return
            }
            if(event.data.type === 'SAVE_ALL_SETTINGS'){
                console.log('message-----SAVE_ALL_SETTINGS',event);
                dispatch(saveTemplateDetailFile({model:_model,templateId:_templateId||templateId,files:event.data.payload.files}));
                return
            }
            if(event.data.type === 'READY'){
                console.log('----------detail----ready',initData);
                setInitData(initData)
            }
        }
        return function () {
            window.removeEventListener('message',receiveMessage, false)
        }
    },[initData]);

    useEffect(() => {
        console.log('--history.location--',history.location,templateId);
        // const keyValArr = history.location.search.split('&');
        // const _model = decodeURIComponent(keyValArr[0].split('=')[1]);
        // const _templateId = decodeURIComponent(keyValArr[1].split('=')[1]);
        console.log('--_model----_templateId--',_model,_templateId);
        dispatch(fetchProductsDetail(_model,_templateId||templateId))
    }, [])

    const confirmClick = (data)=>{
       setNewFuncFlag(false);
        // console.log('ref.current.contentWindow',ref.current);
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'ADD_INTF',payload:data});
            // ref.current.contentWindow.postMessage({type:'ADD_INTF',payload:data},'*');
        }
    };

    const sendLocation =(location)=>{
        // console.log('ref.current.sendLocation',ref.current);
        if(ref.current && ref.current.contentWindow){
            console.log('---CHANGE_LOCATION----',location);
            sendCmd({type:'CHANGE_LOCATION',payload:{location}});
            // ref.current.contentWindow.postMessage({type:'CHANGE_LOCATION',payload:{location}},'*');
            setLocation(location)
        }
    };
    const saveTemplate =()=>{
        if(ref.current && ref.current.contentWindow){
            sendCmd({type:'REQUEST_SAVE_ALL_SETTINGS'});
        }
    }

    const download = ()=>{
        dispatch(downloadTemplate({model:_model,templateId:_templateId}))
    }

    return (
        <div>
            <CreateProductProgressBar curStep={1} downloadUrl={'http://10.10.30.207:3009/products/download?templateId='+_templateId+'&model='+_model}/>
            <div className="clearfloat content">
                <Loadable isLoading={!profile}>
                    <FunctionConfigPanel {...{'profile':{profile, strings,newFunc,updateToggle},'cloud':{cloudProfile,cloudKeyToggle},'mutex':{}}}/>
                </Loadable>

                <PreviewPanel setLocation={sendLocation} previewUrl={previewUrl} previewState={previewState} location={location} ref={ref}/>
                <PropsConfigPanel change={(data,componentKey)=>changeData(data,componentKey)}/>
            </div>
            <div className="bottomButton">
                <LastStep onClick={history.goBack}/>
                <Preview onClick={()=>changePreview(previewState)} on={previewState}/>
                <NextStep onClick={saveTemplate}/>
            </div>
            {/* <NormalButton text={'下载'} onClick={download}/> */}
            {/* <a href={'http://10.10.30.207:3009/products/download?templateId=demo&model=111'} >下载</a> */}
            
            {newFuncFlag && <ProductNewFuncPopup cancel={()=>setNewFuncFlag(false)} confirm={confirmClick}/>}
            {mutexFlag && <ProductMutexPopup {...{profile,strings}} cancel={()=>setMutexFlag(false)} confirm={confirmClick}/>}
        </div>
    )
}
