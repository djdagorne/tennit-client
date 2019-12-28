import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import LogIn from '../Pages/LogIn/LogIn.js'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            toggleLogIn: this.props.toggleLogIn,
            showLogInPopup: this.props.showLogInPopup,
            toggleLogInPopup: this.props.toggleLogInPopup,
            showCreatePopup: this.props.showCreate,
            toggleCreatePopup: this.props.toggleCreatePopup
        }
    };

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
                <button className="nav-button" onClick={this.props.toggleLogInPopup}>log in</button>
            </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/home" className="logo">Tenn.it</Link>
                <Link to="/"><button  onClick={this.props.toggleLogIn} className="nav-button">log out</button></Link>
                <Link to="/edit-account"><button to="/edit-account" className="nav-button">edit profile</button></Link>
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
                {this.props.showLogInPopup ? //TODO get it changing loggedin state
                        <LogIn 
                            loggedIn={this.state.loggedIn}
                            toggleLogIn={this.state.toggleLogIn}
                            showLogInPopup={this.state.showLogInPopup}
                            closePopup={this.props.toggleLogInPopup} 
                        /> :
                        null
                    }
            </>
        );
    }
}

export default Header;