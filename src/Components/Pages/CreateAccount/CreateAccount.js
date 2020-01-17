import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CreateAccount.css';
import TennitContext from '../../../TennitContext';

class CreateAccount extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            listingChecked: false,
        };
    };

    toggleListingSection(){
        this.setState({
            listingChecked: !this.state.listingChecked
        });
    }


    render(){
        return(
            <div className="popup">
                <div className="popup-inner">                    
                <button 
                    className="close-popup" 
                    onClick={e=>this.context.togglePopup('create')}>
                        X
                </button>

                    <h3>Sign Up</h3> 
                    <form id="sign-up" >

                    <div className="form-item">
                        <label htmlFor="email">Your email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="smithy@smithmail.com" 
                            /* required */
                        /> 
                    </div>

                    <div className="form-item">
                        <label htmlFor="password">Your password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="*******" 
                            /* required */
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="first-name">First Name</label>
                        <input 
                            type="text" 
                            name="first-name" 
                            placeholder="Smithy" 
                            /* required */
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="last-name">Last Name</label>
                        <input 
                            type="text" 
                            name="last-name" 
                            placeholder="Smitherson" 
                            /* required */
                        />
                    </div>

                    <div className="form-item-dropdown">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" 
                        /* required */>
                            <option value="none">please pick one</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">prefer not to say</option>
                        </select>
                    </div>

                    <div className="form-item-dropdown">
                        <label htmlFor="seeking-gender">Looking for</label>
                        <select name="seeking-gender" 
                        /* required */>
                            <option value="none">please pick one</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">either</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="age">Age</label>
                        <input 
                            type="text" 
                            name="age" 
                            placeholder="18" 
                            min="18" 
                            /* required */
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="province">Province or State</label>
                        <input 
                            type="text" 
                            name="province" 
                            placeholder="Enter province/state" 
                            /* required */
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="Enter city name" 
                            /* required */
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="image">Apartment image (link here)</label>
                        <input 
                                type="url" 
                                name="image" 
                                placeholder="https://imagehost.com/image.jpg" 
                                /* required */
                            />
                    </div>

                    <div className="form-item">
                        <label htmlFor="user-details">Details</label>
                        <textarea 
                            rows="5" 
                            name="user-details" 
                            placeholder="Tell us about yourself! What is the first thing you want potential partners to know?" 
                            /* required */
                        />
                    </div>    

                    <div className="checkbox-wrap">
                        <label className="listing-section" htmlFor="listing-boolean">List your place?</label>
                        <input 
                            className="listing-section"
                            type="checkbox" 
                            name="listing-boolean" 
                            onClick={()=> this.toggleListingSection(this.state.listingChecked)}
                        />
                    </div>

                    {this.state.listingChecked ? 
                        <div className="listing-details">
                            <div className="form-item">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="123 Street Road"
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="neighborhood">Neighborhood (optional)</label>
                                <input 
                                    type="text" 
                                    name="neighborhood" 
                                    placeholder="eg financial district"
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="rent">Monthly rent cost (per person)</label>
                                <input 
                                    type="text" 
                                    name="rent" 
                                    placeholder="750"
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="home-details">Details</label>
                                <textarea 
                                    rows="5" 
                                    name="home-details" 
                                    placeholder="Got any ground rules? Pets? Feng Shui? Start the convo here!"
                                />
                            </div>  
                        </div> 
                        : null
                    }
                    <div className="button-wrap">
                        <Link  to="/home" >
                            <button className="rounded-button" type="submit" onClick={e=>this.context.togglePopup('create')}>Submit</button>
                        </Link> 
                    </div>
                    

                </form>
                </div>
            </div>
        )
    }
}

export default CreateAccount;