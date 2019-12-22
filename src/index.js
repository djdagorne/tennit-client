import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App/App.js';
import TennitContextProvider from './ApiContext.js';

ReactDOM.render(
	// static contextType = TennitContextProvider;

	// state = {
	// 	listingChecked: '',
	// 	showCreateAccount: '',
	// 	validJWT: true,
	// }

	// toggleListingSection= listingChecked => {
    //     this.setState({
    //         listingChecked: !this.state.listingChecked
    //     });
	// }
    // toggleCreateAccount = showCreateAccount => {
    //     this.setState({
    //         showCreateAccount: !this.showCreateAccount
    //     });
    // }
    <BrowserRouter>
        <TennitContextProvider>
            <App /> 
        </TennitContextProvider>
    </BrowserRouter>, 
    document.getElementById('root'));
