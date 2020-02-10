import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import SplashPage from '../Pages/SplashPage/SplashPage';
import HomePage from '../Pages/HomePage/HomePage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import ConvoPage from '../Pages/ConvoPage/ConvoPage';
import SearchPage from '../Pages/SearchPage/SearchPage';
import ResultsPage from '../Pages/ResultsPage/ResultsPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage'
import TokenService from '../../Services/token-service'
import TennitContext from '../../TennitContext';
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import IdleService from '../../Services/idle-service'
import config from '../../config'
import TennitApiServices from '../../Services/tennit-api-services';


class App extends Component {
	static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
			loggedUserId: '',
			loggedUser: {},
			loggedUserMatches: [],
			showLogInPopup: false,
			showCreatePopup: false,
			showEditPopup: false,
			error: null,
        }
	}

	componentDidMount(){
		IdleService.setIdleCallback(this.logoutFromIdle) 

		if(TokenService.hasAuthToken()) {
			this.assignUser()
			IdleService.registerIdleTimerResets() //executes a function that resets timers when users inputs are detected
			TokenService.queueCallbackBeforeExpiry(()=>{ //
				TennitApiServices.postRefreshToken()
			})
		}
	  }
	
	componentWillUnmount(){
		IdleService.unregisterIdleResets()
		TokenService.clearCallbackBeforeExpiry()
	}
	
	logoutFromIdle = () => {
		TokenService.clearAuthToken()
		TokenService.clearCallbackBeforeExpiry()
		IdleService.unregisterIdleResets()
		this.forceUpdate()
	}
	
	handleLogIn = (e) => {
		e.preventDefault();
		const { email, password } = this.state
        if(email.length === 0){
            this.setState({error: 'email required'}, ()=>{
				console.log(this.state.error)
			})
			return
        }
        if(password.length === 0){
            this.setState({error: 'password required'}, ()=>{
				console.log(this.state.error)
			})
			return
        }

		const userCreds = {email, password}

		return fetch(`${config.API_ENDPOINT}/auth/login`, {
			method: 'POST',
			headers: {
                'content-type': 'application/json',
			},
			body: JSON.stringify(userCreds)
		})
			.then(res => {
				console.log(res.body)
				if(!res.ok){
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then(res => {
				TokenService.saveAuthToken(res.authToken)
				const token = TokenService.getAuthToken(res.authToken)
				console.log(token)
				this.setState({
					showLogInPopup: false,
					loggedUserId: token.id
				},()=>{
					this.assignUser()
				})				
			})
			.catch(err => {
				console.log(err)
			})

	}
	
	assignUser = () =>{
		return fetch(`${config.API_ENDPOINT}/listings/${TokenService.parseJwt(TokenService.getAuthToken()).id}`, {
				headers: {
					'authorization': `Bearer ${TokenService.getAuthToken()}`,
				},
			})
			.then(res => {
				if(!res.ok){
					throw new Error(res.statusText);
				}
				return res.json()
			})
			.then(data => {
				this.context.loggedUser = data
				this.setState({
					loggedUser: data,
					loggedUserId: TokenService.parseJwt(TokenService.getAuthToken()).id
				},()=>{
					this.requestMatches()
				});
			})
			.catch(err => {
				console.log(err)
			})
	}

	requestMatches = () => {
		return fetch(`${config.API_ENDPOINT}/matches/?user_id=${this.state.loggedUser.user_id}`, {
            headers: {
				'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => {
            if(!res.ok){
				throw new Error(res.statusText);
			}
			if(res.status === 404){
            	return []
			}else{
				return res.json()
			}
		})
		.then(data => {
			this.context.loggedUserMatches = data
			this.setState({
				loggedUserMatches: data
			});
		})
		.catch(err => {
			console.log(err)
		})
	}
	

	toggleLogIn = () => {
		if(TokenService.hasAuthToken()){
			TokenService.clearAuthToken()
			this.setState({
				showLogInPopup: false,
				email: '',
				password: '',
				loggedUserId: null,
			},()=>this.forceUpdate())
		}else{
			this.setState({
				showLogInPopup: false
			})
		}
	}

    togglePopup = (e) =>{
		if(e === 'login'){
			this.setState({
				showLogInPopup: !this.state.showLogInPopup
			})
		}
		if(e === 'create'){
			this.setState({
				showCreatePopup: !this.state.showCreatePopup
			})
		}
		if(e === 'edit'){
			this.setState({
				showEditPopup: !this.state.showEditPopup
			})
		}
    }
	
	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}
	
	render(){
		const contextValue = {
			...this.state,
			searchQuery: [],

			toggleLogIn: this.toggleLogIn,
			handleLogIn: this.handleLogIn,
			handleInputChange: this.handleInputChange,
			togglePopup: this.togglePopup
		}
		return (
			<TennitContext.Provider value={contextValue}>
				<div className="app-container">
					<header>
						<Header />
					</header>
					{ TokenService.hasAuthToken() ?
						<div className="tile-background"/> :
						<div className="splash-background"/>
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
		);
	}
}

export default App;
