import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleLogInPopup: this.props.toggleLogInPopup
        };
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
                <Link to="/" ><button onClick={this.props.toggleLogIn} className="nav-button">log out</button></Link>
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