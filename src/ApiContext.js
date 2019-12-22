import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const TennitContext = React.createContext({
    validJWT: false,
})


export default class TennitContextProvider extends Component {
    state = {
        validJWT: false,
	}
    renderLogInLink(){
        return(
                <Link to="/login"className="log-button">log in</Link>
        )
    }
    renderLogOutLink(){
        return(
                <Link href="/" className="log-button">log out</Link>
        )
    }
	toggleListingSection = listingChecked => {
        this.setState({
            listingChecked: !this.state.listingChecked
        });
    }


    render() {
		const value = {
			listingChecked: false,
			showCreateAccount: false,
			validJWT: false,
			toggleListingSection: this.toggleListingSection,
		}
        return(
            <TennitContext.Provider value={value}>
                {this.props.children}
            </TennitContext.Provider>
        )
    }
}