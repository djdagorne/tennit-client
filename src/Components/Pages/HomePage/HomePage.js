import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import STORE from '../../../STORE'
import TennitContext from '../../../TennitContext'

export default class HomePage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
        }
	}
    render(){
        const {testUsers, testImages, testMatches} = STORE.makeThingsFixtures()
        
        const userMatches1 = testMatches.filter(match => match.user1_id === this.context.loggedUser.id) 
        const userMatches2 = testMatches.filter(match => match.user2_id === this.context.loggedUser.id)
        
        return(
            <div className="content-container">
                <h1 className="banner-text">
                    Welcome back,{' '}
                    <Link 
                        className="banner-text" 
                        to={`/profile/${this.context.loggedUser.id}`}>
                            {testUsers[this.context.loggedUser.id-1].firstname}
                    </Link>
                </h1>

                <div className="pic-wrap">
                    <img className='pic' src={testImages[0].image} alt="test" />     
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
                        <ul className="convo-ul">
                            {userMatches1.map((match, index)=>
                                <li className="convo-li" key={index} >
                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                        {testUsers[match.user2_id-1].firstname +' '+ testUsers[match.user2_id-1].lastname}
                                    </Link>
                                </li>
                            )}
                            {userMatches2.map((match, index)=>
                                <li className="convo-li" key={index} >
                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                        {testUsers[match.user1_id-1].firstname +' '+ testUsers[match.user1_id-1].lastname}
                                    </Link>
                                </li>
                            )}
                    </ul>
                </div>
            </div>
        )
    }
}