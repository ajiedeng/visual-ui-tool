import React, {useEffect, useMemo, useState} from "react"
import * as PropTypes from "prop-types"
import style from './NavBar.module.css'
import * as device from "./device"
import sdk from 'broadlink-jssdk'
import classnames from 'classnames'

export function NavBar({homePage, subtitle, title, right}) {
    const [statusHeight, setStatusHeight] = useState(device.statusBarHeight)
    const [showMenuPopup, setShowMenuPopup] = useState()

    useEffect(() => {
        sdk.platformSDK.navbar.hide()
        sdk.platformSDK.callNative('getSystemSettings').then(setting => {
            if (setting && setting.statusBarHeight > 0) {
                setStatusHeight(device.isIOS ? setting.statusBarHeight : (setting.statusBarHeight / device.ratio))
            }
        })
    }, [])

    const rightMenus = useMemo(() => {
        let buttons
        if (right && !Array.isArray(right)) {
            buttons = [right]
        }
        if (homePage) {
            buttons = buttons || []
            buttons.push({
                text: '属性',
                handler: () => sdk.platformSDK.openDevicePropertyPage()
            })
        }
        return buttons
    }, [right, homePage])

    const menuClick = () => {
        if (rightMenus.length === 1) {
            rightMenus[0].handler()
        } else {
            setShowMenuPopup(!showMenuPopup)
        }
    }
    const back = () => {
        if (homePage) {
            sdk.platformSDK.closeWebView()
        } else {
            window.history.back()
        }
    }

    const textColor = homePage ? '#fff' : '#000'
    const ellipsis = homePage || (rightMenus && rightMenus.length > 1)

    return (
        <div className={style.navContainer} style={{background: homePage ? 'transparent' : 'white'}}>
            <div style={{height: statusHeight}}/>
            <div className={style.bar} style={{color: textColor}}>
                <div className={classnames({[style.left]: true, [style.blackArrow]: !homePage})} onClick={back}/>
                <div className={style.center}>
                    <p className={style.title}>{title}</p>
                    {subtitle && <span className={style.subTitle}>{subtitle}</span>}
                </div>
                {
                    rightMenus ?
                        <div className={classnames({[style.rightMenu]: true, [style.ellipsisMenu]: ellipsis})}
                             onClick={menuClick}>
                            {
                                ellipsis ? '\u2022\u2022\u2022' : rightMenus[0].text
                            }
                        </div>
                        :
                        <div/>
                }
            </div>
            {
                showMenuPopup &&
                <div className={style.menuPopup}>
                    {rightMenus.map((item, index) => (
                        <div key={index} className={style.menuItem} onClick={() => item.handler()}>{item.text}</div>
                    ))}
                </div>
            }
        </div>
    )
}

NavBar.propTypes = {
    subtitle: PropTypes.string,     //副标题（房间）不传则不显示
    title: PropTypes.string,        //标题
    homePage: PropTypes.bool,           //是否显示在首页
    right: PropTypes.oneOfType([    //右键
        PropTypes.object,           //1.类型是object 为单个按键 {text:"右键显示字符",handler:func} 右侧显示text，点击后调用handler方法 ,若右键方法为 NavBar.PROPERTY 则默认为属性
        PropTypes.array,            //2.类型array 为单个或多个按键 [{text:"右键显示字符1",handler:func1},{text:"右键显示字符2",handler:func2},...]
        //数组长度为0，右键不显示；大于1时，右侧会显示【...】点击出现详细菜单；等于1时，同object类型。
        //3.不传为undefined 右键为【...】，点击打开属性页
    ]),
    transparent: PropTypes.bool,        //是否透明 ture 透明 false 黑色
}