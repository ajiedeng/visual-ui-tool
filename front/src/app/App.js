import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import {ProductsListPage} from '../productsList/ProductsListPage'
import {NewProductPage} from '../create/newProduct/NewProductPage'
import {ProductConfigPage} from "../create/configProduct/ProductConfigPage"
import {fetchTemplates} from "./templatesSlice"
import {Loadable} from "../components/Loadable"
import styles from './App.module.css'
import logo from './images/logo.png'

export default () => {
    const {isLoading, error} = useSelector(state => state.templates);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTemplates())
    }, [])


    return (

        <Router>
            <div>
                <div className={styles.header}><div className="wrap"><img src={logo} alt="" />· 可视化平台</div></div>
                <Loadable isLoading={isLoading} error={error}>
                    <Switch>
                        <Route exact path="/">
                            <ProductsListPage/>
                        </Route>
                        <Route path="/create">
                            <NewProductPage/>
                        </Route>
                        <Route path="/config">
                            <ProductConfigPage/>
                        </Route>

                    </Switch>
                </Loadable>
            </div>
        </Router>

    )
}
