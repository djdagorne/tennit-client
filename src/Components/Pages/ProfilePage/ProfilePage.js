import React, {Component} from 'react';
import './ProfilePage.css';
import STORE from '../../../STORE'

class ProfilePage extends Component {
    render(){
        const {testUsers, testImages} = STORE.makeThingsFixtures()

        const {user_id} = this.props.match.params;

        const user_object = testUsers.find(user => user.id.toString() === user_id)
        return(
            <>
                    {/* <button onClick={e => console.log(user_object)}>wouhasd</button> */}
                <div>
                    <h1>{user_object.neighborhood}, {user_object.location.city}</h1>
                </div>
                <div className="display-pic-sec">
                    <img className="pic" src={testImages[0].image} alt="test" />        
                </div>
                {user_object.listing ?
                    <h2>{user_object.rent} per month</h2> :
                    null
                }
                <div className="buttons-area">
                    <button to="/home" type="button">Pass</button><button to="/home" type="button">Tenn!</button>
                </div>
                <div className="address-blurb">
                    <span>I'm {user_object.firstName}, {user_object.lastName}, {user_object.age} years old</span>
                    {user_object.listing ?
                        <span> and I'm looking for someone to share my place with.</span> :
                        <span> and I'm looking for somewhere new. </span>
                    }
                </div>
                <div className="seeking-blurb">
                    <span> {user_object.blurb} </span>
                </div>
            </>
        )
    }
}

export default ProfilePage;