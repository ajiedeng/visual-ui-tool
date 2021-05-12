import {RootState} from "./index";


export const getSelector = <SliceState,RestArgs,Return>(gSelector: (state:RootState) => SliceState) =>
    <Return,RestArgs extends any[]>(selector:(state:SliceState,...arg:RestArgs)=>Return) =>
        (state:RootState,...args:RestArgs)=>selector(gSelector(state),...args)