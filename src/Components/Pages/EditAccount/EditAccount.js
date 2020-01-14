import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EditAccount.css';
import TennitContext from '../../../TennitContext';

class EditAccount extends Component {
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
                    <h3>Sign Up</h3> 
                    <form id="edit-account" >
                    <button className="close-form" onClick={this.context.toggleEditPopup}>Cancel</button>

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
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="555-555-5555" 
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
                        <button  onClick={this.context.toggleEditPopup}>Cancel</button>
                        <Link  to="/home" >
                            <button className="buttons" type="submit" onClick={this.context.toggleEditPopup}>Submit</button>
                        </Link> 
                    </div>
                    

                </form>
                </div>
            </div>
        )
    }
}

export default EditAccount;