import React from 'react'

// import './ProductConfigPage.css'
const Loading = () => <div>loading</div>

const Error = ({error}) => <div>{error}</div>

export const Loadable = ({isLoading, error, children}) => {

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Error error={error}/>
    }

    return (
        <div className="wrap">
            {children}
        </div>
    )
}