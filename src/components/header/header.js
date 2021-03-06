import React from 'react';
import './header.scss';
import {Link} from 'react-router-dom';




export default class Header extends React.Component {
    render() {
        return(
           <div className="header">
                <h1 className="header-logo">SuperHero Encyclopedia</h1>
                <ul className ="header-navbar">
                    <li className ="header-navbar-item">
                        <Link to="/super-heroes-react-app">List</Link>
                    </li>
                    <li className ="header-navbar-item">
                        <Link to="/super-heroes-react-app/search">Search</Link>
                    </li>
                    <li className ="header-navbar-item">
                        <Link to="/super-heroes-react-app/all/">All</Link>
                    </li>
                </ul>
           </div>
        )
    }
}