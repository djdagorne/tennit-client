import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
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
// import STORE from '../../STORE'
// import TennitContext from '../../TennitContext';


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
						toggleCreatePopup={this.toggleCreatePopup.bind(this)}
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
							render={()=>
								this.state.loggedIn ? 
								<HomePage/> :
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
