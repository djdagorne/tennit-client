import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './SplashPage.css';
import CreateAccount from '../CreateAccount/CreateAccount.js'
import LogIn from '../LogIn/LogIn'

class SplashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            showCreate: false,
            showLogInPopup: false,
        }
    }


    toggleCreatePopup = () => {
        this.setState({
            showCreatePopup: !this.state.showCreatePopup
        })
    }
	
    toggleLogInPopup = () =>{
		console.log(this.state.showLogInPopup)
        this.setState({
            showLogInPopup: !this.state.showLogInPopup
        })
    }

    helpfunct = () => {
        console.log('help2')
    }

    render(){
        return (
            <div className="splash">
                <div>
                    <h1 className="slogan">Fall in love - with affordable rent.</h1>
                    <img alt="apartment pic here"/>
                    <br/>
                    <button onClick={this.toggleCreatePopup.bind(this)}>create account</button>

                    {this.state.showCreatePopup ? 
                        <CreateAccount 
                            loggedIn={this.state.loggedIn} //TODO SUBMIT SHOULD CHANGE THIS STATE
                            closePopup={this.toggleCreatePopup.bind(this)}
                        /> :
                        null}

                    <button onClick={this.toggleLogInPopup}>log in</button>

                    {this.state.showLogInPopup ? //TODO
                        <LogIn 
                            loggedIn={this.state.loggedIn}
                            closePopup={this.toggleLogInPopup.bind(this)} 
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default SplashPage;