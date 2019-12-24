import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './SearchPage.css';

class SearchPage extends Component {
    render(){
        return(
            <>
                
                <h1>Search</h1>

                <form className="search">
                    <span>Find listings in...</span>

                    <div className="search-segnment dropdown">
                        <label for="country">country:</label>
                        <select name="country" required>
                        <option value="none">please pick one</option>
                        <option>Canada</option>
                        <option>United States of America</option>
                        </select>
                    </div>

                    <div className="search-segment">
                        <label for="provence">provence/state:</label>
                        <input type="text" name="provence" placeholder="eg Ontario" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label for="city">city:</label>
                        <input type="text" name="city" placeholder="eg Toronto" /* required *//>
                    </div>

                    <div className="search-segment">
                        <label for="price">With monthly rent as high as:</label>
                        <input type="number" name="price" placeholder="eg 750"/>
                    </div>
                    
                    <button to="/results" type="submit">Search Now</button> {/* TODO make search button a component to regulate styling */}
                </form>
            </>
        )
    }
}

export default SearchPage;