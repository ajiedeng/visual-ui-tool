import {HashRouter as Router, Route, Switch} from "react-router-dom"
import React from 'react'
import {Setting} from "../features/settingPage/Setting"
import {Home} from "../features/homePage/Home"


export default function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/setting">
                    <Setting />
                </Route>
            </Switch>
        </Router>
    )
}