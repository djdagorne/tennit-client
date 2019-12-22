import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './SplashPage.css';
import CreateAccount from '../CreateAccount/CreateAccount.js'
import LogIn from '../LogIn/LogIn'

class SplashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCreate: false,

            loggedIn: this.props.loggedIn,
            showLogInPopup: false,
            toggleLogIn: this.props.toggleLogIn,
            toggleLogInPopup: this.props.toggleLogInPopup,
        }
    }


    toggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

	
    // toggleLogInPopup = () =>{
	// 	console.log(`changing to `+ !this.state.showLogInPopup)
    //     this.setState({
    //         showLogInPopup: !this.state.showLogInPopup
    //     })
    // }
    render(){
        return (
            <div className="splash">
                <div>
                    <h1 className="slogan">Fall in love - with affordable rent.</h1>
                    <img alt="apartment pic here"/>
                    <br/>
                    <button onClick={this.toggleCreate.bind(this)}>create account</button>

                    {this.state.showCreate ? 
                        <CreateAccount 
                            loggedIn={this.state.loggedIn}
                            closePopup={this.toggleCreate.bind(this)}
                        /> :
                        null}

                    {this.state.showLogInPopup ? //TODO
                        <LogIn 
                            toggleLogIn={this.state.toggleLogIn} 
                            closePopup={this.toggleLogInPopup}
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default SplashPage;