import reducer from '../reducers'
import {configureStore} from '@reduxjs/toolkit';

// let createSagaMiddleware = require('redux-saga').default
// let rootSaga = require('./saga').default
// let sagaMiddleware = createSagaMiddleware()
// let store = createStore(reducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

const store = configureStore({
    reducer: reducer
});

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const newRootReducer = require('./rootReducer').default;
//         store.replaceReducer(newRootReducer)
//     })
// }

export default store;