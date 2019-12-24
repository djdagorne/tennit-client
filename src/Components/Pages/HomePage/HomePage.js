import React, {Component} from 'react'
import {Link } from 'react-router-dom';
import './HomePage.css'

class HomePage extends Component {
    render(){

        const invites = [
            `invite link`,
            `invite link`,
            `invite link`,
            `invite link`,
        ]

        const convolinks = [
            'convo link',
            'convo link',
            'convo link',
            'convo link',
        ]
        return(
            <>
                <span>Hello, <h1>User Name</h1></span>
                <div className="home-div display-pic-sec">
                    <div className="pic"><Link to="/profile">user display pic, link to profile</Link></div>        
                </div>
                <div>
                    <Link to="/results"><button className="search-now">Search Now!</button></Link>
                </div>
                <div className="home-div pending-invites">
                    <h2>invites</h2>
                    <p>Check out your invites from other users to chat!</p>
                    <ul>
                        {invites.map((invite, index)=>
                            <li key={index} ><Link to="/profile">{invite}</Link></li>
                        )}
                    </ul>
                </div>
                <div className="home-div active convos">
                    <h2>Convos</h2>
                    <p>conversation table in db is searched, rows marked with 'validity' and user comments from logged in user_id are listed here as ordered list of links.</p>
                    <ul>
                        {convolinks.map((convo, index)=>
                            <li key={index} ><Link to="/convo">{convo}</Link></li>
                        )}
                    </ul>
                </div>
            </>
        )
    }
}

export default HomePage;