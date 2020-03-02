import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service'
import TokenService from '../../../Services/token-service'

export default class HomePage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        this.setState({ error: null })
        this.context.getLoggedUser()
    }

    render(){
        return(
            <>
                {this.state.error ?
                <div className="content-container">
                    <div>
                        {this.state.error && <p className="error-text" >{this.state.error}</p>}
                    </div>
                </div>
                :
                <div className="content-container">
                    
                    {this.context.loggedUser.firstname && 
                    <h1 className="banner-text header-one">
                        Welcome back,{' '}
                        <Link 
                            className="banner-text" 
                            to={`/profile/${this.context.loggedUser.user_id}`}>
                                {this.context.loggedUser.firstname}
                        </Link>
                    </h1>}
                
                    <div className="pic-wrap">
                        <img className='pic' src={this.context.loggedUser.image} alt="profile pic" />     
                    </div>
                        
                    <div className="convo-wrap">

                        <div className="button-wrap">
                            <Link to="/search">
                                <button className="rounded-button">Search Listings Now!</button>
                            </Link>
                        </div>
                    
                        {this.context.loggedUserMatches ?
                        <div className="active-convos">
                                <div className="convo-banner">
                                    <h2 className="banner-text home-banner">Your Active Convos</h2>
                                    <p className="banner-text-description">See who's looking to make a move</p>
                                </div>
                                    <ul className="convo-ul"> 
                                        {this.context.loggedUserMatches.map((match, index) => 
                                            (match.user1_id === this.context.loggedUser.user_id) 
                                            ?   <li className="convo-li" key={index} >
                                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                                        {match.firstname_2 +' '+ match.lastname_2}
                                                    </Link>
                                                </li>
                                            :   <li className="convo-li" key={index} >
                                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                                        {match.firstname_1 +' '+ match.lastname_1}
                                                    </Link>
                                                </li>
                                        )}
                                </ul>
                            </div>
                        :   
                        <div className="active-convos"> 
                            <div className="convo-banner">
                                <h2 className="banner-text home-banner">No Active Conversations</h2>
                                <p className="banner-text-description">Search for somewhere new to start a conversation!</p>
                            </div>
                        </div>                
                        }
                    </div>
                </div>
                }
            </>
        )
    }
}