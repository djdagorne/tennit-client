import React from 'react';
//import {Link} from 'react-router-dom';
import './ConvoPage.css';
import STORE from '../../../STORE'
import TennitContext from '../../../TennitContext';

const {testUsers, testImages, testMatches, testComments} = STORE.makeThingsFixtures()
class ConvoPage extends React.Component { 
    static contextType = TennitContext;
    constructor(props){
        super(props);
        this.state = {
            currentConvo: testComments.filter(comments => testMatches[this.props.match.params.convo_id -1].id === comments.convo_id), //-1 cause convo_id doesnt start at 0
            user1: testMatches[this.props.match.params.convo_id-1].user1_id,
            user2: testMatches[this.props.match.params.convo_id-1].user2_id,
        }
    }
    handleCommentSubmit = (e) => {
        e.preventDefault();
        const {textInput} = e.target
        const existingComments = this.state.currentConvo
        const newComment = {
            id: this.state.currentConvo.length + 1,
            convo_id: this.state.currentConvo.convo_id,
            poster_id: 1,
            comment: textInput,
        }
        const newConvo = existingComments.push(newComment)
        //relevantConvo.push(newComment)
        this.setState({
            currentConvo: newConvo
        })
    }
    render(){
        return(
            <div className="content-container">
            {/* <button onClick={e=>console.log('match id ' + this.props.match.params.convo_id)}>asdasdasd</button> */}
                <div className="convo-page-div">
                    <h1 className="banner-text">Chat between {testUsers[this.state.user1 -1].firstName} and {testUsers[this.state.user2 -1].firstName}</h1>
                </div>
                <div className="pic-wrap">            
                    <img className='pic' src={testImages[4].image} alt="display other users pic" />              
                </div>
                <div className="comment-container">
                    <ul className="comment-ul">
                        {this.state.currentConvo.map((comment, index)=>
                            <li className="comment-li" key={index}>
                                <div className="textbubble">
                                    <p className="comment-text"><b>{testUsers[comment.poster_id-1].firstName}</b>: {comment.comment}</p>
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