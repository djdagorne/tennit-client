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
                <div class="convo-page-div display-pic-sec">
                    <div class="pic"><Link to="/profile">user1 display pic, link to profile</Link></div>        
                    <div class="pic"><Link to="/profile">user2 display pic, link to profile</Link></div>        
                </div>
                <div class="convo-page-div active-convos">
                    <ul>
                        <li>
                            <div class="textbubble">
                                <q>text text text</q>
                            </div>
                            <span class="user1">  user 1</span>
                        </li>
                        <li>
                            <div class="textbubble">
                                <q>text text text</q>
                            </div>
                            <span class="user2">  user 2</span>
                        </li>
                        <li>
                            <div class="textbubble">
                                <q>text text text</q>
                            </div>
                            <span class="user2">  user 2</span>
                        </li>
                        <li>
                            <div class="textbubble">
                                <q>text text text</q>
                            </div>
                            <span class="user1">  user 2</span>
                        </li>
                        <li>
                            <div class="textbubble">
                                <q>text text text</q>
                            </div>
                            <span class="user2">  user 2</span>
                        </li>
                    </ul>
                    <textarea class="comment-textarea" placeholder="if no previous comments detected give promt here"></textarea>
                    <button class="comment">send message</button>
                </div>
            </>
        )
    }
}

export default ConvoPage;