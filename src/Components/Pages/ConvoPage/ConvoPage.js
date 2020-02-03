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
            user2_listing: {},
        }
    }
    
    componentDidMount(){ 
        this.requestComments()
        this.assignUsers()
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
        console.log('assignUsers')
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
                if(matchData.user1_id === this.context.loggedUserId){
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
                            this.setState({
                                user2_listing: user
                            })
                        })
                }else{
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
                                user2_listing: user
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const {textInput} = e.target
        console.log(textInput.value)
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
                                            {comment.user_id === this.context.loggedUserId
                                            ? this.context.loggedUser.firstname
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
                        <textarea className="comment-textarea" id="textInput" placeholder=""></textarea>
                        <button className="send-message-button" type="submit">send message</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ConvoPage;