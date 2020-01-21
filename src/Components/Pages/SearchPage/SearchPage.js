import React, {Component} from 'react';
import TennitContext from '../../../TennitContext'
import './SearchPage.css';

class SearchPage extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state={
            searchCity: '',
            searchProvince: '',
            searchRent: '',
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        const {searchCity, searchProvince, searchRent} = this.state;
        this.context.searchQuery = {searchCity, searchProvince, searchRent}
        this.props.history.push('/results')
    }
    handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}
    render(){
        return(
            <div className="content-container">
                
                <h1 className="banner-text">Search</h1>

                <form 
                    className="search"
                    onSubmit={this.handleSearch}
                    >
                <h2 >Find listings in...</h2>

                    <div className="search-segment">
                        <label htmlFor="province">province/state:</label>
                        <input 
                            type="text" 
                            name="searchProvince" 
                            onChange={this.handleInputChange}
                            placeholder="eg Ontario" required/>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="city">city:</label>
                        <input 
                            type="text" 
                            name="searchCity" 
                            onChange={this.handleInputChange}
                            placeholder="eg Toronto" required/>
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

export default SearchPage;