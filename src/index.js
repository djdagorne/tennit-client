import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App/App';
import { TennitProvider } from './TennitContext';

ReactDOM.render(
    <BrowserRouter>
        <TennitProvider>
            <App /> 
        </TennitProvider>
    </BrowserRouter>, 
document.getElementById('root'));
