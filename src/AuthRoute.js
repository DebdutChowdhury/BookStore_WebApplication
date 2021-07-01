import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class AuthRout extends React.Component {

    render() {
        console.log(this.props);
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('Token');
        console.log(isAuthenticated);
        return (
        <Route render={props => (
            isAuthenticated ?

                <Redirect to={"/home"} />
                :
                <Component {...props} />
        )} />
        )}
}

export default AuthRout;