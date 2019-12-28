import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Header from  '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SplashPage from '../Pages/SplashPage/SplashPage.js';
import HomePage from '../Pages/HomePage/HomePage.js';
import ProfilePage from '../Pages/ProfilePage/ProfilePage.js';
import ConvoPage from '../Pages/ConvoPage/ConvoPage.js';
import SearchPage from '../Pages/SearchPage/SearchPage.js';
import ResultsPage from '../Pages/ResultsPage/ResultsPage.js';
import CreateAccount from '../Pages/CreateAccount/CreateAccount'
import PrivateRoute from '../../Utils/PrivateRoute.js';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute.js';


class App extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedUserId: '',
			loggedIn: true,  //testing purposes
			showLogInPopup: false,
            showCreatePopup: false,
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

	render(){
		return (
			<div className="App">
				<header>
					<Header
						loggedIn={this.state.loggedIn}
						toggleLogIn={this.toggleLogIn.bind(this)}
						toggleLogInPopup={this.toggleLogInPopup.bind(this)}
						toggleEditPopup={this.toggleCreatePopup.bind(this)}
					/>
				</header>
				<main className="App">
					<Switch>
					<Route   //TODO get this working as a PublicOnlyRoute
                            exact
                            path={'/'}
							loggedIn={this.state.loggedIn}
							render={() =>
								!this.state.loggedIn ?
                                <SplashPage
									loggedUserId={this.state.loggedUserId}
									loggedIn={this.state.loggedIn}
									toggleLogIn={this.toggleLogIn.bind(this)}
									showLogInPopup={this.state.showLogInPopup}
									showCreatePopup={this.state.showCreatePopup}
									toggleLogInPopup={this.toggleLogInPopup.bind(this)}
									toggleEditPopup={this.toggleCreatePopup.bind(this)}
								/> :
								<Redirect to="/home" />
							
							}
                        />
						<Route
							exact
							path={'/home'}
							loggedUserId={this.state.loggedUserId}
							loggedIn={this.state.loggedIn}
							component={HomePage}
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
