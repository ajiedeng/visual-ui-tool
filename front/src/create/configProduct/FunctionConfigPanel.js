import React, {useState, useEffect} from 'react'
import {Table,Row} from "./Table"
import { Checkbox,Menu } from 'antd';
import classNames from 'classnames'

import 'antd/es/checkbox/style/css'; // 加载 CSS
import 'antd/es/menu/style/css';
import '../../../src/index.css';
import './ProductConfigPage.css'
import style from './FunctionConfigPanel.module.css'

const actDesc = {
    0b01:'只读',
    0b10:'只写',
    0b11:'可读写'
}

const typeDesc = {
    1:'枚举',
    2:'连续',
    3:'简单',
    4:'布尔',
    5:'云功能'
}

const getInDesc = (profileItem,stringsItem,param) =>{
    const type =  (profileItem && profileItem.in && profileItem.in[0]) || 5;
    let str ='';
    if(type === 1){
        if(stringsItem && stringsItem.values && Object.keys(stringsItem.values).length>0){
            Object.keys(stringsItem.values).forEach(key=>{
                str+=key+'-'+stringsItem.values[key]+' \n'
            })
        }else{
            profileItem.in.slice(1).forEach(key=>{
                str+=key+'-'+param+'-'+key+' \n';
            })
        }
    }else if(type === 2){
        str = `min:${1}  \n min:${2}  \n步长:${3}`
    }else if(type === 3){
        str = '简单'
    }else if(type === 4){
        str = '开关'
    }else{
        str = ''
    }
    console.log(str);
    return str.replace(/(\r\n)|(\n)/g, '<br/>');
}

const keyToColumnNames = {
    'profile':['启用','名称','功能标识','操作权限','类型','取值范围'],
    'cloud':['启用','名称','操作权限'],
    'mutex':['序号','名称','状态','名称','状态']
};

export const FunctionConfigPanel = (
    {
        'profile':{profile,strings,newFunc,updateToggle},
        'cloud':{cloudProfile,cloudKeyToggle},
        'mutex':{addOrUpdateMutex,deleteMutex,mutexProfile}
    }
    ) => {
    function onChange(val,key) {
        console.log(`checked = ${val.target.checked}`);
        updateToggle(val.target.checked,key);
      }
      const [selectedKey,setSelectedKey] = useState('profile');
    console.log('-----selectedKey---',selectedKey);
    return (
        <div className={classNames("layer",style.FunctionConfigPanel)} >
            <Menu mode="horizontal" defaultSelectedKeys={[selectedKey]} onSelect={({key})=>setSelectedKey(key)}>
                <Menu.Item  key={'profile'}>基本功能 </Menu.Item>
                <Menu.Item  key={"cloud"}>云功能 </Menu.Item>
                <Menu.Item  key={'mutex'}>互斥配置</Menu.Item>
                <Menu.Item  key={'profileCopy'} className={(selectedKey==='profile'||selectedKey==='mutex')?'':style.hidden} >
                    {selectedKey==='profile'&&<a onClick={(e)=>{e.stopPropagation();newFunc()}}>+添加新功能</a>}
                    {selectedKey==='mutex'&&<a onClick={(e)=>{e.stopPropagation();addOrUpdateMutex()}}>+添加互斥</a>}
                </Menu.Item>
            </Menu>
            <Table columnNames={keyToColumnNames[selectedKey]}>
                {
                    selectedKey==='profile' && strings && profile&&profile.suids && profile.suids[0] && profile.suids[0].intfs &&
                    Object.keys(profile.suids[0].intfs).map((key,index)=>{
                        const profileItem = profile.suids[0].intfs[key][0];
                        const stringsItem = strings.intfs[key];
                        return (
                            <Row key={index}>
                                <td><Checkbox checked={profileItem.enable||(profileItem.enable===undefined)} onChange={(val)=>onChange(val,key)}/></td>
                                <td title={stringsItem?stringsItem.name:key}><span className="light">{profileItem.required?'*':''}</span>{stringsItem?stringsItem.name:key}</td>
                                <td title={key}>{key}</td>
                                <td>{actDesc[profileItem.act]}</td>
                                <td>{profileItem&&profileItem.in && typeDesc[profileItem.in[0]]}</td>
                                <td dangerouslySetInnerHTML={{ __html:getInDesc(profileItem,stringsItem,key)}}></td>
                            </Row>
                        )
                    })
                }
                {
                    selectedKey==='cloud' &&
                        Object.keys(cloudProfile).map((key,index)=>{
                            return  <Row key={key+index}>
                                <td><Checkbox checked={cloudProfile[key].enable||(cloudProfile[key].enable===undefined)} onChange={(val)=>cloudKeyToggle(val.target.checked,key)}/></td>
                                <td>{cloudProfile[key].name}</td>
                                <td>{actDesc[cloudProfile[key].act]}</td>
                            </Row>
                        })
                }
            </Table>
        </div>
    )
}
