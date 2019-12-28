import React from 'react';
//import {Link} from 'react-router-dom';
import './ConvoPage.css';
import STORE from '../../../STORE'

        const {testUsers, testImages, testConvos, testComments} = STORE.makeThingsFixtures()

        const relevantConvo = testComments.filter(comments => testConvos[0].id === comments.convo_id)
class ConvoPage extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            currentConvo: relevantConvo,

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {textInput} = e.target
        const newComment = {
            id: this.state.currentConvo.length + 1,
            convo_id: this.state.currentConvo.convo_id,
            poster_id: 1,
            comment: textInput,
        }
        relevantConvo.push(newComment)
        this.setState({
            currentConvo: relevantConvo
        })
    }
    render(){
        
        return(
            <>
            <button onClick={e=> console.log(this.state.currentConvo)}>asdasdasd</button>
                <div className="convo-page-div">
                    <h1>Chat between you and {testUsers[testComments[0].poster_id].firstName}</h1>
                </div>
                <div className="convo-page-div display-pic-sec">
                    <img className='pic' src={testImages[0].image} alt="test" />               
                    <img className='pic' src={testImages[4].image} alt="test" />              
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
                    <form onSubmit={e=>this.handleSubmit(e)}>
                        <textarea className="comment-textarea" id="textInput" placeholder=""></textarea>
                        <button type="submit"  className="comment">send message</button>
                    </form>
                </div>
            </>
        )
    }
}

export default ConvoPage;