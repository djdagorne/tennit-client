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
//import TokenService from '../../Services/TokenService'
import STORE from '../../STORE'
// import TennitContext from '../../TennitContext';


class App extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedUser_id: '',
			loggedIn: false,  //testing purposes
			showLogInPopup: false,
            showCreatePopup: false,
            email: '',
            password: '',
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
        //TODO get the state to bubble up properly
        //

        e.preventDefault();
        const { email, password } = this.state
        if(email.length === 0){
            this.setState({error: 'email required'})
        }
        if(password.length === 0){
            this.setState({error: 'password required'})
        }
		const verify = STORE.makeUserArray()

		const matchedUser = verify.filter(userItems => email === userItems.email)
        if(password === matchedUser[0].password){
            this.setState({
                loggedUser_id: matchedUser[0].id
			})
			console.log('matchedUser[0].id = ' + matchedUser[0].id)
			console.log('states loggedUser_id = ' + this.state.loggedUser_id) //why isnt this line logging correctly? hmm
            // TokenService.saveAuthToken(
            //     TokenService.makeBasicAuthToken(email, password)
            // )
            this.toggleLogIn()
        }else{
            this.setState({error: 'username and password do not match, email admin to verify'})
        }
    }

	render(){
		return (
			<div className="App">
				<header>
					<Header
						loggedIn={this.state.loggedIn}
						toggleLogIn={this.toggleLogIn.bind(this)}
					/>
				</header>
				<main className="App">
					<Switch>
					<Route   //TODO get this working as a PublicOnlyRoute
                            exact
                            path={'/'}
							loggedUser_id={this.state.loggedUser_id}
							loggedIn={this.state.loggedIn}
							render={() =>
								!this.state.loggedIn ?
                                <SplashPage
									loggedIn={this.state.loggedIn}
									toggleLogIn={this.toggleLogIn.bind(this)}
									showLogInPopup={this.state.showLogInPopup}
									showCreatePopup={this.state.showCreatePopup}
									toggleLogInPopup={this.toggleLogInPopup.bind(this)}
									toggleCreatePopup={this.toggleCreatePopup.bind(this)}
									handleSubmit={this.handleSubmit.bind(this)}
									loggedUser_id={this.state.loggedUser_id}

									email={this.state.email}
									password={this.state.password}

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
							component={CreateAccount}
						/>
						<Route 
							exact
							path={'/profile/:user_id'}
							loggedIn={this.state.loggedIn}
							component={ProfilePage}
						/>
						<Route 
							exact
							path={'/results'}
							loggedIn={this.state.loggedIn}
							component={ResultsPage}
						/>
						<Route 
							exact
							path={'/convo/:convo_id'}
							loggedIn={this.state.loggedIn}
							component={ConvoPage}
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
