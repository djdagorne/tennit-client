import React, { Component} from 'react';
import './SplashPage.css';
import TennitContext from '../../../TennitContext';

/* 
The splash page doesn't have much to it obviously. This is where I introduce the  idea
of this incredibly shallow dating app idea using a money focused approach to dating with a bizzare intro blurb
as well as unflattering imagery to hopefully get users to think about what they're actually doing and using. 

I wanted to show that I have the skills to make something practical, professional, and realistic, while also 
having a bit of fun and making fun of the fast and loose nature of online social media.

It's sort of startling to me how often I've had to explain this was a joke, but I've commited way too much time to this one,
so its here to stay lol.
*/

export default class SplashPage extends Component {
    static contextType = TennitContext;

    render(){
        return (
            <div className="splash-wrap">
                <div className="title-box">
                    <div className="slogan">
                        <h1 className="slogan-text">Fall in love.</h1> 
                        <h2 className="slogan-text">with affordable rent.</h2>
                    </div>
                </div>
                <div className="intro-box">
                    <h3 className="intro-text">
                            <p className="opening-line">
                                Finding a soulmate can take a lifetime.
                            </p>
                            <p >
                                But you need to find someone who will split your bachelor apartment by the first.
                            </p>
                            <p >
                                ...and they got to be okay with your couch.
                            </p>
                            <p >
                                ...and they should probably know about your cat, Sprinkles.
                            </p>
                            <p >
                                Starting today, you can find love that works for you, your couch AND Sprinkles. 
                            </p> 
                            <p>
                                And you set the price.
                            </p>
                        <button className="splash-button" type="submit" onClick={e=>this.context.togglePopup('create')}>Make an Account Today</button>

                    </h3>
                </div>
            </div>
        );
    }
}