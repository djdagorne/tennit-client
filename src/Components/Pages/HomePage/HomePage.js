import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service'
import TokenService from '../../../Services/token-service'

export default class HomePage extends Component {
    static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
			loggedUser: {},
			loggedUserMatches: [],
        }
    }

    componentDidMount(){
        this.setState({ error: null })
        this.getLoggedUser()
    }

    getLoggedUser () {
        if(TokenService.hasAuthToken()){
            TennitApiService.getUser(TokenService.parseJwt(TokenService.getAuthToken()).id)
				.then(userData=>{
					TennitApiService.requestMatchList(userData.user_id)
						.then(data=>{
                            this.context.loggedUser = userData
                            this.loggedUserMatches = data.userMatches
							this.setState({
								loggedUser: userData,
								loggedUserMatches: data.userMatches,
                                showLogInPopup: false,
                                error: null
							},()=>{
								this.forceUpdate()
							})
						})
                        .catch(err=>{
                            console.error(err.error.message)
                            this.setState({
                                error: err.error.message
                            })
                        })
				})
                .catch(err=>{
                    console.error(err)
                    this.setState({
                        error: err.error.message
                    })
                })
        }
    }

    render(){
        return(
            <>
                {this.state.error ?
                <div className="content-container">
                    <div>
                        {this.state.error && <p className="error-text" >{this.state.error}</p>}
                    </div>
                </div>
                :
                <div className="content-container">
                    
                    {this.state.loggedUser.firstname && 
                    <h1 className="banner-text header-one">
                        Welcome back,{' '}
                        <Link 
                            className="banner-text" 
                            to={`/profile/${this.state.loggedUser.user_id}`}>
                                {this.state.loggedUser.firstname}
                        </Link>
                    </h1>}
                
                    <div className="pic-wrap">
                        <img className='pic' src={this.state.loggedUser.image} alt="profile pic" />     
                    </div>
                        
                    <div className="convo-wrap">

                        <div className="button-wrap">
                            <Link to="/search">
                                <button className="rounded-button">Search Listings Now!</button>
                            </Link>
                        </div>
                    
                        {this.state.loggedUserMatches ?
                        <div className="active-convos">
                                <div className="convo-banner">
                                    <h2 className="banner-text home-banner">Your Active Convos</h2>
                                    <p className="banner-text-description">See who's looking to make a move</p>
                                </div>
                                    <ul className="convo-ul"> 
                                        {this.state.loggedUserMatches.map((match, index) => 
                                            (match.user1_id === this.state.loggedUser.user_id) 
                                            ?   <li className="convo-li" key={index} >
                                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                                        {match.firstname_2 +' '+ match.lastname_2}
                                                    </Link>
                                                </li>
                                            :   <li className="convo-li" key={index} >
                                                    <Link className="user-link" to={`/convo/${match.id}`}>
                                                        {match.firstname_1 +' '+ match.lastname_1}
                                                    </Link>
                                                </li>
                                        )}
                                </ul>
                            </div>
                        :   
                        <div className="active-convos"> 
                            <div className="convo-banner">
                                <h2 className="banner-text home-banner">No Active Conversations</h2>
                                <p className="banner-text-description">Search for somewhere new to start a conversation!</p>
                            </div>
                        </div>                
                        }
                    </div>
                </div>
                }
            </>
        )
    }
}