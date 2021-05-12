import React from 'react';
import styles from './CreateProductProgressBar.module.css'
import './CreateProductProgressBar.css'

export const CreateProductProgressBar = ({curStep,urlJump,downloadUrl})=>{
    return (
        <div className={styles.CreateProductProgressBar}>
            <div className={styles.CreateProduct}>创建产品</div>
            <div className={styles.ProgressBar}>
                <ul>
                    <li className={curStep===0?styles.selected:styles.completed} >
                        <a className="num num-1">
                        </a>产品基本信息</li>
                    <li className={curStep===1?styles.selected:(curStep>1?styles.completed:'')} >
                        <a className="num num-2">
                        </a>H5功能配置</li>
                    <li className={curStep===2?styles.selected:(curStep>2?styles.completed:'')} >
                        <a className="num num-3">
                        </a>国际化语言</li>
                    <li className={curStep===3?styles.selected:''} onClick={()=>window.open(downloadUrl,'下载UI包')}>
                        <a className="num num-4">
                    </a>下载UI包</li>
                </ul>
            </div>
        </div>
    )
}
