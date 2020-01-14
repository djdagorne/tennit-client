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
import CreateAccount from '../Pages/CreateAccount/CreateAccount'
import STORE from '../../STORE'
// import TokenService from '../../Services/TokenService'
import TennitContext from '../../TennitContext';

//TODO set up access tokens
//TODO set up private routes

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
			loggedUser_id: null,
			loggedIn: false,  //testing purposes
			showLogInPopup: false,
			showCreatePopup: false,
			showEditPopup: false,
            email: '',
            password: '',
			error: null,
        }
	}
	toggleLogIn = () => {
		if(this.state.loggedIn){
			this.setState({
				showLogInPopup: false,
				loggedIn: false
			})
			this.forceUpdate()
		}else{
			this.setState({
				showLogInPopup: false,
				loggedIn: true
			})
			this.forceUpdate()
		}
	}

    toggleLogInPopup = () =>{
        this.setState({
            showLogInPopup: !this.state.showLogInPopup
        })
    }

    toggleCreatePopup = () => {
        this.setState({
            showCreatePopup: !this.state.showCreatePopup
        })
	}

    toggleEditPopup = () => {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        })
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
			toggleLogInPopup: this.toggleLogInPopup,
			handleLogIn: this.handleLogIn,
			handleInputChange: this.handleInputChange,
			toggleCreatePopup: this.toggleCreatePopup,
			toggleEditPopup: this.toggleEditPopup,
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
						<Route
								exact
								path={'/'}
								render={() =>
									contextValue.loggedIn ?
									<Redirect to="/home" /> :
									<SplashPage /> 
								}
							/>
							<Route
								exact
								path={'/home'}
								render={() =>
									contextValue.loggedIn ?
									<HomePage /> :
									<Redirect to="/" /> 
								}
							/>
							<Route
								exact
								path={'/edit-account'}
								component={CreateAccount}
							/>
							<Route 
								exact
								path={'/profile/:user_id'}
								component={ProfilePage}
							/>
							<Route 
								exact
								path={'/convo/:convo_id'}
								component={ConvoPage}
							/>
							<Route 
								exact
								path={'/results'}
								component={ResultsPage}
								
							/>
							<Route 
								exact
								path={'/search'}
								component={SearchPage}
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
