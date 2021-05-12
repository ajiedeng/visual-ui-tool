import deviceStatusReducer from './deviceStatusSlice';
import liveEditReducer from './liveEditSlice';
import profileReducer from './profileSlice';
import loadingReducer from './loadingSlice';
import {combineReducers} from '@reduxjs/toolkit'



const rootReducer = combineReducers({
    device:deviceStatusReducer,
    editing:liveEditReducer,
    profile:profileReducer,
    loading:loadingReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>


// type GlobalSelector<GlobalState,LocalSelectors>= {
//     [p in keyof LocalSelectors]:LocalSelectors[p] extends (state :infer LocalState,...arg: infer Rest) =>infer Result ? (stat:GlobalState,...arg:Rest)=>Result:LocalSelectors[p]
// }
// type T6 = GlobalSelector<RootState, typeof liveEditSlice.localSelectors>
// const obj:T6={} as T6
// obj.isEditing({} as RootState,'',2)
// function globalSelector<T>(localSelectors:Record<string,(local:T,...arg:any)=>any>,selectState:(state:RootState)=>T){
//     return Object.keys(localSelectors).reduce((selectors,key)=>{
//         (<any>selectors)[key] = (state:RootState,...args:any)=>{
//             return localSelectors[key](selectState(state),...args)
//         }
//         return selectors
//     },{})
// }