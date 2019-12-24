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
import PrivateRoute from '../../Utils/PrivateRoute.js';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute.js';


class App extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedIn: true,
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
		}else{
			this.setState({
				showLogInPopup: false,
				loggedIn: true
			})
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
								this.state.loggedIn ?
                                <SplashPage
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
						<PrivateRoute
							exact
							path={'/home'}
							loggedIn={this.state.loggedIn}
							component={HomePage}
						/>
						<PrivateRoute
							exact
							path={'/edit-account'}
							loggedIn={this.state.loggedIn}
							render={()=>
							<div>edit account screen later</div>
							}
						/>
						<PrivateRoute 
							exact
							path={'/profile'}
							loggedIn={this.state.loggedIn}
							component={ProfilePage}
						/>
						<PrivateRoute 
							exact
							path={'/results'}
							loggedIn={this.state.loggedIn}
							component={ResultsPage}
						/>
						<PrivateRoute 
							exact
							path={'/convo'}
							loggedIn={this.state.loggedIn}
							component={ConvoPage}
						/>
						<PrivateRoute 
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
