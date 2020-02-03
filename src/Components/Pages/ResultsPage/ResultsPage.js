import React from 'react'
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import TennitContext from '../../../TennitContext'

class ResultsPage extends React.Component { //TODO make search results into a popup? 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidUpdate = () => {    
        // console.log(this.context.searchQuery)
        // this.forceUpdate()
    }
    render(){

        return( 
            <div>
                <ul>
                    <h1 className="result-header">Results:</h1>
                    {this.context.searchQuery.length > 0 ? 
                        this.context.searchQuery.map((user, index)=>
                        //TODO add links to dynamic list objects
                        <li key={index} className="content-container results-container">
                            <div className="pic-wrap">
                                <img className="pic" src={user.image} alt="users profile pic" ></img>
                            </div>                            
                            <h1 className="result-name">{user.firstname + ' ' + user.lastname}</h1>
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