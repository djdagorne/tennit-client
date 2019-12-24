import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CreateAccount.css';

class CreateAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
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
            <div className="popup sign-up">
                <div className="popup_inner">
                    <h3>Sign Up</h3>
                    <form id="sign-up">

                    <div className="form-section">
                        <label htmlFor="email">Your email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="smithy@smithmail.com" 
                            /* required */
                        /> 
                    </div>

                    <div className="form-section">
                        <label htmlFor="password">Your password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="*******" 
                            /* required */
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="first-name">First Name</label>
                        <input 
                            type="text" 
                            name="first-name" 
                            placeholder="Smithy" 
                            /* required */
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="last-name">Last Name</label>
                        <input 
                            type="text" 
                            name="last-name" 
                            placeholder="Smitherson" 
                            /* required */
                        />
                    </div>

                    <div className="form-section-dropdown">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" 
                        /* required */>
                            <option value="none">please pick one</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">prefer not to say</option>
                        </select>
                    </div>

                    <div className="form-section-dropdown">
                        <label htmlFor="looking-for-gender">Looking for</label>
                        <select name="looking-for-gender" 
                        /* required */>
                            <option value="none">please pick one</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">either</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="555-555-5555" 
                            /* required */
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="age">Age</label>
                        <input 
                            type="text" 
                            name="age" 
                            placeholder="18" 
                            min="18" 
                            /* required */
                        />
                    </div>

                    <div className="search-segnment-dropdown">
                        <label htmlFor="country">country:</label>
                        <select name="country" /* required */>
                            <option value="none">please pick one</option>
                            <option>Canada</option>
                            <option>United States of America</option>
                        </select>
                    </div>

                    <div className="form-section">
                        <label htmlFor="provence">Provence or State</label>
                        <input 
                            type="text" 
                            name="provence" 
                            placeholder="Enter provence/state" 
                            /* required */
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="Enter city name" 
                            /* required */
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="image">Display your apartment image, link here</label>
                        <input 
                                type="url" 
                                name="image" 
                                placeholder="https://imagehost.com/image.jpg" 
                                /* required */
                            />
                    </div>

                    <div className="form-section">
                        <label htmlFor="user-details">Details</label>
                        <textarea 
                            rows="5" 
                            name="user-details" 
                            placeholder="Tell us about yourself! What is the first thing you want potential partners to know?" 
                            /* required */
                        />
                    </div>    

                    <div className="listing-section">
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
                            <div className="form-section">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="123 Street Road"
                                />
                            </div>

                            <div className="form-section">
                                <label htmlFor="neighborhood">Neighborhood (optional)</label>
                                <input 
                                    type="text" 
                                    name="neighborhood" 
                                    placeholder="eg financial district"
                                />
                            </div>

                            <div className="form-section">
                                <label htmlFor="rent">Monthly rent cost (per person)</label>
                                <input 
                                    type="text" 
                                    name="rent" 
                                    placeholder="750"
                                />
                            </div>

                            <div className="form-section">
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

                    <Link className="cancel button" to="/" onClick={this.props.closePopup}><button className="button">Cancel</button></Link>
                    <Link type="submit" to="/home" onClick={this.props.toggleLogIn}><button className="button">Submit</button></Link>

                </form>
                </div>
            </div>
        )
    }
}

export default CreateAccount;