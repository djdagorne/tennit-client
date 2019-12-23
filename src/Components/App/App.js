import React, {Component} from 'react';
import { Link } from 'react-router-dom'
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

class App extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedIn: false,
			toggleLogIn: this.toggleLogIn.bind(this),
        }
	}

	toggleLogIn = () => {
		console.log('toggleLogIn')
        this.setState({
            loggedIn: !this.state.loggedIn
		})
	}

	render(){
		return (
			<div className="App">
					<header>
						<Header
							loggedIn={this.state.loggedIn}
							toggleLogIn={this.state.toggleLogIn}
						/>
					</header>
				<main className="App">
						<Switch>
							<Route 
								exact
								path={'/'}
								loggedIn={this.state.loggedIn}
								toggleLogIn={this.state.toggleLogIn.bind(this)}
								
								component={SplashPage}
							/>
							<Route
								exact
								path={'/home'}
								component={HomePage}
							/>
							<Route 
								exact
								path={'/profile'}
								component={ProfilePage}
							/>
							<Route 
								exact
								path={'/results'}
								component={ResultsPage}
							/>
							<Route 
								exact
								path={'/convo'}
								component={ConvoPage}
							/>
							<Route 
								exact
								path={'/search'}
								component={SearchPage}
							/>
						</Switch>
						<footer className="footer">
							<Footer/>
						</footer>
				</main>
			</div>
		);
	}
}

export default App;
