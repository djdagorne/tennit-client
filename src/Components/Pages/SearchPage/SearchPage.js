import React, {Component} from 'react'
import TennitContext from '../../../TennitContext'
import './SearchPage.css'
import TennitApiService from '../../../Services/tennit-api-service'

/* 
The SearchPage component gives the user a form to enter in search queries, and requests listings from the API and returns an object
with all the matching results. The function then filters out existing matches and users with incompatible gender preferences.
It assigns the resulting object to context and pushes the user to the results page to render that information.
*/

class SearchPage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props)
        this.state={
            searchCity: '',
            searchProvince: '',
            searchRent: '',
        }
    }

    componentDidMount(){
        this.context.getLoggedUser();
    }

    handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
    }
    
    handleSearch = (e) => {
        e.preventDefault();
        const {searchCity, searchProvince, searchRent} = this.state;
        const params = [];
        if (searchCity) {
            params.push(`city=${searchCity}`);
        }
        if (searchProvince) {
            params.push(`province=${searchProvince}`);
        }
        if (searchRent) {
            params.push(`rent=${searchRent}`);
        }
        const query = params.join('&');

        TennitApiService.searchListings(query)
            .then(res=>{
                const loggedPref = res.filter(listing => listing.usergender === this.context.loggedUser.prefgender || this.context.loggedUser.prefgender === 'other');
                const loggedGender = loggedPref.filter(listing => listing.prefgender === this.context.loggedUser.usergender || listing.prefgender === 'other');
                const filterSelf = loggedGender.filter(listing => listing.user_id !== this.context.loggedUser.user_id);
                this.context.searchQuery = filterSelf;
            })
            .then(()=>
                this.props.history.push(`/results`)
            )
            .catch(err=>{
                console.error(err.error.message);
                this.setState({
                    error: err.error.message
                });
            })
    }
    
    render(){
        return (
            <div className="content-container">
                
                <h1 className="banner-text header-one">Search</h1>

                <form 
                    className="search "
                    onSubmit={this.handleSearch}
                    >
                    <h2 >Find listings in...</h2>

                    <div className="search-segment">
                        <label htmlFor="province">province/state:</label>
                        <input 
                            type="text" 
                            name="searchProvince" 
                            onChange={this.handleInputChange}
                            placeholder="eg Ontario"/>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="city">city:</label>
                        <input 
                            type="text" 
                            name="searchCity" 
                            onChange={this.handleInputChange}
                            placeholder="eg Toronto"/>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="price">With monthly rent as high as:</label>
                        <input 
                            type="text" 
                            name="searchRent" 
                            onChange={this.handleInputChange}
                            placeholder="eg 750" required/>
                    </div>
                    
                    <div className="button-wrap">
                            <button type="submit" className="rounded-button">SEARCH</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchPage