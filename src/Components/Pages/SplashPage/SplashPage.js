import React, {useContext, Component} from 'react';
import { Link } from 'react-router-dom'
import './SplashPage.css';
import CreateAccount from '../CreateAccount/CreateAccount.js'
import LogIn from '../LogIn/LogIn'

class SplashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            toggleLogIn: this.props.toggleLogIn,
            showCreate: false,
            showLogInPopup: this.props.showLogInPopup,
            toggleLogInPopup: this.props.toggleLogInPopup
        }
    }

    toggleCreatePopup = () => {
        this.setState({
            showCreatePopup: !this.state.showCreatePopup
        })
    }

    toggleLogInPopup = () =>{
		console.log('toggleLogInPopup')
        this.setState({
            showLogInPopup: !this.state.showLogInPopup
        })
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
                            toggleLogIn={this.state.toggleLogIn}
                            loggedIn={this.state.loggedIn} //TODO submit should change in log in state
                            closePopup={this.toggleCreatePopup.bind(this)}
                        /> :
                        null
                    }

                    <button onClick={this.toggleLogInPopup.bind(this)}>log in</button>

                    {this.state.showLogInPopup ? //TODO get it changing loggedin state
                        <LogIn 
                            loggedIn={this.props.loggedIn}
                            toggleLogIn={this.toggleLogIn}
                            showLogInPopup={this.state.showLogInPopup}
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