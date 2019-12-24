import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css'
import STORE from '../../../STORE'
import HomePage from '../HomePage/HomePage'

class LogIn extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            email: '',
            password: ''
        }
    }

    toggleLogIn= () => {
        this.setState({
            toggleLogIn: !this.state.loggedIn
        })
    }

    updateEmail = (email) => {
        this.setState({
            email: email
        })
    }

    updatePassword = (password) => {
        this.setState({
            password: password
        })
    }

    handleSubmit = (e) => {
        //TODO add actual verification steps
        e.preventDefault();
        if(this.state.email.length === 0){
            alert("email required.")
        }
        if(this.state.password.length === 0){
            alert("password required.")
        }
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        const verify = STORE.makeUserArray()
        console.log(userInfo)
        console.log(verify[0])

        if(userInfo.email === verify[0].email && userInfo.password === verify[0].password){
            console.log('samey')
            this.props.toggleLogIn()
        }else{
            alert('username and password do not match, email admin to verify')
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
                            <input 
                                id="email"
                                type="email" 
                                onChange={e => this.updateEmail(e.target.value)}
                                required
                                />
                        </div>
                        <div className="form-section">
                            <label htmlFor="password">Your password</label>
                            <input 
                                id="password"
                                type="password"  
                                onChange={e => this.updatePassword(e.target.value)}
                                required
                                />
                        </div>
                        <Link className="button" to="/" onClick={this.props.closePopup}>
                            <button >
                                Cancel
                            </button>
                        </Link>
                        <Link className="button" to="/home" >
                            <button onClick={e=>this.handleSubmit(e)}>
                                Log in
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;