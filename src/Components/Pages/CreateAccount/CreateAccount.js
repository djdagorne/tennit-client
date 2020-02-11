import React, {Component} from 'react';
import './CreateAccount.css';
import TennitContext from '../../../TennitContext';
import TokenService from '../../../Services/token-service'
import TennitApiService from '../../../Services/tennit-api-service';

class CreateAccount extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            listing: false,
        };
    };

    toggleListingSection = () => {
        this.setState({
            listing: !this.state.listing
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
    
    handleCreateSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        const newListing = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            usergender: this.state.usergender,
            prefgender: this.state.prefgender,
            province: this.state.province,
            city: this.state.city,
            userblurb: this.state.userblurb,
            listing: this.state.listing,
            rent: this.state.rent,
            neighborhood: this.state.neighborhood,
            blurb: this.state.blurb
        }
        const newImage = {
            image: this.state.image
        }

        TennitApiService.postUser(newUser)
            .then(res=>{
                TokenService.saveAuthToken(res.authToken)
                const token = TokenService.parseJwt(res.authToken)
                const listingBody = {
                    ...newListing,
                    user_id: token.id,
                }
                TennitApiService.postListing(listingBody)
                    .then(listing=>{
                        const imageBody = {
                            user_id: listing.user_id,
                            ...newImage
                        }
                        TennitApiService.postImage(imageBody)
                            .then(()=>{
                                this.context.togglePopup('create')
                            })
                    })
            })
            .catch(err=>{
                console.log(err)
            })
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
                    <form 
                        id="create-account" 
                        onSubmit={this.handleCreateSubmit}>

                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="password">password</label>
                            <input 
                                type="password" 
                                name="password" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="firstname">First Name</label>
                            <input 
                                type="text" 
                                name="firstname" 
                                placeholder="Smithy" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="lastname">Last Name</label>
                            <input 
                                type="text" 
                                name="lastname" 
                                placeholder="Smitherson" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="age">Age</label>
                            <input 
                                type="text" 
                                name="age" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item-dropdown">
                            <label htmlFor="usergender">Gender</label>
                            <select
                                onChange={this.handleInputChange} 
                                name="usergender" 
                                required>
                                    <option >please pick one</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                            </select>
                        </div>

                        <div className="form-item-dropdown">
                            <label htmlFor="prefgender">Looking for</label>
                            <select 
                                onChange={this.handleInputChange}
                                name="prefgender" 
                                required>
                                    <option >please pick one</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">either</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label htmlFor="province">Province</label>
                            <input 
                                type="text" 
                                name="province" 
                                required
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                name="city" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="image">Apartment Image</label>
                            <input 
                                    type="url" 
                                    name="image" 
                                    onChange={this.handleInputChange}
                                    placeholder="as hyperlink" 
                                    required
                                />
                        </div>

                        <div className="form-item">
                            <label htmlFor="userblurb">Details</label>
                            <textarea 
                                rows="5" 
                                name="userblurb" 
                                onChange={this.handleInputChange}
                                placeholder="Tell us about yourself! What is the first thing you want potential partners to know?" 
                                required
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
                        <div className="button-wrap">
                                <button className="rounded-button" type="submit">Submit</button>
                        </div>
                        

                    </form>
                </div>
            </div>
        )
    }
}

export default CreateAccount;