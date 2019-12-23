import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

class Header extends Component {

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
                 {/* <button onClick={this.props.toggleLogInPopup} className="nav-button">log in</button> */}
            </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
                <button onClick={this.props.toggleLogInPopup} className="nav-button">log out</button>
                <button to="/create-account" className="nav-button">edit profile</button>
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
            </>
        );
    }
}

export default Header;