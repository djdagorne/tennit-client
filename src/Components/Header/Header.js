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
        }
    };

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo">Tenn.it</Link>
            </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/home" className="logo">Tenn.it</Link>
                <Link to="/"><button  onClick={this.props.toggleLogIn} className="nav-button">log out</button></Link>

                <Link to="/edit-account"><button className="nav-button">edit profile</button></Link>
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
                            loggedIn={this.props.loggedIn}
                            toggleLogIn={this.props.toggleLogIn}
                        /> :
                        null
                    }

                {this.props.showCreatePopup ? 
                        <CreateAccount 
                            toggleLogIn={this.state.toggleLogIn}
                            loggedIn={this.state.loggedIn} //TODO submit should change in log in state
                            closePopup={this.props.toggleCreatePopup}
                        /> :
                        null
                    }
            </>
        );
    }
}

export default Header;