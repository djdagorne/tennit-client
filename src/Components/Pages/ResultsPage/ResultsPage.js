import React from 'react';
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import STORE from '../../../STORE'

class ResultsPage extends React.Component {
    render(){
        const {testUsers, testImages} = STORE.makeThingsFixtures()

        return( 
            <div>
                <ul>
                    <h1 className="result-header">Results:</h1>
                    {testUsers.map((user, index)=>
                        <li key={index} className="content-container results-container">
                            <div className="pic-wrap">
                                <img className="pic" src={testImages[index].image} alt={testImages[index].id}></img>
                            </div>                            
                            <h1 className="result-name">{user.firstName + ' ' + user.lastName}</h1>
                            <h2 className="result-rent">${user.rent} per Month</h2>
                            <p className="result-info">{user.neighborhood}, {user.location.city}</p>
                        </li>
                    )}
                </ul>
                <div className="button-wrap result-bottom">
                    <Link to="/search"><button href="#" className="rounded-button double-size">Search Again</button></Link>
                </div>
            </div>
        )
    }
}

export default ResultsPage;