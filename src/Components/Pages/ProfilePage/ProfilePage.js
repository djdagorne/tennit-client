import React, {Component} from 'react'
import './ProfilePage.css'
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service'
import { Redirect } from 'react-router-dom'

class ProfilePage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props)
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
        this.context.getLoggedUser()
    }

    generateNewMatch = (e) => {
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

    displayTheMightyButton=(match)=>{ 
        return match.user1_id === this.state.listingData.user_id || match.user2_id === this.state.listingData.user_id
    }

    render(){
        return(
            <>
                {this.state.error &&
                    <Redirect to='/404'/>
                }
                <div className="content-container">

                        <div className="pic-wrap">
                                <img className="pic" src={this.state.listingData.image} alt="test" />     
                        </div>
                        {this.context.loggedUserMatches.some(this.displayTheMightyButton)
                            ?   null
                            :   <div className="button-wrap">
                                    <button className="rounded-button" onClick={this.generateNewMatch}>Start Chatting Now!</button>
                                </div>
                        }
                        <div className="convo-wrap">
                            {this.state.listingData.listing 
                                ? 
                                <>
                                    <h2 className="rent-text">${this.state.listingData.rent} </h2> 
                                    <h3 className="sub-rent-text">per month</h3>
                                </>
                                : null
                            }

                            {this.state.listingData.neighborhood 
                            ?   <>
                                    <h1 className="banner-text">
                                        {this.state.listingData.firstname}, {this.state.listingData.lastname}
                                    </h1>
                                    <h2 className="banner-text">
                                        {this.state.listingData.age} years old near {this.state.listingData.neighborhood}, 
                                        in {this.state.listingData.city}, {this.state.listingData.province}
                                    </h2>
                                </>
                            :   <>
                                    <h1 className="banner-text">
                                        {this.state.listingData.firstname}, {this.state.listingData.lastname}
                                    </h1>
                                    <h2 className="banner-text">
                                        {this.state.listingData.age} years old in {this.state.listingData.city}, {this.state.listingData.province}
                                    </h2>
                                </>
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
            </>
        )
    }
}

export default ProfilePage