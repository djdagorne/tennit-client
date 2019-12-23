import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App/App.js';
import TennitContext from './Contexts/Context';

ReactDOM.render(
    <BrowserRouter>
        <TennitContext>
            <App /> 
        </TennitContext>
    </BrowserRouter>, 
    document.getElementById('root'));
