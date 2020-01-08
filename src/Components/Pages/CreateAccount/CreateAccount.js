import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CreateAccount.css';

class CreateAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser_id: this.props.loggedUser_id,
            loggedIn: this.props.loggedIn,
            listingChecked: false,
            toggleCreatePopup: this.props.toggleCreatePopup,
            toggleLogIn: this.props.toggleLogIn
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
                    <h3>Sign Up</h3> 
                    <button onClick={e=>console.log(this.props)}>log</button>
                    <form id="sign-up" >
                    <button className="close-form" onClick={this.props.toggleCreatePopup}>Cancel</button>

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
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="555-555-5555" 
                            /* required */
                        />
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
                        <label htmlFor="provence">Provence or State</label>
                        <input 
                            type="text" 
                            name="provence" 
                            placeholder="Enter provence/state" 
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
                    <div className="buttons">
                        <button  onClick={this.props.toggleCreatePopup}>Cancel</button>
                        <Link  to="/home" >
                            <button className="buttons" type="submit" onClick={this.props.toggleCreatePopup}>Submit</button>
                        </Link> 
                    </div>
                    

                </form>
                </div>
            </div>
        )
    }
}

export default CreateAccount;