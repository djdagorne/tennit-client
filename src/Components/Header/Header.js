import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import LogIn from '../Pages/LogIn/LogIn.js'
import EditAccount from '../Pages/EditAccount/EditAccount'
import CreateAccount from '../Pages/CreateAccount/CreateAccount'
import TennitContext from '../../TennitContext'

class Header extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
        }
    };

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <Link to="/" className="logo text-shadow">tenn.it</Link>
                <button className="log-button text-shadow" onClick={this.context.toggleLogInPopup}>log in (demo)</button>
                <button className="account-button text-shadow" onClick={this.context.toggleCreatePopup}>sign up</button>
           </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <Link to="/home" className="logo text-shadow">tenn.it</Link>
                <Link to="/"><button  onClick={this.context.toggleLogIn} className="log-button text-shadow">log out</button></Link>
                <button onClick={this.context.toggleEditPopup} className="account-button text-shadow">edit profile</button>
            </nav>
        )
    }


    render(){
        return (
            <>
                {this.context.loggedIn ? 
                    this.renderLogOutLink() :
                    this.renderLogInLink()
                }

                {this.context.showLogInPopup ?
                        <LogIn /> :
                        null
                    }

                {this.context.showCreatePopup ? 
                    <CreateAccount /> :
                    null
                }

                {this.context.showEditPopup ? 
                    <EditAccount /> :
                    null
                }
            </>
        );
    }
}

export default Header;