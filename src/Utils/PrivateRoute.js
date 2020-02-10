import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Services/token-service'

const PrivateRoute = ({ component, ...props }) => {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken() //hasToken
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