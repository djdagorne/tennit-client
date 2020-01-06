import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import LogIn from '../Pages/LogIn/LogIn.js'
import CreateAccount from '../Pages/CreateAccount/CreateAccount'
import TennitContext from '../../TennitContext'

class Header extends Component {
    static context = TennitContext
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            toggleLogIn: this.props.toggleLogIn,
            showLogInPopup: this.props.showLogInPopup,
            toggleLogInPopup: this.props.toggleLogInPopup,
            showCreatePopup: this.props.showCreate,
            toggleCreatePopup: this.props.toggleCreatePopup,
            loggedUser_id: this.props.loggedUser_id,
            handleSubmit: this.props.handleSubmit,

            email: this.props.email,
            password: this.props.password,
            handleInputChange: this.props.handleInputChange,
        }
    };

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo">tenn.it</Link>
                <button className="log-button" onClick={this.props.toggleLogInPopup}>log in</button>
                <button className="account-button" onClick={this.props.toggleCreatePopup}>sign up</button>

           </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/home" className="logo">tenn.it</Link>
                <button  onClick={this.props.toggleLogIn} className="log-button">log out</button>

                <button onClick={this.props.toggleCreatePopup} className="account-button">edit profile</button>
            </nav>
        )
    }


    render(){
        return (
            <>
                {this.props.loggedIn ? 
                    this.renderLogOutLink() :
                    this.renderLogInLink()
                }

                {this.props.showLogInPopup ?
                        <LogIn 
                            loggedUser_id={this.state.loggedUser_id}
                            loggedIn={this.props.loggedIn}
                            toggleLogIn={this.props.toggleLogIn}
                            showLogInPopup={this.state.showLogInPopup}
                            closePopup={this.state.toggleLogInPopup} 
                            handleInputChange={this.props.handleInputChange}
                            handleSubmit={this.props.handleSubmit}
                            error={this.props.error}
                            email={this.state.email}
                            password={this.state.password}
                        /> :
                        null
                    }

                {this.props.showCreatePopup ? 
                        <CreateAccount 
                            loggedUser_id={this.state.loggedUser_id}
                            toggleLogIn={this.state.toggleLogIn}
                            loggedIn={this.state.loggedIn}
                            toggleCreatePopup={this.props.toggleCreatePopup}
                            handleInputChange={this.props.handleInputChange}
                            handleSubmit={this.props.handleSubmit}
                        /> :
                        null
                    }
            </>
        );
    }
}

export default Header;