import React, {Component} from 'react';
import './LogIn.css'
import STORE from '../../../STORE'
import {Button, Input} from '../../../Utils/Utils'
import TokenService from '../../../Services/TokenService'
class LogIn extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            loggedUser_id: this.props.loggedUser_id,
            loggedIn: this.props.loggedIn,
            email: this.props.email,
            password: this.props.password,
            updateEmail: this.props.updateEmail,
            updatePassword: this.props.updatePassword,
            error: null
        }
    }

    toggleLogIn= () => {
        this.setState({
            toggleLogIn: !this.state.loggedIn
        })
    }

 /*    updateEmail = (email) => {
        this.setState({
            email: email
        })
    }

    updatePassword = (password) => {
        this.setState({
            password: password
        })
    } */

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(this.state.email.length === 0){
    //         this.setState({error: 'email required'})
    //     }
    //     if(this.state.password.length === 0){
    //         this.setState({error: 'password required'})
    //     }
    //     const userInfo = {
    //         email: this.state.email,
    //         password: this.state.password
    //     }
    //     const verify = STORE.makeUserArray()

    //     const matchedUser = verify.filter(userItems => userInfo.email === userItems.email)
    //     console.log('user match found, ' + matchedUser[0].firstName)
    //     if(userInfo.password === matchedUser[0].password){
    //         this.setState({
    //             loggedUser_id: matchedUser.id
    //         })
    //         TokenService.saveAuthToken(
    //             TokenService.makeBasicAuthToken(userInfo.email, userInfo.password)
    //         )
    //         this.props.toggleLogIn()
    //     }else{
    //         this.setState({error: 'username and password do not match, email admin to verify'})
    //     }
    // }

    render(){
        return(
            <div className="popup sign-up">
                <div className="popup_inner log-in">
                    <h2>Log In</h2>
                    <form
                        id="sign-up">
                        <div>
                        {this.state.error && <p>{this.state.error}</p>}
                        </div>
                        <div className="form-section">
                            <label htmlFor="email">Your email</label>
                            <Input 
                                name="email"
                                type="email"
                                onChange={this.props.updateEmail}
                                required
                                />
                        </div>
                        <div className="form-section">
                            <label htmlFor="password">Your password</label>
                            <Input 
                                name="password"
                                type="password"  
                                onChange={this.props.updatePassword}
                                required
                                />
                        </div>
                            <button onClick={this.state.closePopup}>
                                Cancel
                            </button>
                            <button
                                onClick={this.props.handleSubmit}
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