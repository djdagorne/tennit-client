import React from 'react';
//import {Link} from 'react-router-dom';
import './ConvoPage.css';
import config from '../../../config' //TODO get this off of local json shit
import TennitContext from '../../../TennitContext';

class ConvoPage extends React.Component { 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            user1_listing: {},
            user2_listing: {},
            textarea: ''
        }
    }
    
    componentWillMount(){ 
        this.requestComments()
        this.assignUsers()
    }

    handleChange = (e) => {
        this.setState({
            textarea: e.target.value
        })
    }

    requestComments = () => {
        return fetch(`${config.API_ENDPOINT}/comments/${this.props.match.params.match_id}`, {
            headers: {
            },
        })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    comments: data
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    assignUsers = () => {
        return fetch(`${config.API_ENDPOINT}/matches/${this.props.match.params.match_id}`, {
            headers: {
            },
        })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(matchData =>{
                return fetch(`${config.API_ENDPOINT}/listings/${matchData.user1_id}`, {
                    headers: {
                    },
                }) 
                    .then(res => { 
                        if(!res.ok){
                            throw new Error(res.statusText)
                        }
                        return res.json()
                    })
                    .then(user => {
                        console.log('assigning u1')
                        this.setState({
                            user1_listing: user
                        })
                    })
                    .then(()=>{
                        return fetch(`${config.API_ENDPOINT}/listings/${matchData.user2_id}`, {
                            headers: {
                            },
                        })
                            .then(res => { 
                                if(!res.ok){
                                    throw new Error(res.statusText)
                                }
                                return res.json()
                            })
                            .then(user => {
                                console.log('assigning u2')
                                console.log('context ', this.context.loggedUserId)
                                this.setState({
                                    user2_listing: user
                                })
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const {textInput} = e.target
        const newComment = {
            match_id: this.props.match.params.match_id,
            user_id: this.context.loggedUserId,
            comment: textInput.value
        }
        return fetch(`${config.API_ENDPOINT}/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
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
            })
    }

    render(){
        return(
            <div className="content-container">
            {/* <button onClick={e=>console.log('match id ' + this.props.match.params.match_id)}>asdasdasd</button> */}
                <div className="convo-page-div">
                    <h1 className="banner-text">Chat between {this.context.loggedUser.firstname} and {this.state.user2_listing.firstname}</h1>
                </div>
                <div className="pic-wrap">            
                    <img className='pic' src={this.state.user2_listing.image} alt="display other users pic" />              
                </div>
                <div className="comment-container">
                    <ul className="comment-ul">
                        {this.state.comments.map((comment, index)=>
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
                    <form onSubmit={this.handleCommentSubmit}>
                        <textarea className="comment-textarea" onChange={this.handleChange} id="textInput" value={this.state.textarea} placeholder=""></textarea>
                        <button className="send-message-button" type="submit">send message</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ConvoPage;