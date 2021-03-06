import React, {Component} from 'react';
import './LogIn.css';
import TennitContext from '../../../TennitContext';

/* 
The login component uses the same event handlers as the other popup components, but has a lot less information/state
and API requests to manage.
*/

class LogIn extends Component {
	static contextType = TennitContext;
    constructor(props){
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
        };
    };
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(div){
        this.wrapperRef = div;
    }

    handleClickOutside(e){
        if(this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.context.togglePopup('login');
        }
    }
    
    render(){
        return (
            <div className="popup">
                <div className="popup-inner" ref={this.setWrapperRef}>
                    
                    <button 
                        className="close-popup" 
                        onClick={e=>this.context.togglePopup('login')}>
                            &times;
                    </button>
                    <h3 className="banner-text header-two">Log In</h3>
                    <form
                        onSubmit={this.context.handleLogIn}
                        id="sign-up">

                        <div>
                            {this.context.error && <p className="error-text" >Error: {this.context.error}</p>}
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Email (john@email.com)</label>
                            <input 
                                name="email"
                                type="email"
                                placeholder="john@email.com"
                                onChange={this.context.handleInputChange}
                                required
                                />
                        </div>
                        <div className="form-item">
                            <label htmlFor="Password">Password (AAaa11!!)</label>
                            <input 
                                name="password"
                                type="password"  
                                placeholder="********"
                                onChange={this.context.handleInputChange}
                                required
                                />
                        </div>
                        <div className="button-wrap">
                            <button 
                                className="rounded-button"
                                type="submit">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;