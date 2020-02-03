import React, {Component} from 'react';
import './ProfilePage.css';
import config from '../../../config'

class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            listingData: {},
            userImage: {}
        }
    }
    componentDidMount(){
        return fetch(`${config.API_ENDPOINT}/listings/${this.props.match.params.user_id}`, {
            headers: {
            },
        })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(res=>{
                this.setState({
                    listingData: res
                })
            })
    }
    render(){
        return(
            <div className="content-container">
                <h1 className="banner-text">{this.state.listingData.firstname}'s place at {this.state.listingData.neighborhood}, {this.state.listingData.city}</h1>
                {this.state.listingData.listing ?
                    <h2 className="rent-text">${this.state.listingData.rent} per month</h2> :
                    null
                }
                <div className="pic-wrap">
                    <img className="pic" src={this.state.listingData.image} alt="test" />        
                </div>
                
                <div className="button-wrap">
                    <button to="/home" className="rounded-button" >Pass</button>
                    <button to="/home" className="rounded-button" onClick={e=>console.log('on click create new match, send to convo URL')}>Tenn!</button>
                </div>
                <div className="about-blurb">
                    <h2 className="banner-text">{this.state.listingData.firstname}, {this.state.listingData.lastname}, {this.state.listingData.age} years old</h2>
                    {this.state.listingData.listing ?
                        <div className="user-blurb">
                            <p> {this.state.listingData.userblurb} </p>
                            <p> {this.state.listingData.blurb} </p> 
                        </div>  :
                        <p> {this.state.listingData.userblurb} </p>
                    }
                </div>
                
                    
            </div>
        )
    }
}

export default ProfilePage;