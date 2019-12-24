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
import CreateAccount from '../Pages/CreateAccount/CreateAccount';
import PrivateRoute from '../../Utils/PrivateRoute.js';


class App extends Component {
	
    constructor(props){
        super(props);
        this.state = {
			loggedIn: false,
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
					<Route 
                            exact
                            path={'/'}
                            render={() =>
                                <SplashPage
									loggedIn={this.state.loggedIn}
									toggleLogIn={this.toggleLogIn.bind(this)}
									showLogInPopup={this.state.showLogInPopup}
									showCreatePopup={this.state.showCreatePopup}
									toggleLogInPopup={this.toggleLogInPopup.bind(this)}
									toggleEditPopup={this.toggleCreatePopup.bind(this)}
								/>}
                        />
						<PrivateRoute
							exact
							path={'/home'}
							component={HomePage}
							// render={()=>
							// <HomePage loggedIn={this.state}/>
							// }
						/>
						<Route
							exact
							path={'/edit-account'}
							render={()=>
							<div>edit account screen later</div>
							}
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
				</main>
				<footer className="footer">
					<Footer/>
				</footer>
			</div>
		);
	}
}

export default App;
