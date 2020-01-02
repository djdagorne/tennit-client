import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import './SplashPage.css';
import CreateAccount from '../CreateAccount/CreateAccount.js'
import LogIn from '../LogIn/LogIn'
import {Button} from '../../../Utils/Utils'

class SplashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            toggleLogIn: this.props.toggleLogIn,
            showLogInPopup: this.props.showLogInPopup,
            toggleLogInPopup: this.props.toggleLogInPopup,
            showCreatePopup: this.props.showCreate,
            toggleCreatePopup: this.props.toggleCreatePopup
        }
    }

    toggleCreatePopup = () => {
        this.setState({
            showCreatePopup: !this.state.showCreatePopup
        })
    }

    render(){
        return (
            <div className="splash">
                <div>
                    <h1 className="slogan">Fall in love - with affordable rent.</h1>
                    <img alt="apartment pic here"/>
                    <br/>
                    <Button onClick={this.toggleCreatePopup.bind(this)}>create account</Button>

                    {this.state.showCreatePopup ? 
                        <CreateAccount 
                            toggleLogIn={this.state.toggleLogIn}
                            loggedIn={this.state.loggedIn} //TODO submit should change in log in state
                            closePopup={this.toggleCreatePopup.bind(this)}
                        /> :
                        null
                    }

                    {this.props.showLogInPopup ? //TODO get it changing loggedin state
                        <LogIn 
                            loggedIn={this.state.loggedIn}
                            toggleLogIn={this.state.toggleLogIn}
                            showLogInPopup={this.state.showLogInPopup}
                            closePopup={this.props.toggleLogInPopup} 
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default SplashPage;