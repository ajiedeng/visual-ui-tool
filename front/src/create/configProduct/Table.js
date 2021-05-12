import React, {useState, useEffect} from 'react'
import classNames from 'classnames';

import style from './Table.module.css'

export const Row = ({children})=>{
    return (
        <tr>
            {children}
        </tr>
    )

}

const columnStyle = {
    3:style.columns3,
    5:style.columns5,
    6:style.columns6,
};

export const Table = ({columnNames,children}) => {
    console.log('-----columnNames-----',columnNames)
    return (
       <div className={style.tableList}>
            <div className={classNames(style.titleTable,columnStyle[columnNames.length])}>
                    {columnNames.map((column,index)=><p key={index}>{column}</p>)}
            </div>
            <div className={style.tbody}>
                <table  className={classNames(style.oneColumn,columnStyle[columnNames.length])}>
                    <tbody>
                        {children}
                    </tbody>
               </table>
            </div>

       </div>
    )
}
