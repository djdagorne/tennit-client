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
            <>
                <div className="home-background"/>
                <div className="home-div">
                    <span>Welcome back, <Link to={`/profile/${this.props.loggedUser_id}`}><b>{testUsers[this.props.loggedUser_id-1].firstName}!</b></Link></span>

                    <div className="display-pic-sec">
                        <img className='pic' src={testImages[0].image} alt="test" />     
                    </div>

                    <Link to="/search"><button>Search Now!</button></Link>
                        
                    <div className="active-convos">
                        <h2>Convos</h2>
                        <p>conversation table in db is searched, rows marked with 'validity' and user comments from logged in user_id are listed here as ordered list of links.</p>
                        <ul>
                            {userMatches1.map((match, index)=>
                                <li key={index} ><Link to={`/convo/${match.id}`}>{testUsers[match.user2_id-1].firstName +' '+ testUsers[match.user2_id-1].lastName}</Link></li>
                            )}
                            {userMatches2.map((match, index)=>
                                <li key={index} ><Link to={`/convo/${match.id}`}>{testUsers[match.user1_id-1].firstName +' '+ testUsers[match.user1_id-1].lastName}</Link></li>
                            )}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default HomePage;