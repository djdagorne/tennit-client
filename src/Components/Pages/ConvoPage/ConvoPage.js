import React from 'react';
//import {Link} from 'react-router-dom';
import './ConvoPage.css';
import {Link} from 'react-router-dom'
import TokenService from '../../../Services/TokenService'
import config from '../../../config' 
import TennitContext from '../../../TennitContext';

class ConvoPage extends React.Component { 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            user1_listing: {},
            user2_listing: {},
            textarea: '',
            error: null
        }
    }
    
    componentDidMount(){ 
        this.requestComments()
    }

    componentDidUpdate(){
        this.render()
    }

    handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			  [name]: value
		});
	}

    requestComments = () => {
        return fetch(`${config.API_ENDPOINT}/comments/${this.props.match.params.match_id}`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then(data => {
                this.setState({
                    comments: data
                });
                this.assignUsers()
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.error.message
                })
            })
    }

    assignUsers = () => {
        return fetch(`${config.API_ENDPOINT}/matches/${this.props.match.params.match_id}`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then(matchData =>{
                return fetch(`${config.API_ENDPOINT}/listings/${matchData.user1_id}`, {
                    headers: {
                        'authorization': `basic ${TokenService.getAuthToken()}`,
                    },
                }) 
                    .then(res =>
                        (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                    )
                    .then(user => {
                        this.setState({
                            user1_listing: user
                        })
                    })
                    .then(()=>{
                        return fetch(`${config.API_ENDPOINT}/listings/${matchData.user2_id}`, {
                            headers: {
                            },
                        })
                            .then(res =>
                                (!res.ok)
                                ? res.json().then(e => Promise.reject(e))
                                : res.json()
                            )
                            .then(user => {
                                this.setState({
                                    user2_listing: user
                                })
                            })
                    })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.err.message
                })
            })
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const {textInput} = e.target
        const newComment = {
            match_id: this.props.match.params.match_id,
            user_id: this.context.loggedUser.user_id,
            comment: textInput.value
        }

        return fetch(`${config.API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                newComment
            )
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then(newCommentChain=>{
                this.setState({
                    comments: newCommentChain,
                    textarea: ''
                })
            })
            .catch(err=>{
                console.log(err)
                this.setState({
                    error: err.error.message
                })
            })
    }

    deleteMatch = (e) => {
        e.preventDefault();
        return fetch(`${config.API_ENDPOINT}/matches/${this.props.match.params.match_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                ? res.then(e => Promise.reject(e))
                : res.json()
            )
            .then(()=>{
                this.props.history.push('/')
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render(){
        return(
            <>
                <div className="content-container">
                    {this.state.error ?
                    <div className="error-text">error: {this.state.error}</div>
                    : 
                    <>
                    <div className="convo-page-div">
                        <h1 className="banner-text">
                            Chat between {this.context.loggedUser.firstname} and 
                                <Link className="banner-text" to={`/profile/${this.state.user2_listing.user_id}`}>
                                    {' '+this.state.user2_listing.firstname}
                                </Link>
                        </h1>
                    </div>
                    <div className="pic-wrap">            
                        <img className='pic' src={this.state.user2_listing.image} alt="display other users pic" />              
                    </div>
                    <div className="comment-container">

                        <form onSubmit={this.handleCommentSubmit}>
                            <textarea 
                                className="comment-textarea" 
                                type="text"
                                onChange={this.handleInputChange} 
                                id="textInput"
                                placeholder="">
                            </textarea>
                            <button 
                                className="circle-button inline-button"
                                type="submit">
                                    >
                            </button>
                        </form>

                        <ul className="comment-ul">
                            {this.state.comments.sort(e=> -e.id).map((comment, index)=>
                                <li className="comment-li" key={index}>
                                    <div className="textbubble">
                                        <p className="comment-text">
                                            <b>
                                                {(comment.user_id === this.state.user1_listing.user_id)
                                                    ? this.state.user1_listing.firstname
                                                    : this.state.user2_listing.firstname
                                                }
                                            </b>
                                            : {comment.comment}
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <button className="rounded-button" onClick={this.deleteMatch}>Delete Match</button>
                    </div>
                    </>
                    }
                </div>
            </>
        )
    }
}

export default ConvoPage;