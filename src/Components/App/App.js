import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
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
import STORE from '../../STORE'
import TokenService from '../../Services/TokenService'
import TennitContext from '../../TennitContext';
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
			loggedUser_id: null,
			loggedIn: false,
			showLogInPopup: false,
			showCreatePopup: false,
			showEditPopup: false,
            email: 'test',
            password: '',
			error: null,
			testUsers: STORE.makeUserArray()
        }
	}

	componentWillMount = () => {
		if(TokenService.getAuthToken()){
			const unpw = TokenService.decodeAuthToken().split(":");
			const matchedUser = this.state.testUsers.filter(users => unpw[0] === users.email)

			this.setState({
				email: matchedUser[0].email,
				password: matchedUser[0].password,
				loggedUser_id: matchedUser[0].id,
				loggedIn: true,
			})
		}
	}

	toggleLogIn = () => {
		if(this.state.loggedIn){
			this.setState({
				showLogInPopup: false,
				loggedIn: false,
				email: '',
				password: '',
				loggedUser_id: null,
			},()=>{TokenService.clearAuthToken()})
			this.forceUpdate()
		}else{
			this.setState({
				showLogInPopup: false,
				loggedIn: true
			})
			this.forceUpdate()
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
		//check if credentials are valid, assign the loggedUser_id, set loggedIn to true (replace later with access tokens)
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
		const verify = STORE.makeUserArray()

		const matchedUser = verify.filter(userItems => email === userItems.email)
        if(password === matchedUser[0].password){
            this.setState({
                loggedUser_id: matchedUser[0].id
			})
			TokenService.saveAuthToken(
				TokenService.makeBasicAuthToken(email, password)
			)
            this.toggleLogIn()
        }else{
            this.setState({error: 'username and password do not match, email admin to verify'}, ()=>{
				console.log(this.state.error)
			})
        }
	}
	render(){
		const contextValue = {
			error: this.state.error,
			loggedIn: this.state.loggedIn,
			loggedUser_id: this.state.loggedUser_id,
			showLogInPopup: this.state.showLogInPopup,
			showCreatePopup: this.state.showCreatePopup,
			showEditPopup: this.state.showEditPopup,

			email: this.state.email,
			password: this.state.password,

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
					{contextValue.loggedIn ?
						<div className="tile-background"/> :
						<div className="splash-background"/>
					}
					<main>
						<Switch>
							<PublicOnlyRoute
								exact
								path={'/'}
								component={SplashPage}
								// render={() =>
								// 	contextValue.loggedIn ?
								// 	<Redirect to="/home" /> :
								// 	<SplashPage /> 
								// }
							/>
							<PrivateRoute
								exact
								path={'/home'}
								component={HomePage}
								// render={() =>
								// 	contextValue.loggedIn ?
								// 	<HomePage /> :
								// 	<Redirect to="/" /> 
								// }
							/>
							<PrivateRoute 
								exact
								path={'/profile/:user_id'}
								component={ProfilePage}
							/>
							<PrivateRoute 
								exact
								path={'/convo/:convo_id'}
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
