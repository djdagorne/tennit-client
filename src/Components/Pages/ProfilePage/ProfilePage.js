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
                <div class="display-pic-sec">
                    <div class="pic">user display pic, if multiple pics create a carousel</div>        
                </div>
                <div class="buttons-area">
                    <button type="button">Pass</button><button type="button">Tenn!</button>
                </div>
                <div class="address-blurb">
                    <span>I'm [first name] [last name], [age] years old, living around [neighborhood], [city]</span>
                    <span>(if listing is false)</span>
                    <span>...and I'm looking to find somewhere new</span>
                </div>
                <div class="listing-details">
                    <span>if listing is checked as true...</span>
                    <span><i>Rent:</i> Asking [rent] per month</span> 
                </div>      
                <div class="seeking-blurb">
                    <span> user created detail blurb goes here </span>
                </div>
            </>
        )
    }
}

export default ProfilePage;