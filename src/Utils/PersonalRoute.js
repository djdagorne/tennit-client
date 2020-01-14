import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Services/TokenService'

const PersonalRoute = ({ component, ...props }) => {
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

export default PersonalRoute