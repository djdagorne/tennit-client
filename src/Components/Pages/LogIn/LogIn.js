import React, {Component} from 'react';
import './LogIn.css'
import TennitContext from '../../../TennitContext'
//import {Button, Input} from '../../../Utils/Utils'

class LogIn extends Component {
	static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <div className="popup">
                <div className="popup-inner ">
                    
                    <button 
                        className="close-popup" 
                        onClick={e=>this.context.togglePopup('login')}> {/* make this button an X in the top right corner */}
                            X
                    </button>
                    <h2>Log In</h2>
                    <form
                        onSubmit={this.context.handleLogIn}
                        id="sign-up">
                        {/* <div>
                            {this.context.error && <p>{this.context.error}</p>}
                        </div> */}
                        <div className="form-item">
                            <label htmlFor="email">Email (john@email.com)</label>
                            <input 
                                name="email"
                                type="email"
                                placeholder="john@email.com"
                                onChange={this.context.handleInputChange}
                                />
                        </div>
                        <div className="form-item">
                            <label htmlFor="Password">Password (AAaa11!!)</label>
                            <input 
                                name="password"
                                type="password"  
                                placeholder="********"
                                onChange={this.context.handleInputChange}
                                />
                        </div>
                        <div className="button-wrap">
                            <button 
                                className="rounded-button"
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