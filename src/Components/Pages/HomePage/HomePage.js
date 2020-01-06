import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import STORE from '../../../STORE'
// import TokenService from '../../../Services/TokenService';
//import {Button} from '../../../Utils/Utils.js'
/* import Carousel from '../../../Utils/Carousel' */

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser_id: this.props.loggedUser_id || 1,
        }
	}
    render(){
        const {testUsers, testImages, testMatches} = STORE.makeThingsFixtures()
        
        const userMatches1 = testMatches.filter(match => match.user1_id === this.props.loggedUser_id) 
        const userMatches2 = testMatches.filter(match => match.user2_id === this.props.loggedUser_id)
        
        return(
            <div className="content-container">
                <h1 className="banner-text">
                    Welcome back, 
                    <Link 
                        className="banner-text" 
                        to={`/profile/${this.props.loggedUser_id}`}>
                            {testUsers[this.props.loggedUser_id-1].firstName}
                    </Link>
                </h1>

                <div className="pic-wrap">
                    <img className='pic' src={testImages[0].image} alt="test" />     
                </div>

                <Link to="/search">
                    <button>Search Now!</button>
                </Link>
                    
                <div className="active-convos">
                    <h2 className="banner-text">Your Active Convos</h2>
                    <p className="banner-text-description">See who's looking to make a move</p>
                    <ul className="convo-ul">
                        {userMatches1.map((match, index)=>
                            <li className="convo-li" key={index} >
                                <Link to={`/convo/${match.id}`}>
                                    {testUsers[match.user2_id-1].firstName +' '+ testUsers[match.user2_id-1].lastName}
                                </Link>
                            </li>
                        )}
                        {userMatches2.map((match, index)=>
                            <li className="convo-li" key={index} >
                                <Link to={`/convo/${match.id}`}>
                                    {testUsers[match.user1_id-1].firstName +' '+ testUsers[match.user1_id-1].lastName}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default HomePage;