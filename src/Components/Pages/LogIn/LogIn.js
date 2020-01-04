import React, {Component} from 'react';
import './LogIn.css'
//import {Button, Input} from '../../../Utils/Utils'
class LogIn extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            handleSubmit:this.props.handleSubmit,
            loggedUser_id: this.props.loggedUser_id,
            loggedIn: this.props.loggedIn,
            email: this.props.email,
            password: this.props.password,
            handleInputChange: this.props.handleInputChange,
            error: null
        }
    }

    toggleLogIn= () => {
        this.setState({
            toggleLogIn: !this.state.loggedIn
        })
    }
    render(){
        return(
            <div className="popup sign-up">
                <div className="popup_inner log-in">
                    <h2>Log In</h2>
                    <form
                        onSubmit={this.props.handleSubmit}
                        id="sign-up">
                        <div>
                        {this.state.error && <p>{this.state.error}</p>}
                        </div>
                        <div className="form-section">
                            <label htmlFor="email">Your email</label>
                            <input 
                                name="email"
                                type="email"
                                onChange={this.props.handleInputChange}
                                required
                                />
                        </div>
                        <div className="form-section">
                            <label htmlFor="password">Your password</label>
                            <input 
                                name="password"
                                type="password"  
                                onChange={this.props.handleInputChange}
                                required
                                />
                        </div>
                            <button onClick={this.state.closePopup}>
                                Cancel
                            </button>
                            <button 
                                type="submit">
                                Log in
                            </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;