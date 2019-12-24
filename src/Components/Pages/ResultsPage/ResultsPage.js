import React from 'react';
import {Link} from 'react-router-dom'
import './ResultsPage.css'

class ResultsPage extends React.Component {
    render(){
        return( 
            <>
                <ul>
                    <div>
                    <h1>Results:</h1>
                    </div>
                    <li>
                    <div className="display-pic-sec">
                        <div className="pic">user display pic, links to profile</div>
                        <span>[neighborhood], [city], [rent price]</span>        
                    </div>
                    </li>
                    <li>
                    <div className="display-pic-sec">
                        <div className="pic">user display pic, links to profile</div>
                        <span>[neighborhood], [city], [rent price]</span>        
                    </div>
                    </li>
                    <li>
                    <div className="display-pic-sec">
                        <div className="pic">user display pic, links to profile</div>
                        <span>[neighborhood], [city], [rent price]</span>        
                    </div>
                    </li>
                </ul>
                <div>
                    <button href="#" className="search-now">Search Again</button>
                </div>
            </>
        )
    }
}

export default ResultsPage;