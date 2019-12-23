import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import STORE from '../STORE';

export const logDivs = {
    
}

export default class TennitContext extends Component {
    render() {
        return(
            <>
                {this.props.children}
            </>
        )
    }
}