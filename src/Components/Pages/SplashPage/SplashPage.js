import React, { Component} from 'react';
import './SplashPage.css';
import TennitContext from '../../../TennitContext';
/* import TokenService from '../Services/token-service'
 */
export default class SplashPage extends Component {
    static contextType = TennitContext


    render(){
        return (
            <div className="slogan-wrap">
                <div className="slogan">
                    <h1 className="slogan-text">Fall in love.</h1> 
                    <h2 className="slogan-text">with affordable rent.</h2>
                </div>
            </div>
        );
    }
}