import React, { Component} from 'react';
import './SplashPage.css';
import TennitContext from '../../../TennitContext';
// import CreateAccount from '../CreateAccount/CreateAccount.js'
// import LogIn from '../LogIn/LogIn'
// import TokenService from '../../../Services/TokenService';
//import {Button} from '../../../Utils/Utils'

class SplashPage extends Component {
    static contextType = TennitContext

    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            toggleLogIn: this.props.toggleLogIn,
            showLogInPopup: this.props.showLogInPopup,
            toggleLogInPopup: this.props.toggleLogInPopup,
            showCreatePopup: this.props.showCreate,
            toggleCreatePopup: this.props.toggleCreatePopup,
            loggedUser_id: this.props.loggedUser_id,
            handleSubmit: this.props.handleSubmit,

            email: this.props.email,
            password: this.props.password,
            handleInputChange: this.props.handleInputChange,
        }
    }


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