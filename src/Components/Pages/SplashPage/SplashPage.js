import React, { Component} from 'react';
import './SplashPage.css';
import TennitContext from '../../../TennitContext';
// import CreateAccount from '../CreateAccount/CreateAccount.js'
// import LogIn from '../LogIn/LogIn'
// import TokenService from '../../../Services/TokenService';
//import {Button} from '../../../Utils/Utils'

class SplashPage extends Component {
    static contextType = TennitContext


    render(){
        return (
            <div className="slogan-wrap">
                <div className="slogan">
                    <h1 className="slogan-text">Fall in love.</h1> 
                    <h2 className="slogan-text">with affordable rent.</h2>
                </div>
            </div>
        );
    }
}

export default SplashPage;