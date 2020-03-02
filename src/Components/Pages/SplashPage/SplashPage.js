import React, { Component} from 'react'
import './SplashPage.css'
import TennitContext from '../../../TennitContext'

export default class SplashPage extends Component {
    static contextType = TennitContext

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