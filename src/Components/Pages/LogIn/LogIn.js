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
        },()=>{this.forceUpdate()})
    }
    render(){
        return(
            <div className="popup">
                <div className="popup-inner ">
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
                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <input 
                                name="email"
                                type="email"
                                placeholder="john@email.com"
                                onChange={this.props.handleInputChange}
                                />
                        </div>
                        <div className="form-item">
                            <label htmlFor="Password">Password</label>
                            <input 
                                name="password"
                                type="password"  
                                placeholder="********"
                                onChange={this.props.handleInputChange}
                                />
                        </div>
                        <div className="buttons">
                            <button 
                                type="submit">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;