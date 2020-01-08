import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './SearchPage.css';

class SearchPage extends Component {
    render(){
        return(
            <div className="content-container">
                
                <h1 className="banner-text">Search</h1>

                <form className="search">
                <h2 >Find listings in...</h2>

                    <div className="search-segment">
                        <label htmlFor="provence">provence/state:</label>
                        <input type="text" name="provence" placeholder="eg Ontario" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="city">city:</label>
                        <input type="text" name="city" placeholder="eg Toronto" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label htmlFor="price">With monthly rent as high as:</label>
                        <input type="number" name="price" placeholder="eg 750"/>
                    </div>
                    
                    <Link to="/results" type="submit"><button>Search Now</button></Link> {/* TODO make search button a component to regulate styling */}
                </form>
            </div>
        )
    }
}

export default SearchPage;