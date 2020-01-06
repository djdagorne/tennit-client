import React from 'react';
//import {Link} from 'react-router-dom';
import './ConvoPage.css';
import STORE from '../../../STORE'

const {testUsers, testImages, testMatches, testComments} = STORE.makeThingsFixtures()
class ConvoPage extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            currentConvo: testComments.filter(comments => testMatches[this.props.match.params.convo_id -1].id === comments.convo_id), //-1 cause convo_id doesnt start at 0
            user1: testMatches[this.props.match.params.convo_id-1].user1_id,
            user2: testMatches[this.props.match.params.convo_id-1].user2_id,
        }
    }
    handleSubmit = (e) => {
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
        console.log(this.state)
        return(
            <div className="content-container">
            <button onClick={e=>console.log('match id ' + this.props.match.params.convo_id)}>asdasdasd</button>
                <div className="convo-page-div">
                    <h1>Chat between {testUsers[this.state.user1 -1].firstName} and {testUsers[this.state.user2 -1].firstName}</h1>
                </div>
                <div className="convo-page-div display-pic-sec">
                    <img className='convo-pic' src={testImages[0].image} alt="test" />               
                    <img className='convo-pic' src={testImages[4].image} alt="test" />              
                </div>
                <div className="convo-page-div active-convos">
                    <ul>
                        {this.state.currentConvo.map((comment, index)=>
                            <li key={index}>
                                <div className="textbubble">
                                    <q>{comment.comment}</q>
                                </div>
                                <span className={'user'+comment.poster_id}>from {testUsers[comment.poster_id-1].firstName}</span>
                            </li>
                        )}
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <textarea className="comment-textarea" id="textInput" placeholder=""></textarea>
                        <button type="submit">send message</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ConvoPage;