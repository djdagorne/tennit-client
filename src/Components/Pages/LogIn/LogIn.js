import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css'

class LogIn extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedIn: this.props.loggedIn,
        }
	}
    render(){
        return(
            <div className="popup sign-up">
                <div className="popup_inner log-in">
                    <h2>Log In</h2>
                    <form id="sign-up">
                        <div className="form-section">
                            <label htmlFor="email">Your email</label>
                            <input type="email" name="email" placeholder="smithy@smithmail.com" /* required *//>
                        </div>
                        <div className="form-section">
                            <label htmlFor="password">Your password</label>
                            <input type="password" name="password" placeholder="smithy@smithmail.com" /* required *//>
                        </div>
                        <Link className="button" to="/" onClick={this.props.closePopup}>Cancel</Link>
                        <Link className="button" to="" onClick={this.props.toggleLogIn}>Log in</Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;