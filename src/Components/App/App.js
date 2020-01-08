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


class App extends Component {
	static contextType = TennitContext
    constructor(props){
        super(props);
        this.state = {
			loggedUser_id: 1,
			loggedIn: true,  //testing purposes
			showLogInPopup: false,
            showCreatePopup: false,
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
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}
	handleSubmit = (e) => {
		//TODO more CSS always
		//TODO get edit account page working with fake data
		//TODO get search working with fake listings


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
		return (
			<div className="app-container">
				<div className="tile-background"/>
				<header>
					<Header
						loggedIn={this.state.loggedIn}
						toggleLogIn={this.toggleLogIn.bind(this)}

						loggedUser_id={this.state.loggedUser_id}
						showLogInPopup={this.state.showLogInPopup}
						toggleLogInPopup={this.toggleLogInPopup.bind(this)}
						handleSubmit={this.handleSubmit.bind(this)}
						email={this.state.email}
						password={this.state.password}

						
						showCreatePopup={this.state.showCreatePopup}
						toggleCreatePopup={this.toggleCreatePopup.bind(this)}

						handleInputChange={this.handleInputChange.bind(this)}
					/>
				</header>
				<main>
					<Switch>
					<Route
                            exact
                            path={'/'}
							loggedUser_id={this.state.loggedUser_id}
							loggedIn={this.state.loggedIn}
							render={() =>
								!this.state.loggedIn ?
                                <SplashPage
									error={this.state.error}

									loggedIn={this.state.loggedIn}
									toggleLogIn={this.toggleLogIn.bind(this)}
									showLogInPopup={this.state.showLogInPopup}
									toggleLogInPopup={this.toggleLogInPopup.bind(this)}
									handleSubmit={this.handleSubmit.bind(this)}
									loggedUser_id={this.state.loggedUser_id}
									email={this.state.email}
									password={this.state.password}

									showCreatePopup={this.state.showCreatePopup}
									toggleCreatePopup={this.toggleCreatePopup.bind(this)}


									handleInputChange={this.handleInputChange.bind(this)}
								/> :
								<Redirect to="/home" />
							}
                        />
						<Route
							exact
							path={'/home'}
							loggedUser_id={this.state.loggedUser_id}
							loggedIn={this.state.loggedIn}
							render={()=>
								this.state.loggedIn ? 
								<HomePage
									loggedUser_id={this.state.loggedUser_id}
								/> :
								<Redirect to="/" />
							}
						/>
						<Route
							exact
							path={'/edit-account'}
							loggedIn={this.state.loggedIn}
							// component={CreateAccount}
							render={()=>
								!this.state.loggedIn ? 
								<CreateAccount
								/> :
								<Redirect to="/home" />
							}
						/>
						<Route 
							exact
							path={'/profile/:user_id'}
							loggedIn={this.state.loggedIn}
							component={ProfilePage}
							render={()=>
								this.state.loggedIn ? 
								<ProfilePage
									exact
									path={'/profile/:user_id'}
									loggedIn={this.state.loggedIn}
								/> :
								<Redirect to="/" />
							}
						/>
						<Route 
							exact
							path={'/convo/:convo_id'}
							loggedUser_id={this.state.loggedUser_id}
							loggedIn={this.state.loggedIn}
							component={ConvoPage}
						/>
						<Route 
							exact
							path={'/results'}
							loggedIn={this.state.loggedIn}
							// component={ResultsPage}
							render={()=>
								this.state.loggedIn ? 
								<ResultsPage
									loggedIn={this.state.loggedIn}
								/> :
								<Redirect to="/" />
							}
						/>
						<Route 
							exact
							path={'/search'}
							loggedIn={this.state.loggedIn}
							component={SearchPage}
						/>
					</Switch>
				</main>
				<footer className="footer">
					<Footer/>
				</footer>
			</div>
		);
	}
}

export default App;
