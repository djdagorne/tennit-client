import React, {Component} from 'react';
import './ProfilePage.css';
import config from '../../../config'
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service';

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
        TennitApiService.getUser(this.props.match.params.user_id)
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
            user1_id: TokenService.parseJwt(TokenService.getAuthToken()).id,
            user2_id: this.state.listingData.user_id
        }
        TennitApiService.postNewMatch(matchData)
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