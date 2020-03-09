import React, {Component} from 'react';
import './ProfilePage.css';
import TokenService from '../../../Services/token-service';
import TennitContext from '../../../TennitContext';
import TennitApiService from '../../../Services/tennit-api-service';
import { Redirect } from 'react-router-dom';

/* 
The profile page merely requests information based on the params put into the URL, requesting a user profile listing
based on that ID number. If none exist or are found, it reroutes to the Not Found page, otherwise it populates the 
page using the object assigned to the state. If the listing being viewed doesn't exist within the context's loggedUserMatches 
(ie the user hasn't matched yet), it will render a button that allows the user to generate a matching/conversation with the
listing being viewed, and updates the context and routes the user back to their matches list based on that.
*/

class ProfilePage extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            listingData: {},
            userImage: {},
            error: null
        };
    };

    componentDidMount(){
        TennitApiService.getUser(this.props.match.params.user_id)
            .then(res=>{
                this.setState({
                    listingData: res
                });
            })
            .catch(err=>{
                console.error(err.error.message);
                this.setState({
                    error: err.error.message
                });
            })
        this.context.getLoggedUser();
    }

    generateNewMatch = (e) => {
        const matchData = {
            user1_id: TokenService.parseJwt(TokenService.getAuthToken()).id,
            user2_id: this.state.listingData.user_id
        };
        TennitApiService.postNewMatch(matchData)
            .then(match=>{
                const newMatch = {
                    firstname_1: this.context.loggedUser.firstname,
                    lastname_1: this.context.loggedUser.lastname,
                    firstname_2: this.state.listingData.firstname,
                    lastname_2: this.state.listingData.lastname,
                    ...match
                };
                this.context.loggedUserMatches.push(newMatch);
                this.props.history.push('/');
            })
            .catch(err=>{
                console.error(err.error.message);
                this.setState({
                    error: err.error.message
                });
            })
    }

    displayTheMightyButton=(match)=>{ 
        return match.user1_id === this.state.listingData.user_id || match.user2_id === this.state.listingData.user_id
    }

    render(){   //conditional rendering here depending on listings or not, if you're already matched or viewing your own profile, what kind of details the user opts to share.
        return (
            <>
                {/* if the profile ID doesnt exist anymore, reroute to not found page */}
                {this.state.error &&
                    <Redirect to='/404'/>
                }
                <div className="content-container">
                    <button className="text-shadow back-button" onClick={()=>this.props.history.goBack()}>go back</button>
                    <div className="pic-wrap">
                            <img className="pic" src={this.state.listingData.image} alt="user profile should load here" />     
                            {this.context.loggedUserMatches.some(this.displayTheMightyButton)
                            ?   null
                            :   <div className="button-wrap">
                                    <button className="rounded-button" onClick={this.generateNewMatch}>Start Chatting Now!</button>
                                </div>
                        }
                    </div>
                    {/* if userId is found in any loggedUser matches, don't show the button, its either yourself or someone already matched */}
                    <div className="convo-wrap">
                        
                 
                        {this.state.listingData.listing 
                            ?   <>
                                    <h2 className="rent-text">${this.state.listingData.rent} </h2> 
                                    <h3 className="sub-rent-text">per month</h3>
                                </>
                            :   null
                        }
                        {/* if the user lists their neighborhood render that info */}
                        {this.state.listingData.neighborhood 
                        ?   <>
                                <h1 className="banner-text">
                                    {this.state.listingData.firstname}, {this.state.listingData.lastname}
                                </h1>
                                <h2 className="banner-text banner-text-description">
                                    {this.state.listingData.age} years old near {this.state.listingData.neighborhood}, 
                                    in {this.state.listingData.city}, {this.state.listingData.province}
                                </h2>
                            </>
                        :   <>
                                <h1 className="banner-text">
                                    {this.state.listingData.firstname}, {this.state.listingData.lastname}
                                </h1>
                                <h2 className="banner-text banner-text-description">
                                    {this.state.listingData.age} years old in {this.state.listingData.city}, {this.state.listingData.province}
                                </h2>
                            </>
                        }
                        {/* if the user has a listing, display the blurb about their apartment */}
                        <div className="about-blurb">
                            {this.state.listingData.listing 
                            ?   <div className="user-blurb">
                                    <p> {this.state.listingData.userblurb} </p>
                                    <p> {this.state.listingData.blurb} </p> 
                                </div>  
                            :   <p> {this.state.listingData.userblurb} </p>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage