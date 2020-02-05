import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import TennitContext from '../../../TennitContext'
import config from '../../../config'

export default class HomePage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidCatch(){
    }


    render(){
        return(
            <div className="content-container">
                <h1 className="banner-text">
                    Welcome back,{' '}
                    <Link 
                        className="banner-text" 
                        to={`/profile/${this.context.loggedUser.user_id}`}>
                            {this.context.loggedUser.firstname}
                    </Link>
                </h1>

                <div className="pic-wrap">
                    <img className='pic' src={this.context.loggedUser.image} alt="profile pic" />     
                </div>

                <div className="button-wrap">
                    <Link to="/search">
                        <button className="rounded-button">SEARCH</button>
                    </Link>
                </div>
                    
                <div className="active-convos">
                    <div className="convo-banner">
                        <h2 className="banner-text home-banner">Your Active Convos</h2>
                        <p className="banner-text-description">See who's looking to make a move</p>
                    </div>
                        <ul className="convo-ul"> {/* TODO ask ali how to approach this. how would i join tables in my server? */}
                            {this.context.loggedUserMatches.map((match, index) => 
                                (match.user1_id === this.context.loggedUserId) 
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
            </div>
        )
    }
}