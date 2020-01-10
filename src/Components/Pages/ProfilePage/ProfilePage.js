import React, {Component} from 'react';
import './ProfilePage.css';
import STORE from '../../../STORE'

const {testUsers, testImages} = STORE.makeThingsFixtures()
class ProfilePage extends Component {
    constructor(props){
    super(props);
    this.state = {
    }
}
    render(){
        const {user_id} = this.props.match.params;
        const user_dp = testImages.filter(image=> image.user_id.toString() === user_id.toString()).splice(0,1)
        const user_object = testUsers.find(user => user.id.toString() === user_id.toString())
        return(
            <div className="content-container">
                <h1 className="banner-text">{user_object.firstName}'s place at {user_object.neighborhood}, {user_object.location.city}</h1>
                {user_object.listing ?
                    <h2 className="rent-text">${user_object.rent} per month</h2> :
                    null
                }
                <div className="pic-wrap">
                    <img className="pic" src={user_dp[0].image} alt="test" />        
                </div>
                
                <div className="button-wrap">
                    <button to="/home" className="rounded-button" >Pass</button>
                    <button to="/home" className="rounded-button" onClick={e=>console.log('on click create new match, send to convo URL')}>Tenn!</button>
                </div>
                <div className="about-blurb">
                    <h2 className="banner-text">About {user_object.firstName}</h2>
                    <p>{user_object.firstName}, {user_object.lastName}, {user_object.age} years old</p>
                    {user_object.listing ?
                        <p> looking for someone to share their place with.</p> :
                        <p> looking for somewhere new. </p>
                    }
                </div>
                <div className="user-blurb">
                    <span> {user_object.blurb} </span>
                </div>
            </div>
        )
    }
}

export default ProfilePage;