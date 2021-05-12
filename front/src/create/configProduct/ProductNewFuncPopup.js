import React,{useState, useEffect,useRef}  from 'react';
import style from './ProductNewFuncPopup.module.scss';
import {NormalButton} from "../../components/StepButton"
import {ReactComponent as Upload} from "./img/upload.svg";
import {ReactComponent as PlaceHolder} from "./img/holder.svg";
import {Radio,Input,InputNumber} from 'antd';
import 'antd/es/radio/style/css'; // 加载 CSS
import 'antd/es/input/style/css'; // 加载 CSS
import 'antd/es/input-number/style/css'; // 加载 CSS
// import debounce from 'lodash/debounce'
// console.log('---_.debounce-',debounce);
// console.log('++++++++',new XMLSerializer().serializeToString())
// console.log('---Base64.encode(\'dankogai\');---',Base64.encode('dankogai'))


const actOptions = [
    { label: '只读', value: 1 },
    { label: '可读写', value: 3 }
];
const typeOptions = [
    { label: '连续', value: 2 },
    { label: '枚举', value: 1 },
    { label: '布尔', value: 4 },
];
const locationOptions = [
    { label: '首页', value: 'home' },
    { label: '功能设置', value: 'setting' }
];
const addToTimerOptions = [
    { label: '添加', value: true },
    { label: '不添加', value: false }
];
const enumStyleOptions = [
    { label: '文字', value: 'text' },
    { label: 'icon+文字', value: 'text&icon' }
];
const continuityStyleOptions = [
    { label: '滑竿', value: 'slider' },
    { label: '选择器', value: 'picker' },
    { label: '加减器', value: 'adder' }
];

const UploadSvg = function ({icon,onLoad}) {
    console.log('---UploadSvg',icon);
    const inputFile = useRef(null);
    const svgChange =(e)=>{
        console.log('--itemSvgChange-----file',e.currentTarget.files);
        //获取并记录图片的base64编码
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); // 读出 base64
        reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            const dataURL = reader.result;//base64
            console.log('-----svg--base64',dataURL);
            onLoad(dataURL);
            // let copy =items.concat([]);
            // copy[index]['icon'] = dataURL;
            // updateItems(copy);
            // 显示图片
        };
    };
    return (
        <div className={style.uploadSvg}>
            <div className={style.image}>{icon?<img src={icon} alt=""/>:<PlaceHolder/>}</div>
            <div className={style.customInput}>
                <Upload/>
                <span>上传SVG</span>
                <input type="file" accept={".svg"} onChange={svgChange} ref={inputFile} />
            </div>
        </div>
    )
};

const EnumItem = function ({value=1,icon='',text='',textChange,isPureText,svgChange}) {
  return (
      <div className={style.enumItem}><span>{value}-</span> <Input type="text" value={text} onChange={textChange} /> {!isPureText && <UploadSvg onLoad={svgChange} icon={icon}/>} <div className={style.delete}>-</div></div>
  )
};

const Enum = function ({items,updateItems,icon,onLoad,act,enumStyle,setEnumStyle}) {
    const changeNumber=(e)=>{
        let num = e;
        let tempItems = items.concat([]);
        if(num<2){
            return
        }
        if(num>=20){
            num=20
        }
        if(items.length<num){
            for(let i=0;i<(num-items.length);i++){
                tempItems.push({text:'',icon:'',value:items.length+i+1});
            }
            updateItems(tempItems);
        }else {
            updateItems(items.slice(0,num));
        }
    };
    const itemTextChange =(e,index)=>{
        let copy =items.concat([]);
        copy[index]['text'] = e.target.value.trim();
        updateItems(copy);
    };
    const itemSvgChange =(base64,index)=>{
        console.log('--itemSvgChange-----base64',base64);
        let copy =items.concat([]);
        copy[index]['icon'] = base64;
        updateItems(copy);
    };
    return (
        <div className={style.enum}>
            {act===3 &&<div className={style.checkBox}>
            <span>调节样式</span>
            <Radio.Group options={enumStyleOptions} value={enumStyle} onChange={(e)=>setEnumStyle(e.target.value)}/>
        </div>}
            {enumStyle==='text'&&<div className={style.iconSelect}>
                <span>icon</span>
                <UploadSvg icon={icon} onLoad={onLoad} />
            </div>}
            <div className={style.numberControl}>
                <span>枚举设置</span>
                <div>
                    <InputNumber min={2} max={20} defaultValue={items.length} onChange={changeNumber} />
                    <span> 个</span>
                </div>
            </div>
            <div className={style.enumItems}>
                {items.map((item,index)=><EnumItem key={item.value} text={item.text} value={item.value} icon={item.icon} isPureText={enumStyle==='text'} textChange={(e)=>itemTextChange(e,index)} svgChange={(svgBase64)=>itemSvgChange(svgBase64,index)} />)}
            </div>
        </div>
    )
};

const Bool = function ({items,updateBoolItems,icon,onLoad,location}) {
    const changeItems =(text,index)=>{
        const newItems = items.concat([]);
        newItems[index]['text'] = text;
        console.log('--Bool--changeItems',newItems);
        updateBoolItems(newItems)
    };
    return (
        <div className={style.enum}>
            {location==='home'&&<div className={style.iconSelect}>
                <span>icon</span>
                <UploadSvg icon={icon} onLoad={onLoad} />
            </div>}
            <div className={style.numberControl}>
                <span>内容设置</span>
            </div>
            <div className={style.enumItems}>
                { items.map((item,index)=><div key={index} className={style.enumItem}><span>{item.value}-</span> <Input type="text" value={item.text} onChange={(e)=>changeItems(e.target.value.trim(),index)} /> </div>)}
            </div>
        </div>
    )
};

const Continuity = function ({icon,onLoad,location,continuityStyle,setContinuityStyle,act,minVal,setMinVal,maxVal,setMaxVal,step,setStep,unit,setUnit}) {
    // const [minVal,setMinVal] = useState(0);
    // const [maxVal,setMaxVal] = useState(300);
    // const [step,setStep] = useState(1);
    // const [unit,setUnit] = useState('');
    const ref = useRef(null);
    const compare =()=>{
      if(maxVal<=(minVal+step)){
          alert('最大值应大于最小值与步进的和');
      }
    };
    console.log('--minVal---maxVal',minVal,maxVal);
    return (
        <div className={style.enum}>
            {location==='home'&& act===3 &&<div className={style.iconSelect}>
                <span>icon</span>
                <UploadSvg icon={icon} onLoad={onLoad} />
            </div>}
            <div className={style.numberControl}>
                <span>取值范围</span>
                <div>
                    <InputNumber ref={ref}  value={minVal} onChange={setMinVal} />
                    <span> - </span>
                    <InputNumber  value={maxVal}  onChange={setMaxVal} />
                </div>
            </div>
            <div className={style.stepBox}>
                <span className={style.title}>步长</span>
                <InputNumber min={1} value={step} onChange={setStep} />
                <div className={style.unit}>
                    <Input addonBefore="单位:"  value={unit} onChange={e=>setUnit(e.target.value)} />
                </div>
            </div>
            {act===3 &&<div className={style.checkBox}>
                <span>调节样式</span>
                <Radio.Group options={continuityStyleOptions} value={continuityStyle} onChange={(e)=>setContinuityStyle(e.target.value)}/>
            </div>}
        </div>
    )
};

export const ProductNewFuncPopup = function ({cancel,confirm}) {
    const [name,setName] = useState('');
    const [key,setKey] = useState('');
    const [act,setAct] = useState(3);
    const [type,setType] = useState(4);
    const [location,setLocation] = useState('home');
    const [enumStyle,setEnumStyle] = useState('text&icon');
    const [icon,setIcon] = useState('');
    const [addToTimer,setAddToTimer] = useState(true);
    const [enumInitArray,setEnumInitArray] = useState([{text:'',icon:'',value:1},{text:'',icon:'',value:2}]);
    const [boolInitArray,setBoolInitArray] = useState([{text:'关',value:0},{text:'开',value:1}]);
    const [continuityStyle,setContinuityStyle] = useState('picker');
    const [minVal,setMinVal] = useState(0);
    const [maxVal,setMaxVal] = useState(300);
    const [step,setStep] = useState(1);
    const [unit,setUnit] = useState('');

    const updateItems =(items)=>{
        console.log('-----updateItems---',items);
        setEnumInitArray(items)
    };
    const confirmClick =()=>{
        if(!name){
            alert('名称不能为空');
            return
        }
        if(!key){
            alert('功能标识不能为空');
            return
        }
        if(type === 1){//枚举
            for(let item of enumInitArray.values()){
                if(item.text.length<=0){
                    alert('枚举设置描述不可为空');
                    return;
                }
                if(enumStyle === 'text&icon' && item.icon.length<=0){
                    alert('缺少svg图片');
                    return;
                }
            }
            if(enumStyle === 'text&icon'){
                const cmd = {key,name,act,type,location,addToTimer,style:enumStyle,items:enumInitArray};
                if(act===1)delete cmd.addToTimer;
                confirm(cmd)
            }else{
                if(icon.length<=0){
                    alert('icon缺少svg图片');
                    return
                }
                const cmd = {key,name,act,type,location,addToTimer,icon,style:enumStyle,items:enumInitArray};
                if(act===1)delete cmd.addToTimer;
                cmd.items = enumInitArray.map(item=>({'text':item.text,'value':item.value}));
                confirm(cmd)
            }
        }
        if(type === 4){//布尔
            for(let item of boolInitArray.values()){
                if(item.text.length<=0){
                    alert('内容设置描述不可为空');
                    return;
                }
            }
            let cmd = null;
            if(location==='home'||location==='both'){
                if(icon.length<=0){
                    alert('icon缺少svg图片');
                    return
                }
                cmd = {key,name,act,type,location,addToTimer,icon,items:boolInitArray};
            }else{
                cmd = {key,name,act,type,location,addToTimer,items:boolInitArray};
            }
            if(act===1)delete cmd.addToTimer;
            confirm(cmd)
        }
        if(type === 2){//连续型
            let cmd = null;
            if(unit.length<=0){
                alert('单位不能为空');
                return
            }
            if(maxVal<=(minVal+step)){
                alert('最大值应大于最小值与步进的和');
                return
            }
            if(location==='home'||location==='both'){
                if(icon.length<=0 &&act!==1){
                    alert('icon缺少svg图片');
                    return
                }
                cmd = {key,name,act,type,location,addToTimer,unit,min:minVal,max:maxVal,step,icon,style:continuityStyle};
            }else{
                cmd = {key,name,act,type,location,addToTimer,unit,min:minVal,max:maxVal,step,style:continuityStyle};
            }
            if(act===1){
                delete cmd.addToTimer;
                delete cmd.icon;
                delete cmd.continuityStyle;
            }
            confirm(cmd)
        }


    };

    return (
        <div>
            <div className={style.mask}>

            </div>
            <div className={style.popup}>
                <div className={style.popupUnChange}>
                    <p className={style.title}>添加自定义功能</p>
                    <div className={style.inputTxt}><span>名称</span><Input type="text" placeholder={'请输入名称'} value={name} onChange={(t)=>setName(t.target.value.trim())} /></div>
                    <div className={style.inputTxt}><span>功能标识</span><Input type="text" placeholder={'请输入key'} value={key} onChange={(t)=>setKey(t.target.value.trim())} /></div>
                    <div className={style.checkBox}>
                        <span>操作权限</span>
                        <Radio.Group options={actOptions} value={act} onChange={(e)=>setAct(e.target.value)}/>
                    </div>
                    <div className={style.checkBox}>
                        <span>类型</span>
                        <Radio.Group options={typeOptions} value={type} onChange={(e)=>setType(e.target.value)}/>
                    </div>
                    <div className={style.checkBox}>
                        <span>显示位置</span>
                        <Radio.Group options={locationOptions} value={location} onChange={(e)=>setLocation(e.target.value)}/>
                    </div>
                </div>
                {/*变化的部分*/}
                <div className={style.popupChange}>
                    {/*{type===1 && act===3 &&<div className={style.checkBox}>*/}
                        {/*<span>调节样式</span>*/}
                        {/*<Radio.Group options={enumStyleOptions} value={enumStyle} onChange={(e)=>setEnumStyle(e.target.value)}/>*/}
                    {/*</div>}*/}
                    {/*{((enumStyle==='text'&&type===1) ||(type===4 && location==='home') ||(type===2 && location==='home' ))&& act===3 &&<div className={style.iconSelect}>*/}
                        {/*<span>icon</span>*/}
                        {/*<UploadSvg icon={icon} onLoad={setIcon}/>*/}
                    {/*</div>}*/}
                    {type===1 && <Enum icon={icon} enumStyle={enumStyle} setEnumStyle={setEnumStyle} act={act} onLoad={setIcon}  items={enumInitArray} updateItems={updateItems}/>}
                    {type===4 && <Bool icon={icon} onLoad={setIcon} location={location} items={boolInitArray} updateBoolItems={setBoolInitArray}/>}
                    {type===2 && <Continuity minVal={minVal} setMinVal={val=>setMinVal(/^[-]?[0-9]+$/.test(val)?val:0)} maxVal={maxVal} setMaxVal={val=>setMaxVal(/^[-]?[0-9]+$/.test(val)?val:1000)}
                                             step={step} setStep={val=>setStep(/^[-]?[0-9]+$/.test(val)?val:1)} unit={unit} setUnit={val=>setUnit(val.trim())}
                                             icon={icon} act={act} continuityStyle={continuityStyle} setContinuityStyle={setContinuityStyle} onLoad={setIcon}
                                             location={location} />}
                </div>
                <div className={style.popupBottom}>
                    {act===3 &&
                    <div className={style.checkBox+' '+style.noMargin}>
                        <span>定时/场景</span>
                        <Radio.Group options={addToTimerOptions} value={addToTimer} onChange={(e)=>setAddToTimer(e.target.value)}/>
                    </div>}
                    <div className={style.bottomBtn}>
                        <NormalButton onClick={cancel} text={'取消'}/>
                        <NormalButton onClick={confirmClick} on text={'确定'}/>
                    </div>
                </div>
            </div>
        </div>
    )
};
