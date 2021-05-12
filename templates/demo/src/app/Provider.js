import {getOnline, getReady, getStatus, updateStatus, ready} from '../reducers/deviceStatusSlice'
import {loading} from '../reducers/loadingSlice';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from "./stroe"
import React, {useEffect, useState} from 'react'
import * as logic from '../logic';
import {Loading} from "../components/Loading"
import {onReceiveMessage, postGlobalSchema, postProfileInfo, postReadyEvent} from "../components/messages"
import {selectGlobalSettings, selectProfile, selectStrings} from "../reducers/profileSlice"
import {getGlobalSettingSchema} from './preseSchema'

const Root = ({children}) => {
    const status = useSelector(getStatus)
    const online = useSelector(getOnline)
    const isStatusReady = (online === '1' || online === '2') ?
        (status && Object.keys(status).length > 0) :
        (online === '0' || online === '3')
    const isReady = useSelector(getReady)
    const isLoading = useSelector(state => state.loading)
    const isOnline = online === '1' || online === '2'
    const dispatch = useDispatch()
    const globalSettings = useSelector(selectGlobalSettings)

    const [firstTimeRender, setIsFirstTime] = useState(true)
    useEffect(() => {
        setIsFirstTime(false)
    }, [])
    useEffect(function () {
        if (process.env.REACT_APP_PREVIEW === 'true') {
            const onMessage = onReceiveMessage(dispatch)
            window.addEventListener("message", onMessage, false);

            postReadyEvent()

        }
    }, [])

    const profile = useSelector(selectProfile)
    const strings = useSelector(selectStrings)
    useEffect(() => {
        if (process.env.REACT_APP_PREVIEW === 'true' && !firstTimeRender) {
            postProfileInfo({profile, strings})
        }
    }, [profile, strings])

    useEffect(() => {
        // console.error('process.env.REACT_APP_PREVIEW === \'true\' && !firstTimeRender',process.env.REACT_APP_PREVIEW === 'true' ,firstTimeRender)
        if (process.env.REACT_APP_PREVIEW === 'true' && !firstTimeRender) {
            postGlobalSchema(getGlobalSettingSchema(globalSettings))
        }
    }, [globalSettings])

    useEffect(() => {
        const defaultLogicProp = {
            // updateStrategy:'immediate',
            loading: (show) => dispatch(loading(show)),
            onFail: e => {
                // notifyError(e);
                console.error(e)
                return true
            },
            // retry:{
            //     errorCode:1,
            //     retryCount:3,
            //     timeout:500
            // }
        };

        const update = (stauts, isFirstTime) => {
            const state = logic.getState();
            dispatch(updateStatus(state));
        };

        logic.ready(update).catch(e => {
            // Modal.alert(e.message||e.msg);
            // notifyError(e);
            dispatch(ready());
        });
        logic.updateDefaultControlOpts(defaultLogicProp);
    }, [])

    useEffect(() => {
        logic.updateDefaultControlOpts({updateStrategy: globalSettings.updateStrategy});
    })

    return <React.Fragment>
        {children}
        {(!isReady || isLoading || !isStatusReady) && <Loading/>}
        {/*{!isOnline && <div>offline........</div>}*/}
    </React.Fragment>
}

export default ({children}) => (
    <Provider store={store}>
        <Root>
            {children}
        </Root>
    </Provider>
)
