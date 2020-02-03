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
import TokenService from '../../Services/TokenService'
import TennitContext from '../../TennitContext';
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import config from '../../config'


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

	componentDidMount = () => {
		console.log('didMount')
		console.log(this.state.loggedUserId)
		if(TokenService.getAuthToken()){
			const usernamePassword = TokenService.decodeAuthToken().split(":");
			this.requestCreds(usernamePassword)
		}
	}
	

	requestCreds = (usernamePassword) => {
		console.log('reqCreds')
		console.log(this.state.loggedUserId)
		return fetch(`${config.API_ENDPOINT}/users/?email=${usernamePassword[0]}`, {
			headers: {
			},
		})
			.then(res => {
				if(!res.ok){
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then(user => {
				if(user.password === usernamePassword[1]){
					this.context.loggedUserId = user.id
					TokenService.saveAuthToken(
						TokenService.makeBasicAuthToken(usernamePassword[0], usernamePassword[1])
					)
					this.context.loggedUserId = user.id
					this.setState({
						showLogInPopup: false,
						loggedUserId: user.id
					},()=>{
						this.assignUser()
					})
				}else{
					throw new Error(user.statusText);
				}					
			})
			.catch(err => {
				console.log(err)
			})
	}
	
	assignUser = () =>{
		console.log('assignUserApp')
		console.log(this.state.loggedUserId)
		return fetch(`${config.API_ENDPOINT}/listings/${this.state.loggedUserId}`, {
				headers: {
				},
			})
			.then(res => {
				if(!res.ok){
					 throw new Error(res.statusText);
				}
				return res.json();
			  })
			  .then(data => {
					this.setState({
						loggedUser: data
				 	},()=>{
						 this.requestMatches()
					});
			  })
			  .catch(err => {
				  console.log(err.json())
			  })
	}
	
	requestMatches = () => {
		console.log('reqMatches')
		console.log(this.state.loggedUserId)
		return fetch(`${config.API_ENDPOINT}/matches/?user_id=${this.state.loggedUserId}`, {
            headers: {
            },
        })
        .then(res => {
            if(!res.ok){
				throw new Error(res.statusText);
            }
            return res.json();
			})
			.then(data => {
				this.context.loggedUserMatches = data
				this.setState({
					userMatches: data
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
	
	handleLogIn = (e) => {
		e.preventDefault();
		//check if credentials are valid, assign the loggedUser
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

		const credentials = [email, password]
		
		this.requestCreds(credentials)

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
