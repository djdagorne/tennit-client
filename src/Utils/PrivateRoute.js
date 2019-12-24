import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component, ...props }) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                true
                ? <Component {...componentProps} />
                : <Redirect
                    to={{
                    pathname: '/splash',
                    state: { from: componentProps.location }
                    }}
                />
            )}
        />
    )
}