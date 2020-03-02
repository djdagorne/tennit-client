import React, {Component} from 'react'
import './Header.css'
import LogIn from '../Pages/LogIn/LogIn.js'
import EditAccount from '../Pages/EditAccount/EditAccount'
import CreateAccount from '../Pages/CreateAccount/CreateAccount'
import TennitContext from '../../TennitContext'
import TokenService from '../../Services/token-service'

class Header extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props)
        this.state = {
        }
    }

    renderLogInLink = () =>{
        return(
            <nav className="nav-not-logged-in">
                <a 
                    href="/" 
                    className="logo text-shadow">
                        tennit
                </a>
                <button 
                    className="log-button text-shadow" 
                    onClick={e=>this.context.togglePopup('login')}>
                        log in (demo)
                </button>
                <button 
                    className="account-button text-shadow" 
                    onClick={e=>this.context.togglePopup('create')}>
                        sign up
                </button>
           </nav>
        )
    }

    renderLogOutLink = () =>{
        return(
            <nav className="nav-logged-in">
                <a 
                    href="/home" 
                    className="logo text-shadow">
                        tennit
                </a>
                <a href="/">
                    <button  
                        onClick={this.context.toggleLogIn} 
                        className="log-button text-shadow">
                            log out
                    </button>
                </a>
                <button 
                    onClick={e=>this.context.togglePopup('edit')} 
                    className="account-button text-shadow">
                        edit profile
                </button>
            </nav>
        )
    }


    render(){
        return (
            <>
                {TokenService.hasAuthToken() ? 
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
                    <EditAccount props={this.context}/> :
                    null
                }
            </>
        )
    }
}

export default Header