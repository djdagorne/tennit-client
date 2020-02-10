import React from 'react'
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import TennitContext from '../../../TennitContext'

class ResultsPage extends React.Component { 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){

        return( 
            <div>
                <ul>
                    <h1 className="result-header">Results:</h1>
                    {this.context.searchQuery.length > 0 ? 
                        this.context.searchQuery.map((user, index)=>
                        <li key={index} className="content-container results-container">
                            <div className="pic-wrap">
                                <img className="pic" src={user.image} alt="users profile pic" ></img>
                            </div>                            
                            <Link to={`/profile/${user.user_id}`}> <h1 className="result-name">{user.firstname + ' ' + user.lastname}</h1></Link>
                            <h2 className="result-rent">${user.rent} per Month</h2>
                            <p className="result-info">{user.neighborhood}, {user.city}</p>
                        </li>
                        ) : 
                        <div className="content-container results-container"> 
                            <h2 className="result-rent"> Sorry </h2>
                            <p className="result-info">No search results, try again?</p> 
                        </div>
                    }
                </ul>
                <div className="button-wrap result-bottom">
                    <Link to="/search"><button href="#" className="rounded-button double-size">Search Again</button></Link>
                </div>
            </div>
        )
    }
}

export default ResultsPage;