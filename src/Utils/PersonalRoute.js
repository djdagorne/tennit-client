import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Services/token-service'

const PersonalRoute = ({ component, ...props }) => {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken() //compare .params.match_id to loggedUserMatches ?
                    //TODO cont... maybe set up a seperate service to store match_ids? i am so tired atm sorry future dexter
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