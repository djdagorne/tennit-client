import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import TennitContext from '../../../TennitContext'
import './SearchPage.css';

class SearchPage extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state={
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        
    }
    // handleInputChange = (event) => {
	// 	const target = event.target;
	// 	const value = target.value;
	// 	const name = target.name;
	
	// 	this.setState({
	// 		  [name]: value
	// 	});
	// }
    render(){
        return(
            <div className="content-container">
                
                <h1 className="banner-text">Search</h1>

                <form 
                    className="search"
                    >
                <h2 >Find listings in...</h2>

                    <div className="search-segment">
                        <label htmlFor="provence">provence/state:</label>
                        <input 
                            type="text" 
                            name="searchProvence" 
                            onChange={this.context.handleInputChange}
                            placeholder="eg Ontario" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="city">city:</label>
                        <input 
                            type="text" 
                            name="searchCity" 
                            onChange={this.context.handleInputChange}
                            placeholder="eg Toronto" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="price">With monthly rent as high as:</label>
                        <input 
                            type="text" 
                            name="searchRent" 
                            onChange={this.context.handleInputChange}
                            placeholder="eg 750"/>
                    </div>
                    
                    <div className="button-wrap">
                        <Link to="/results">
                            <button type="submit" className="rounded-button">SEARCH</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchPage;