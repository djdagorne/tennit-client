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
            error: this.props.error
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
                    <button onClick={this.props.closePopup}> {/* make this button an X in the top right corner */}
                        Cancel
                    </button>
                    <form
                        onSubmit={this.props.handleSubmit}
                        id="sign-up">
                        <div>
                            
                        {this.props.error && <p>{this.props.error}</p>}
                        </div>
                        <div className="form-section">
                            <input 
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={this.props.handleInputChange}
                                />
                        </div>
                        <div className="form-section">
                            <input 
                                name="password"
                                type="password"  
                                placeholder="Password"
                                onChange={this.props.handleInputChange}
                                />
                        </div>
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