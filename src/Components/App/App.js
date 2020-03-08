import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import SplashPage from '../Pages/SplashPage/SplashPage';
import HomePage from '../Pages/HomePage/HomePage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import ConvoPage from '../Pages/ConvoPage/ConvoPage';
import SearchPage from '../Pages/SearchPage/SearchPage';
import ResultsPage from '../Pages/ResultsPage/ResultsPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';
import TokenService from '../../Services/token-service';
import TennitContext from '../../TennitContext';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import IdleService from '../../Services/idle-service';
import AuthApiService from '../../Services/auth-api-service';
import TennitApiService from '../../Services/tennit-api-service';

/* 
The App component is responsible for holding a majority of the state modifying functions, auth/login,
state and context management, as well as the Switch for my different page Routes. It's using a basic token
inspection to authorize the rendering of private routes, and sets up a callback function on a timer to request new tokens before expiry
if certain event handlers are triggered. Otherwise it's also the part of the app responsible for using token services to delete the expired token
and log the user out to protect their data. The timer is 5 minutes, but even moving your mouse, or clicking a key/button will trigger a 
request for a refresh at 10 seconds before the assigned expiry, as dictated by the server token.
*/

class App extends Component {
	static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
			loggedUser: {},
			loggedUserMatches: [],
			showLogInPopup: false,
			showCreatePopup: false,
			showEditPopup: false,
			error: null,
        };
	};

	//on user visiting page or refreshing it will clear error and read any existing tokens to see if valid. 
	//populates page with data based on the results from that.
	componentDidMount(){
		this.setState({ error: null })	
		IdleService.setIdleCallback(this.logoutFromIdle);
		if(TokenService.hasAuthToken()){
			IdleService.registerIdleTimerResets();
			TokenService.queueCallbackBeforeExpiry(()=>{ 
				AuthApiService.postRefreshToken()
					.catch(err=>{
						console.error(err.error.message)
						this.setState({
							error: err.error.message
						});
						TokenService.clearAuthToken();
						this.forceUpdate();
					})
			})
		}
	}
	
	//clears timers and callbacks for next session
	componentWillUnmount(){
		IdleService.unregisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}
	
	//executes after timer expires without event being triggered.
	logoutFromIdle=()=>{
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unregisterIdleResets();
		this.forceUpdate();
	}
	
	//posts user to auth endpoint and state for App or provides an error
	handleLogIn=(e)=>{
		e.preventDefault();
		TennitApiService.postLogIn(e)
			.then(res => {
				if(res.authToken){
					this.setState({
						showLogInPopup: false,
						error: null
					});
				}
			})
			.catch(err=>{
				console.error(err)
				this.setState({
					error: err.error.message
				});
			})
	}

	//handles state after log in popup closes, based on the status of the users web token
	toggleLogIn=()=>{
		if(TokenService.hasAuthToken()){
			TokenService.clearAuthToken();
			this.setState({
				showLogInPopup: false,
				email: '',
				password: '',
			},()=>this.forceUpdate());
		}else{
			this.setState({
				showLogInPopup: false
			});
		}
	}

	//handles popups without interacting with server or webtokens
    togglePopup=(e)=>{
		if(e === 'login'){
			this.setState({
				showLogInPopup: !this.state.showLogInPopup,
				error: null
			});
		}
		if(e === 'create'){
			this.setState({
				showCreatePopup: !this.state.showCreatePopup,
				error: null
			});
		}
		if(e === 'edit'){
			this.setState({
				showEditPopup: !this.state.showEditPopup
			});
		}
    }
	
	handleInputChange=(event)=>{
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}

	//function to handle populating the context and state on refresh/conditions where a state/context might have been lost.
	getLoggedUser=()=>{
        if(TokenService.hasAuthToken()){
            TennitApiService.getUser(TokenService.parseJwt(TokenService.getAuthToken()).id)
				.then(userData=>{
					TennitApiService.requestMatchList(userData.user_id)
						.then(data=>{
                            this.context.loggedUser = userData;
                            this.context.loggedUserMatches = data.userMatches;
							this.setState({
								loggedUser: userData,
								loggedUserMatches: data.userMatches,
                                showLogInPopup: false,
                                error: null
							},()=>{
								this.forceUpdate()
							});
						})
                        .catch(err=>{
                            console.error(err.error.message)
                            this.setState({
                                error: err.error.message
                            });
                        })
				})
                .catch(err=>{
                    console.error(err)
                    this.setState({
                        error: err.error.message
                    });
                })
        }
    }
	
	render(){
		const contextValue = {
			...this.state,
			searchQuery: [],
			toggleLogIn: this.toggleLogIn,
			handleLogIn: this.handleLogIn,
			handleInputChange: this.handleInputChange,
			togglePopup: this.togglePopup,
			getLoggedUser: this.getLoggedUser
		};
		return (
			<TennitContext.Provider value={contextValue}>
				<div className="app-container">
					<header>
						<Header />
					</header>
					{TokenService.hasAuthToken() 
						? 	<div className="tile-background"/> 
						:	<div className="splash-background"/>
					}
					<main>
						<Switch>
							<PublicOnlyRoute
								exact
								path={'/'}
								component={SplashPage}
							/>
							<PrivateRoute
								exact
								path={'/home'}
								component={HomePage}
							/>
							<PrivateRoute 
								exact
								path={'/profile/:user_id'}
								component={ProfilePage}
							/>
							<PrivateRoute 
								exact
								path={'/convo/:match_id'}
								component={ConvoPage}
							/>
							<PrivateRoute 
								exact
								path={'/results'}
								component={ResultsPage}
								
							/>
							<PrivateRoute 
								exact
								path={'/search'}
								component={SearchPage}
							/>
							<Route 
								component={NotFoundPage}
							/>
						</Switch>
					</main>
					<footer className="footer">
						<Footer/>
					</footer>
				</div>
			</TennitContext.Provider>
		)
	}
}

export default App;
