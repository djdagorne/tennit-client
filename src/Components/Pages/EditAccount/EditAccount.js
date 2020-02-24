import React, {Component} from 'react';
import './EditAccount.css';
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext';
import TennitApiService from '../../../Services/tennit-api-service';

export default class EditAccount extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            province: null,
            city: null,
            image: null,
            userblurb: null,
            listing: null,
            neighborhood: null,
            rent: null,
            blurb: null,
        };
    };

    toggleListingSection = () => {
        this.setState({
            listing: !this.state.listing,
        });
    }

    handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}

    handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedListing = {
            province: this.state.province,
            city: this.state.city,
            listing: this.state.listing,
            userblurb: this.state.userblurb,
            rent: this.state.rent,
            neighborhood: this.state.neighborhood,
            blurb: this.state.blurb
        }
        const updatedImage = {
            user_id: TokenService.parseJwt(TokenService.getAuthToken()).id,
            image: this.state.image
        }

        for(const [key,value] of Object.entries(updatedListing)){
            if(value === null){
                delete updatedListing[key]
            }
        }
        if(Object.keys(updatedListing).length > 0 || this.state.image !== null){
            TennitApiService.patchListing(updatedListing, TokenService.parseJwt(TokenService.getAuthToken()).id)
                .then(listing=>{
                    this.context.loggedUser = listing
                })
                .then(()=>{
                    TennitApiService.patchImage(updatedImage)
                        .then(res=>{
                            this.context.loggedUser.image = res.image
                            this.context.togglePopup('edit')
                        })
                        .catch(err=>{
                            console.error(err.error.message)
                            this.setState({
                                error: err.error.message
                            })
                        })
                })
                .catch(err=>{
                    console.error(err.error.message)
                    this.setState({
                        error: err.error.message
                    })
                })
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
                    
                    <h3>Edit Account</h3> 
                    <form 
                        id="edit-account" 
                        onSubmit={this.handleEditSubmit}>

                        <div className="form-item">
                            <label htmlFor="province">Province</label>
                            <input 
                                type="text" 
                                name="province" 
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                name="city" 
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="image">Apartment Image</label>
                            <input 
                                    type="url" 
                                    name="image" 
                                    placeholder="as hyperlink" 
                                />
                        </div>

                        <div className="form-item">
                            <label htmlFor="userblurb">Details</label>
                            <textarea 
                                rows="5" 
                                name="userblurb" 
                                onChange={this.handleInputChange}
                                placeholder="Tell us about yourself! What is the first thing you want potential partners to know?" 
                                /* required */
                            />
                        </div>    

                        <div className="checkbox-wrap">
                            <label className="listing-section" htmlFor="listing">List your place?</label>
                            <input 
                                className="listing-section"
                                type="checkbox" 
                                name="listing" 
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
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="rent">Monthly Rent per Person</label>
                                    <input 
                                        type="text" 
                                        name="rent" 
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="home-details">Details</label>
                                    <textarea 
                                        rows="5" 
                                        name="blurb" 
                                        onChange={this.handleInputChange}
                                        placeholder="Got any ground rules? Pets? Feng Shui? Start the convo here!"
                                        required
                                    />
                                </div>  
                            </div> 
                            : null
                        }
                        <div>
                            {this.state.error && <p className="error-text" >Error: {this.state.error}</p>}
                        </div>
                        <div className="button-wrap">
                                <button className="rounded-button" type="submit">Submit</button>
                        </div>
                        

                    </form>
                </div>
            </div>
        )
    }
}