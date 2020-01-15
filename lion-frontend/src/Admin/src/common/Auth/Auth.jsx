import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { role } from '../../../../utility';

const Auth = ({ component: Component, role: Role, ...rest }) => {
    const roleAuth = role();
    return (
        <Route {...rest} render={props => {
            if (roleAuth.error) {
                console.log(roleAuth.error)
                    return (<Redirect to={{
                        pathname: '/sign-in',
                        state: { from: props.location }
                    }} />) 
            } else {
                if (Role.indexOf(roleAuth) !== -1) {
                    return (
                        <Component {...props} />
                    )
                } else {
                    return (
                        <div>
                            <h1>Forbidden</h1><br />
                            <p>You don't have pemission to access/ on this server </p>
                        </div>
                    )
                }
            }
        }} />
    )
}

export default Auth;