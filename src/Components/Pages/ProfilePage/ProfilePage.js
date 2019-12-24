import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

class ProfilePage extends Component {
    render(){
        return(
            <>
                <div>
                    <h1>[user neighborhood], [user city]</h1>
                </div>
                <div className="display-pic-sec">
                    <div className="pic">user display pic, if multiple pics create a carousel</div>        
                </div>
                <h2>[RENT] per month</h2>
                <div className="buttons-area">
                    <button to="/home" type="button">Pass</button><button to="/home" type="button">Tenn!</button>
                </div>
                <div className="address-blurb">
                    <span>I'm [first name] [last name], [age] years old, living around [neighborhood], [city]</span>
                    <span>(if listing is false)</span>
                    <span>...and I'm looking to find somewhere new</span>
                </div>
                <div className="listing-details">
                    <span>if listing is checked as true...</span>
                    <span><i>Rent:</i> Asking [rent] per month</span> 
                </div>      
                <div className="seeking-blurb">
                    <span> user created detail blurb goes here </span>
                </div>
            </>
        )
    }
}

export default ProfilePage;