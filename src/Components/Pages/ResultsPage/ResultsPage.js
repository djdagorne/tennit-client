import React from 'react';
import {Link} from 'react-router-dom'
import './ResultsPage.css'
import TennitContext from '../../../TennitContext'
import STORE from '../../../STORE'

class ResultsPage extends React.Component { //TODO make search results into a popup? 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state={
            searchList: []
        }
    }
    componentDidMount = () => {        
        const filterUser = this.context.testUsers.filter(user => user.id !== this.context.loggedUser.id)
        const filterProv = filterUser.filter(user => user.province.toLowerCase().includes(this.context.searchProvince.toLowerCase()) )
        const filterCity = filterProv.filter(user => user.city.toLowerCase().includes(this.context.searchCity.toLowerCase()))
        const filterRent = filterCity.filter(user => Number(user.rent) <= Number(this.context.searchRent))
        console.log(filterRent)
        this.setState({
            searchList: filterRent
        })
    }
    render(){

        return( 
            <div>
                <ul>
                    <h1 className="result-header">Results:</h1>
                    {this.state.searchList.map((user, index)=>
                        //TODO add links to dynamic list objects
                        <li key={index} className="content-container results-container">
                            <div className="pic-wrap">
                                <img className="pic" src={this.context.testImages[index].image} alt={this.context.testImages[index].id}></img>
                            </div>                            
                            <h1 className="result-name">{user.firstname + ' ' + user.lastname}</h1>
                            <h2 className="result-rent">${user.rent} per Month</h2>
                            <p className="result-info">{user.neighborhood}, {user.city}</p>
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