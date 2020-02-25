import React, {Component} from 'react';
import './ProfilePage.css';
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service';
import { Redirect } from 'react-router-dom';

class ProfilePage extends Component {
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            listingData: {},
            userImage: {},
            error: null
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
                console.error(err.error.message)
                this.setState({
                    error: err.error.message
                })
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
                console.error(err.error.message)
                this.setState({
                    error: err.error.message
                })
            })
    }

    render(){
        return(
            <>
                {this.state.error &&
                <Redirect to='/404'/>
                }
                {this.state.listingData === {} ? 
                    <div className="content-container">
                        <div>
                            {this.state.error && <p className="error-text" >Error: {this.state.error}</p>}
                        </div>
                    </div>

                :   <div className="content-container">

                        <div className="pic-wrap">
                            <div >
                                <img className="pic" src={this.state.listingData.image} alt="test" />        
                            </div>
                            {this.state.listingData.user_id === TokenService.parseJwt(TokenService.getAuthToken()).id
                                ?   null
                                :   <div className="button-wrap">
                                        <button className="rounded-button" onClick={this.generateNewMatch}>Perfect Tenn!</button>
                                    </div>
                            }
                        </div>

                        <div>
                            {this.state.listingData.listing ?
                                <h2 className="rent-text">${this.state.listingData.rent} per month</h2> :
                                null
                            }

                            {this.state.listingData.neighborhood 
                            ?   <h1 className="banner-text">
                                    {this.state.listingData.firstname}, {this.state.listingData.lastname}, {this.state.listingData.age} years old
                                    in {this.state.listingData.neighborhood}, {this.state.listingData.city} 
                                </h1>
                            :   <h1 className="banner-text">{this.state.listingData.firstname}'s place in {this.state.listingData.city}, {this.state.listingData.province} </h1>
                            }
                            
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
                }
            </>
        )
    }
}

export default ProfilePage;