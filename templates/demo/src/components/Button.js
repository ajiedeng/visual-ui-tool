import React from "react"
import PropTypes from 'prop-types';
import style from './Button.module.css'
import styled from 'styled-components'
import {useSelector} from "react-redux"
import {selectThemeColor} from "../reducers/profileSlice"
import classNames from 'classnames'

const Icon = styled.a`
&.fillOn g{
        fill: ${ props => props.themeColor };
    },
&.fillOff g{
    fill: transpate;//设置带圆背景的icon 圆的颜色
    },
`;

export const Button = ({Svg ,imgStr,label,onClick,disabled,on,isOnWhiteBg}) => {
    const themeColor = useSelector(selectThemeColor)

    let iconEle ;
    if(Svg){
        iconEle = <Icon  className={classNames({'fillOn':on, 'fillOff':!on})}  themeColor={themeColor}>
            <Svg/>
        </Icon>
    }else if(imgStr && imgStr.indexOf('svg+xml')>=0){
        let svgStr = atob(imgStr.split(',')[1])
        iconEle =  <Icon className={on?'fillOn':'fillOff'}  themeColor={themeColor} dangerouslySetInnerHTML={{__html:svgStr}}/>
    }else if(imgStr){
        iconEle = <img src={imgStr}/>
    }

    return (
        <div onClick={onClick} className={style.Buttons}>
            <div className={classNames({[style.icon]:true,[style.on]:on})}  style={{borderColor:isOnWhiteBg ? '#E1E1E1': '#fff'}}>
                {iconEle}
            </div>
            {label && <span style={{color:isOnWhiteBg ? '#555': '#fff'}}>{label}</span>}
        </div>
    );
}

Button.propTypes = {
    //图片SVG
    svg: PropTypes.element,
    //图片下方文字
    label: PropTypes.string,
    onClick: PropTypes.func,
    //是否高亮
    on: PropTypes.bool,
    disable: PropTypes.bool
}