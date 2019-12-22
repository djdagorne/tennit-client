import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css'

class LogIn extends Component {
    render(){
        return(
            <div class="log-in">
                <h2>Log In</h2>
                <form id="sign-up">
                    <div class="form-section">
                        <label for="email">Your email</label>
                        <input type="email" name="email" placeholder="smithy@smithmail.com" /* required *//>
                    </div>
                    <div class="form-section">
                        <label for="password">Your password</label>
                        <input type="password" name="password" placeholder="smithy@smithmail.com" /* required *//>
                    </div>
                    <Link className="button" to="/" >Cancel</Link>
                    <Link className="button" to="/home" type="submit" onClick={console.log('make this change jwt boolean to true, get logout toggle display working')}>Log in</Link>
                </form>
            </div>
        )
    }
}

export default LogIn;