import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import STORE from '../../../STORE'
/* import Carousel from '../../../Utils/Carousel' */

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUserId: this.props.loggedUserId,
            loggedUser_id: this.props.loggedUser_id || 1,
        }
	}
    render(){
        const {testUsers, testImages, testMatches} = STORE.makeThingsFixtures()

        const userMatchesTotal = testMatches.filter(match => match.user1_id === testUsers[this.state.loggedUser_id-1].id)
        
        const userMatches = userMatchesTotal.filter(match => match.user1_bool === true || match.user2_bool === true) 
        return(
            <>
                <span>Welcome back, <h1>{testUsers[this.state.loggedUser_id-1].firstName}!</h1></span>






                {/* <button onClick={e => console.log(userMatchesTotal)}>testy</button> */}
                <div className="home-div display-pic-sec">
                    <img className='pic' src={testImages[0].image} alt="test" />     
                 
                </div>
                {/* <Carousel loggedUser_id={this.state.loggedUserId}/> */}






                <div>
                    <Link to="/search"><button className="search-now">Search Now!</button></Link>
                </div>
                      <Link to="/profile/1">profile preview</Link>  
                <div className="home-div active convos">
                    <h2>Convos</h2>
                    <p>conversation table in db is searched, rows marked with 'validity' and user comments from logged in user_id are listed here as ordered list of links.</p>
                    <ul>
                        {userMatches.map((match, index)=>
                            <li key={index} ><Link to={`/convo/${match.user2_id}`}>{testUsers[match.id].firstName +' '+ testUsers[match.id].lastName  }</Link></li>
                        )}
                    </ul>
                </div>
            </>
        )
    }
}

export default HomePage;