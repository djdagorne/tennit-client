import React, { Component} from 'react';
import './SplashPage.css';
import CreateAccount from '../CreateAccount/CreateAccount.js'
import LogIn from '../LogIn/LogIn'
//import {Button} from '../../../Utils/Utils'

class SplashPage extends Component {
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
            <div className="splash">
                <div>
                    <h1 className="slogan">Fall in love - with affordable rent.</h1>
                    <br/>
                    <button onClick={this.props.toggleLogInPopup}>Log In</button>
                    {' '}
                    <button onClick={this.props.toggleCreatePopup}>create account</button>

                    {this.props.showCreatePopup ? 
                        <CreateAccount 
                            toggleLogIn={this.state.toggleLogIn}
                            loggedIn={this.state.loggedIn}
                            toggleCreatePopup={this.state.toggleCreatePopup}
                        /> :
                        null
                    }

                    {this.props.showLogInPopup ?
                        <LogIn 
                            loggedIn={this.state.loggedIn}
                            toggleLogIn={this.state.toggleLogIn}
                            showLogInPopup={this.state.showLogInPopup}
                            closePopup={this.state.toggleLogInPopup} 
                            loggedUser_id={this.state.loggedUser_id}
                            handleSubmit={this.props.handleSubmit}
                            
                            email={this.state.email}
                            password={this.state.password}

                            
                            handleInputChange={this.props.handleInputChange}
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default SplashPage;