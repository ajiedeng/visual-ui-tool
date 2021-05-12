import React,{useState, useEffect,useRef,useMemo}  from 'react';
import {Input,Select} from 'antd';
import 'antd/es/select/style/css'
import style from "./ProductMutexPopup.module.scss";
import {NormalButton} from "../../components/StepButton";

function SelectBox({}) {

}

function filterByKeyType(profile,stings) {
    const _profile_keyVal = profile.suids[0].intfs;
    const keyVal = {};
    for(const key in _profile_keyVal){
        if(_profile_keyVal[key][0]['in'][0] ===1 || _profile_keyVal[key][0]['in'][0] ===4){
            keyVal[key] = stings.intfs[key]
        }
    }
    return keyVal
}

export const ProductMutexPopup = function ({profile,stings}) {
    const [name,setName] = useState('xxx');
    // const _picked_keyVal = useMemo(() => filterByKeyType(profile,stings), [profile,stings]);
    console.log('---profile---',profile);
    // console.log('---_picked_keyVal---',_picked_keyVal);
    return (
        <div>
            <div className={style.mask}>
            </div>
            <div className={style.popup}>
                <p className={style.title}>
                    添加互斥
                </p>
                <h2>该功能状态下</h2>
                <div className={style.mutexCondition}>
                    <div className={style.selectBox}>
                        <div className={style.selectBar}>
                            <span>功能名称</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                        <div className={style.selectBar}>
                            <span>功能状态</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <h2>以下功能将禁用</h2>
                <div className={style.mutexLimits}>
                    <div className={style.selectBox}>
                        <div className={style.selectBar}>
                            <span>功能名称</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                        <div className={style.selectBar}>
                            <span>功能状态</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className={style.selectBox}>
                        <div className={style.selectBar}>
                            <span>功能名称</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                        <div className={style.selectBar}>
                            <span>功能状态</span>
                            <Select className={style.select} defaultValue="lucy"  size={'large'} onChange={(t)=>setName(t.target.value.trim())}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className={style.popupBottom}>
                    <div className={style.bottomBtn}>
                        <NormalButton onClick={()=>'cancel'} text={'取消'}/>
                        <NormalButton onClick={()=>'cancel'} on text={'确定'}/>
                    </div>
                </div>
            </div>
        </div>
    )
};
