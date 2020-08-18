import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import TennitContext from '../../../TennitContext'
import {Redirect} from 'react-router-dom'

/* 
The results page renders all its data based on the request made and the object returned from the SearchPage. It has conditions to render
different information based empty search results, or a success search.
*/

class ResultsPage extends Component { 
    static contextType = TennitContext
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){

        return ( 
            <div>
                {/* if theres an error regarding the search results for whatever reason, reroute to 404 to keep experience presentable */}
                {this.state.error &&
                <Redirect to='/404'/>
                }
                <ul>
                    <h1 className="result-header">Results: </h1>
                    <div className="result-wrapper">
                        <button className="text-shadow back-button-results" onClick={()=>this.props.history.goBack()}>go back</button>
                        {/* creates a list of matching search results, or a message saying lack of results. 
                        I didn't filter out matched users on purpose to keep list looking populated while seeded fake user count is low */}
                        {this.context.searchQuery.length > 0  
                            ?   this.context.searchQuery.map((user, index)=>
                                <div className="content-container slim-padding">
                                    <li key={index} className="results-container">
                                        <div className="pic-wrap">
                                            <img className="pic" src={user.image} alt="users profile pic" ></img>
                                        </div>   
                                        <div className="container-wrap">
                                            <Link to={`/profile/${user.user_id}`}> <h1 className="result-name">{user.firstname + ' ' + user.lastname}</h1></Link>
                                            <h2 className="result-rent">${user.rent} per Month</h2>
                                            <p className="result-info">{user.neighborhood}, {user.city}</p>
                                        </div>
                                    </li> 
                                </div>
                                )
                            :   <div className="content-container "> 
                                    <div className="results-container">
                                        <h2 className="result-rent"> Sorry </h2>
                                        <p className="result-info">No matching results, try again?</p> 
                                    </div>
                                </div>
                        }
                    </div>
                </ul>
                <div className="button-wrap result-bottom">
                    <Link to="/search"><button href="#" className="rounded-button double-size">Search Again</button></Link>
                </div>
            </div>
        )
    }
}

export default ResultsPage