import React from 'react'
import './ConvoPage.css'
import {Link, Redirect} from 'react-router-dom'
import TokenService from '../../../Services/token-service'
import TennitContext from '../../../TennitContext'
import TennitApiService from '../../../Services/tennit-api-service'

/* 
The ConvoPage component is responsible for rendering a basic chat page with a limited amount of comments
in a tracked conversation, as well as correctly rendering the display picture and name
of the account that the user is conversing with. Included here is basic functions to refresh any displayed
errors upon correctly mounting, some state form editting, update the context to display current and
accurate information, and basic functions to use the API to read/make comments, correctly display information
from the point of view of the user signed in and unmatch with the other user.
*/

class ConvoPage extends React.Component { 
    static contextType = TennitContext
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            user1_listing: {},
            user2_listing: {},
            textInput: '',
            error: null
        }
    }
    
    componentDidMount(){ 
        this.setState({ error: null })
        this.context.getLoggedUser()
        this.requestComments()
    }

    handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
	
		this.setState({
			  [name]: value
		})
	}

    requestComments = () => {
        TennitApiService.requestComments(this.props.match.params.match_id)
            .then(res => {
                this.setState({
                    comments: res.reverse(),
                    error: null
                })
                this.assignMatchUsers()
            })
            .catch(err=>{
                console.error(err.error.message)
                this.setState({
                    error: err.error.message
                })
            })
    }

    assignMatchUsers = () => {
        TennitApiService.requestMatch(this.props.match.params.match_id)
            .then(matchData =>{
                this.setState({
                    user1_listing: matchData.user1,
                    user2_listing: matchData.user2,
                    error: null
                })
            })
            .catch(err=>{
                console.error(err.error.message)
                this.setState({
                    error: err.error.message
                })
            })
    }

    handleCommentSubmit = (e) => {
        e.preventDefault()
        const newComment = {
            match_id: this.props.match.params.match_id,
            user_id: TokenService.parseJwt(TokenService.getAuthToken()).id,
            comment: this.state.textInput
        }
        TennitApiService.submitComments(newComment)
            .then(newCommentChain=>{
                this.setState({
                    comments: newCommentChain.reverse(),
                    textInput: '',
                    error: null
                })
            })
            .catch(err=>{
                console.error(err.error.message)
                this.setState({
                    error: err.error.message
                })
            })
    }

    deleteMatch = (e) => {
        e.preventDefault()
        TennitApiService.deleteMatch(this.props.match.params.match_id)
            .then(()=>{
                this.setState({
                    error: null
                })
                this.context.loggedUserMatches.filter(matches=> matches.id !== this.props.match.params.match_id)
                this.props.history.push('/')
            })
            .catch(err=>{
                console.error(err)
                this.setState({
                    error: `Couldn't delete match at this time. Try again later.`
                })
            })
    }

    render(){
        return(
            <>
                {this.context.loggedUserMatches.some(match => match.id.toString() === this.props.match.params.match_id.toString()) ?
                    null
                    : <Redirect to="/home"/>
                }
                {this.state.error ? 
                
                <div className="content-container">
                    <div>
                        {this.state.error && <p className="error-text" >Error: {this.state.error}</p>}
                    </div>
                </div>

                :

                <div className="content-container">
                    <div className="convo-page-div">
                        <h1 className="banner-text header-one">
                            Chat between 
                                <Link className="banner-text" to={`/profile/${this.state.user1_listing.user_id}`}>
                                    {' '+this.state.user1_listing.firstname+' '}
                                </Link>
                                and
                                <Link className="banner-text" to={`/profile/${this.state.user2_listing.user_id}`}>
                                    {' '+this.state.user2_listing.firstname+' '}
                                </Link>
                        </h1>
                    </div>
                    <div className="pic-wrap">            
                        <img className='pic' src={this.state.user2_listing.image} alt="display other users pic" />              
                    </div>
                    


                    <div className="comment-container">

                        <form onSubmit={e=>this.handleCommentSubmit(e)}>
                            <textarea 
                                className="comment-textarea" 
                                type="text"
                                onChange={e=>this.handleInputChange(e)} 
                                id="textInput"
                                name="textInput"
                                value={this.state.textInput}
                                placeholder="">
                            </textarea>
                            <button 
                                className="circle-button inline-button"
                                type="submit">
                                    >
                            </button>
                        </form>

                        <ul className="comment-ul">
                            {this.state.comments.slice(0,10).map((comment, index)=>
                                <li className="comment-li" key={index}>
                                    <div className="textbubble">
                                        <p className="comment-text">
                                            <b>
                                                {(comment.user_id === this.state.user1_listing.user_id)
                                                    ? this.state.user1_listing.firstname
                                                    : this.state.user2_listing.firstname
                                                }
                                            </b>
                                            : {comment.comment}
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <button className="rounded-button" onClick={this.deleteMatch}>Delete Match?</button>
                    </div>
                </div>
                }
            </>
        )
    }
}

export default ConvoPage