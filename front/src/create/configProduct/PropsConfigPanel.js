import React, {useState, useEffect,useRef} from 'react'
import '@json-editor/json-editor';
import $ from 'jquery'
require('./jsonEditorStyle/spectre-exp.min.css');
require('./jsonEditorStyle/spectre.min.css');
require('./jsonEditorStyle/spectre-icons.min.css');
require('./jsonEditorStyle/customStyle.css');
var SVGO = require('svgo');



window.JSONEditor.defaults.theme = 'spectre';
window.JSONEditor.defaults.iconlib = 'spectre';
const editorOptions = {
    disable_properties:true,
    disable_edit_json:true,
    disable_collapse:true
};

export const PropsConfigPanel = ({change}) => {
    const editorGlobal = useRef(null);
    const editorComponent = useRef(null);
    const globalEditorExample = useRef(null);
    const componentEditorExample = useRef(null);

    const [type,setType] = useState('');
    const [componentKey,setKey] = useState('');
    const latestComponentKey = useRef(componentKey);

    console.log('wc------',componentKey);

    // const [svgHtml,setSvgHtml] = useState('');
    //全局schema
    const [globalJSON,setGlobalJSON] = useState({
        schema: {

        }
    });
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

            // console.log('event--schema--postMessage',event);
            setType(event.data.type);
            if(event.data.type === 'GLOBAL_SCHEMA'){
                console.log('event--GLOBAL_SCHEMA---postMessage',event);
                setGlobalJSON({schema:event.data.payload || {}});
                setKey(null);
                return
            }
            if(event.data.type === 'COMPONENT_SCHEMA'){
                console.log('receive--COMPONENT_SCHEMA---postMessage',event);
                setComponentJSON({schema:event.data.payload.schema || {}});
                setKey(event.data.payload.key);
                latestComponentKey.current = event.data.payload.key;
            }
            // ...
        }
        return function () {
            window.removeEventListener('message',receiveMessage, false)
        }
    },[]);
    useEffect(()=>{
        if(globalEditorExample.current){
            globalEditorExample.current.destroy()
        }
        Object.keys(globalJSON.schema).length>0 &&
        (globalEditorExample.current =new window.JSONEditor(editorGlobal.current,{...globalJSON,...editorOptions}));
        const changeCallback =()=>{
            let data = {type:'GLOBAL_JSON',payload:{}};
            data.payload = globalEditorExample.current.getValue();
            console.log('--gloabl--',globalEditorExample.current.getValue());
            change && change(data);
        };
        let nodeListP = $("select[name ='root[themeColor]']");
        if(nodeListP && nodeListP[0]){
            if(globalEditorExample.current){
                const curColor = globalEditorExample.current.getValue()['themeColor'];
                (nodeListP[0].style = `background:${curColor};color:${curColor}`);
            }
            let nodeList = $("select[name ='root[themeColor]'] option");
            [...nodeList].map((option)=>option.style = `background:${option.value};color:${option.value}`);
        }

        globalEditorExample.current && globalEditorExample.current.on('change',changeCallback);

        return function clear () {
            globalEditorExample.current && globalEditorExample.current.off('change',changeCallback);
            globalEditorExample.current && globalEditorExample.current.destroy();
        }

    },[globalJSON]);

    //组件schema
    const [componentJSON,setComponentJSON] = useState({
        schema: {}
    });
    useEffect(()=>{
        const changeCallback =function(){
            let data = {type:'COMPONENT_JSON',payload:{}};
            const exampleVal = componentEditorExample.current.getValue();
            if(type === 'COMPONENT_SCHEMA'){
                console.log('COMPONENT_JSON_exampleVal',exampleVal);
                console.log('-----COMPONENT_JSON_exampleVal----latestComponentKey.current',latestComponentKey.current);
                data.payload.json = exampleVal;
                data.payload.key = latestComponentKey.current
            }
            if(!data.payload.key ){return}//onchange初始化时触发过滤
            change && change(data)
        };
        if(componentEditorExample.current){
            componentEditorExample.current.destroy()
        }
        Object.keys(componentJSON.schema).length>0 &&
        (componentEditorExample.current =new window.JSONEditor(editorComponent.current,{...componentJSON,...editorOptions})) ;
        componentEditorExample.current && componentEditorExample.current.on('change',changeCallback);

        return function clear () {
            componentEditorExample.current && componentEditorExample.current.off('change',changeCallback);
            componentEditorExample.current && componentEditorExample.current.destroy();
        }

    },[componentJSON]);


    return (
        <div  className="layer rightLayer">
            {/*<div dangerouslySetInnerHTML={{__html:svgHtml}}>*/}

            {/*</div>*/}
            <div className="globalContent" ref={editorGlobal}>

            </div>
            <div className="componentContent" ref={editorComponent}>

            </div>
        </div>
    )
}
