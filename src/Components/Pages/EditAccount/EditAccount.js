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
            emailBox: null,
            passwordBox: null,
            provinceBox: null,
            cityBox: null,
            imageBox: null,
            userblurbBox: null,
            listingBox: null,
            neighborhoodBox: null,
            rentBox: null,
            blurbBox: null,
        };
    };

    toggleListingSection = () => {
        this.setState({
            listingBox: !this.state.listingBox,
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
            province: this.state.provinceBox,
            city: this.state.cityBox,
            listing: this.state.listingBox,
            userblurb: this.state.userblurbBox,
            rent: this.state.rentBox,
            neighborhood: this.state.neighborhoodBox,
            blurb: this.state.blurbBox
        }
        const updatedImage = {
            user_id: TokenService.parseJwt(TokenService.getAuthToken()).id,
            image: this.state.imageBox
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
                            <label htmlFor="provinceBox">Province</label>
                            <input 
                                type="text" 
                                name="provinceBox" 
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="cityBox">City</label>
                            <input 
                                type="text" 
                                name="cityBox" 
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="imageBox">Apartment Image</label>
                            <input 
                                    type="url" 
                                    name="imageBox" 
                                    onChange={this.handleInputChange}
                                    placeholder="as hyperlink" 
                                />
                        </div>

                        <div className="form-item">
                            <label htmlFor="userblurbBox">Details</label>
                            <textarea 
                                rows="5" 
                                name="userblurbBox" 
                                onChange={this.handleInputChange}
                                placeholder="Tell us about yourself! What is the first thing you want potential partners to know?" 
                                /* required */
                            />
                        </div>    

                        <div className="checkbox-wrap">
                            <label className="listing-section" htmlFor="listingBox">List your place?</label>
                            <input 
                                className="listing-section"
                                type="checkbox" 
                                name="listingBox" 
                                onClick={this.toggleListingSection}
                            />
                        </div>

                        {this.state.listing ? 
                            <div className="listing-details">

                                <div className="form-item">
                                    <label htmlFor="neighborhoodBox">Neighborhood (optional)</label>
                                    <input 
                                        type="text" 
                                        name="neighborhoodBox" 
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="rentBox">Monthly Rent per Person</label>
                                    <input 
                                        type="text" 
                                        name="rentBox" 
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="blurb">Details</label>
                                    <textarea 
                                        rows="5" 
                                        name="blurbBox" 
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