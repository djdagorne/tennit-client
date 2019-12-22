import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import LogIn from '../Pages/LogIn/LogIn'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
                 <button onClick={this.props.toggleLogIn} className="nav-button">log in</button>
            </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
                <button onClick={this.props.toggleLogIn} className="nav-button">log out</button>
                <button to="/create-account" className="nav-button">edit profile</button>
            </nav>
        )
    }


    render(){
        return (
            <header className="header">
                {this.props.loggedIn ? 
                    this.renderLogOutLink() :
                    this.renderLogInLink()
                }
            </header>
        );
    }
}

export default Header;