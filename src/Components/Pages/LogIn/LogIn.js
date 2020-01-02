import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css'
import STORE from '../../../STORE'
import HomePage from '../HomePage/HomePage'
import {Button, Input} from '../../../Utils/Utils'

class LogIn extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            loggedUserId: this.props.loggedUserId,
            loggedIn: this.props.loggedIn,
            loggedUser_id: '',
            email: '',
            password: '',
            error: null
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
        //TODO get it matching login info with entire datastore
        //
        //const matchedUser = verify.filter(useritems => userInfo.email ===  useritems.email)
        //(this returns the object from verify's array that matches)
        //setState as loggedUser_id: matchedUser.id etc
        e.preventDefault();
        if(this.state.email.length === 0){
            this.setState({error: 'email required'})
            return 
        }
        if(this.state.password.length === 0){
            this.setState({error: 'password required'})
            return 
        }
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        const verify = STORE.makeUserArray()

        if(userInfo.email === verify[0].email && userInfo.password === verify[0].password){
            console.log('samey')
            this.setState({ loggedUserId: verify[0].id})
            this.setState({
                loggedUser_id: verify[0].id
            })
            this.props.toggleLogIn()
        }else{
            this.setState({error: 'username and password do not match, email admin to verify'})
            return 
        }
    }

    render(){
        return(
            <div className="popup sign-up">
                <div className="popup_inner log-in">
                    <h2>Log In</h2>
                    <form
                        onSubmit={e=>this.handleSubmit(e)} 
                        id="sign-up">
                        <div>
                        {this.state.error && <p>{this.state.error}</p>}
                        </div>
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
                            <button onClick={this.props.closePopup}>
                                Cancel
                            </button>
                        <Link to="/home" >
                            <button type="submit">
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