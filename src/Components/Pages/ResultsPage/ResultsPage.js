import React from 'react';
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import STORE from '../../../STORE'

class ResultsPage extends React.Component {
    render(){
        const {testUsers, testImages} = STORE.makeThingsFixtures()

        return( 
            <>
                <ul>
                    <div>
                    <h1>Results:</h1>
                    </div>

                    {testUsers.map((user, index)=>
                    <li key={index}>
                        <img className="pic" src={testImages[index].image} alt={testImages[index].id}></img>
                        <br/>
                        <span>${user.rent} per Month</span>
                        <br/>
                        <span>{user.neighborhood}, {user.location.city}</span>
                    </li>)}
                    {/*
                    
                    <li>
                    <div className="display-pic-sec">
                        <div className="pic">user display pic, links to profile</div>
                        <span>[neighborhood], [city], [rent price]</span>        
                    </div>
                    </li> 
                    
                    */}
                </ul>
                <div>
                    <Link to="/search"><button href="#" className="search-now">Search Again</button></Link>
                </div>
            </>
        )
    }
}

export default ResultsPage;