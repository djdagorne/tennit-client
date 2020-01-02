import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, ...props }) => {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                false //hasToken
                ? <Component {...componentProps} />
                : <Redirect
                    to={{
                    pathname: '/',
                    state: { from: componentProps.location }
                    }}
                />
            )}
        />
    )
}

export default PrivateRoute