import React from 'react';
import {Link} from 'react-router-dom';
import './ConvoPage.css';

class ConvoPage extends React.Component {
    render(){
        return(
            <>
                <div className="convo-page-div">
                    <h1>Chat between you and [other user]</h1>
                </div>
                <div className="convo-page-div display-pic-sec">
                    <div className="pic"><Link to="/profile">user1 display pic, link to profile</Link></div>        
                    <div className="pic"><Link to="/profile">user2 display pic, link to profile</Link></div>        
                </div>
                <div className="convo-page-div active-convos">
                    <ul>
                        <li>
                            <div className="textbubble">
                                <q>text text text</q>
                            </div>
                            <span className="user1">  user 1</span>
                        </li>
                        <li>
                            <div className="textbubble">
                                <q>text text text</q>
                            </div>
                            <span className="user2">  user 2</span>
                        </li>
                        <li>
                            <div className="textbubble">
                                <q>text text text</q>
                            </div>
                            <span className="user2">  user 2</span>
                        </li>
                        <li>
                            <div className="textbubble">
                                <q>text text text</q>
                            </div>
                            <span className="user1">  user 2</span>
                        </li>
                        <li>
                            <div className="textbubble">
                                <q>text text text</q>
                            </div>
                            <span className="user2">  user 2</span>
                        </li>
                    </ul>
                    <textarea className="comment-textarea" placeholder="if no previous comments detected give promt here"></textarea>
                    <button className="comment">send message</button>
                </div>
            </>
        )
    }
}

export default ConvoPage;