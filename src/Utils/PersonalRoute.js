import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Services/token-service'

const PersonalRoute = ({ component, ...props }) => {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken() //hasToken //TODO make this check context.loggedUserMatches for a matching id. if context doesn't contain the ID, send to NotFoundPage
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