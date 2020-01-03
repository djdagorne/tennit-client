import React, { Component} from 'react';
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


    render(){
        return (
            <div className="splash">
                <div>
                    <h1 className="slogan">Fall in love - with affordable rent.</h1>
                    <br/>
                    <Button onClick={this.props.toggleLogInPopup}>Log In</Button>
                    {' '}
                    <Button onClick={this.props.toggleCreatePopup}>create account</Button>

                    {this.props.showCreatePopup ? 
                        <CreateAccount 
                            toggleLogIn={this.props.toggleLogIn}
                            loggedIn={this.props.loggedIn} //TODO submit should change in log in state
                            toggleCreatePopup={this.props.toggleCreatePopup}
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