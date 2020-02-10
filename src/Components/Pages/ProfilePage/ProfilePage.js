import React, {Component} from 'react';
import './ProfilePage.css';
import config from '../../../config'
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext'

class ProfilePage extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            listingData: {},
            userImage: {}
        }
    }
    componentDidMount(){
        return fetch(`${config.API_ENDPOINT}/listings/${this.props.match.params.user_id}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(res=>{
                this.setState({
                    listingData: res
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    generateNewMatch = (e) => {
        e.preventDefault();
        const matchData = {
            user1_id: this.context.loggedUser.user_id,
            user2_id: this.state.listingData.user_id
        }
        return fetch(`${config.API_ENDPOINT}/matches/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                matchData
            )
        })
        .then(res=>
            (!res.ok)
            ? res.json().then(e=> Promise.reject(e))    
            : res.json()
        )
        .then(match=>{
            const newMatch = {
                firstname_1: this.context.loggedUser.firstname,
                lastname_1: this.context.loggedUser.lastname,
                firstname_2: this.state.listingData.firstname,
                lastname_2: this.state.listingData.lastname,
                ...match
            }
            this.context.loggedUserMatches.push(newMatch)
            this.props.history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="content-container">
                {this.state.listingData.listing ?
                    <h2 className="rent-text">${this.state.listingData.rent} per month</h2> :
                    null
                }
                {this.state.listingData.neighborhood 
                ? <h1 className="banner-text">{this.state.listingData.firstname}'s place in {this.state.listingData.neighborhood}, {this.state.listingData.city} </h1>
                : <h1 className="banner-text">{this.state.listingData.firstname}'s place in {this.state.listingData.city}, {this.state.listingData.province} </h1>
                }
                
                
                
                <div className="pic-wrap">
                    <img className="pic" src={this.state.listingData.image} alt="test" />        
                </div>
                
                <div className="button-wrap">
                    <button className="rounded-button" onClick={this.generateNewMatch}>Tenn!</button>
                </div>
                <div className="about-blurb">
                    <h2 className="banner-text">{this.state.listingData.firstname}, {this.state.listingData.lastname}, {this.state.listingData.age} years old</h2>
                    {this.state.listingData.listing ?
                        <div className="user-blurb">
                            <p> {this.state.listingData.userblurb} </p>
                            <p> {this.state.listingData.blurb} </p> 
                        </div>  :
                        <p> {this.state.listingData.userblurb} </p>
                    }
                </div>
                
                    
            </div>
        )
    }
}

export default ProfilePage;