import React from 'react';
import '../CSS/Signup.css';
import LoginPart from '../Component/FrontPage/LoginPart'

export default class Signup extends React.Component {
    render() {
        return (
            <>
                <div className="fullbody">
                    <LoginPart />
                </div>
            </>)
    }
}