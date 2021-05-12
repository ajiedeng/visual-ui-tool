import React, {useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {postComponentSchema} from "./messages"
import {currentChosenComponentId, getCurrentChosenComponentId, isEditing} from "../reducers/liveEditSlice"
import style from './editable.module.css'
import classNames from 'classnames'

export function editAble(Component,useCapture) {

    const ForwardRefComponent =  React.forwardRef((props, ref) => {
        return <Component {...props} forwardedRef={ref} />;
    });

    return (props) =>{
        const ref = useRef({})
        const dispatch = useDispatch()
        const currentId = useSelector(getCurrentChosenComponentId)
        const editing = useSelector(isEditing)
        const onClick = (e) => {
            if (process.env.REACT_APP_PREVIEW === 'true' && editing) {
                e.stopPropagation()
                console.error('拦截了')
                //高亮
                dispatch(currentChosenComponentId(props.id))
                //发送
                if(ref.current.getSchema){
                    // console.error(JSON.stringify(ref.current.getSchema()))
                    postComponentSchema(ref.current.getSchema(),ref.current.handleUpdate)
                }
            }
        }

        const clickProp = {
            [useCapture?"onClickCapture":"onClick"] :onClick
        }

        return (
            <div {...clickProp} className={classNames(style.normal,{[style.highlight]:props.id === currentId})}>
                <ForwardRefComponent ref={ref} {...props}/>
            </div>
        )
    }
}