import React from 'react';
import './header.scss';




export default class Header extends React.Component {
    render() {
        return(
           <div className="header">
                <h1 className="header-logo">SuperHero Encyclopedia</h1>
                <ul className ="header-navbar">
                    <li className ="header-navbar-item">Character</li>
                    <li className ="header-navbar-item">Houses</li>
                    <li className ="header-navbar-item">Books</li>
                </ul>
           </div>
        )
    }
}