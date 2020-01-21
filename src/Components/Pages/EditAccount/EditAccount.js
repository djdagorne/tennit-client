import React, {Component} from 'react';
import './EditAccount.css';
import TennitContext from '../../../TennitContext';

export default class EditAccount extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            loggedUser: this.props.loggedUser,
            province: '',
            city: '',
            listing: false,
            //find a way to implement image links into form
            blurb: '',
            userblurb: '',
            neighborhood: '',
        };
    };

    toggleListingSection = () => {
        this.setState({
            listing: !this.state.listing,
        });
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        this.context.togglePopup('edit')
        if(this.context.email === this.context.loggedUser.email && 
            this.context.password === this.context.loggedUser.password){
                const newUser = {...this.context.loggedUser, ...this.state}
                this.context.loggedUser = newUser;
            }
    }


    render(){
        return(
            <div className="popup">
                <div className="popup-inner">
                    <button 
                        className="close-popup" 
                        onClick={e=>this.context.togglePopup('edit')}>
                            X
                    </button>
                    <button 
                        className="close-popup" 
                        onClick={e=>console.log(this.context.loggedUser)}>
                            loggeduser context
                    </button>

                    <h3>Edit Account</h3> 
                    <form 
                        id="edit-account" 
                        onSubmit={this.handleEditSubmit}>
                        
                        <div className="form-item">
                            <label htmlFor="email">Your email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="smithy@smithmail.com" 
                                onChange={this.context.handleInputChange}
                                required
                            /> 
                        </div>

                        <div className="form-item">
                            <label htmlFor="password">Your password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="*******" 
                                onChange={this.context.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="province">Province or State</label>
                            <input 
                                type="text" 
                                name="province" 
                                onChange={this.context.handleInputChange}
                                placeholder={this.context.loggedUser.province} 
                                /* required */
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                name="city" 
                                onChange={this.context.handleInputChange}
                                placeholder={this.context.loggedUser.city} 
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
                            <label htmlFor="userblurb">Details</label>
                            <textarea 
                                rows="5" 
                                name="userblurb" 
                                onChange={this.context.handleInputChange}
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
                                onClick={this.toggleListingSection}
                            />
                        </div>

                        {this.state.listing ? 
                            <div className="listing-details">

                                <div className="form-item">
                                    <label htmlFor="neighborhood">Neighborhood (optional)</label>
                                    <input 
                                        type="text" 
                                        name="neighborhood" 
                                        onChange={this.context.handleInputChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="rent">Monthly rent cost (per person)</label>
                                    <input 
                                        type="text" 
                                        name="rent" 
                                        onChange={this.context.handleInputChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="home-details">Details</label>
                                    <textarea 
                                        rows="5" 
                                        name="blurb" 
                                        onChange={this.context.handleInputChange}
                                        placeholder="Got any ground rules? Pets? Feng Shui? Start the convo here!"
                                    />
                                </div>  
                            </div> 
                            : null
                        }
                        <div className="button-wrap">
                                <button className="rounded-button" type="submit">Submit</button>
                        </div>
                        

                    </form>
                </div>
            </div>
        )
    }
}