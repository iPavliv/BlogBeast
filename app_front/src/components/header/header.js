import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";

import { MAIN, BACK_APP } from '../../constants';

import './header.css';

class Header extends Component {

    state = {
        element1: <Link className="nav-link nav-text" to="/auth/sign_up">Sign up</Link>,
        element2: <Link className="nav-link nav-text" to="/auth/sign_in">Sign in</Link>,
        element3: undefined
    };

    signOut = () => {
        const url = `${BACK_APP}/sign_out`;
        axios.post(url,  { withCredentials:true }
        ).then( () => {
            cookie.remove('session', { path: '/' });
            window.location = `${MAIN}/auth/sign_in`;
        });
    }

    componentWillMount() {
        if (cookie.load("session")){
            this.setState({
                element1: undefined,
                element2: undefined,
                element3: <Link className="nav-link nav-text" to="/auth/sign_out">Sign out</Link>,
            });
        } else {
            this.setState({
                element1: <Link className="nav-link nav-text" to="/auth/sign_up">Sign up</Link>,
                element2: <Link className="nav-link nav-text" to="/auth/sign_in">Sign in</Link>,
                element3: undefined,
            });
        }
    }

    render() {
        return (
            <div className="header">
                <nav className='navbar fixed-top navbar-expand-lg'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <span className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="left-nav-items">
                    </div>
                    <div className='right-nav-items'>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                {this.state.element1}
                            </li>
                            <li className="nav-item active">
                                {this.state.element2}
                            </li>
                            <li className="nav-item active">
                                {this.state.element3}
                            </li>
                        </ul>
                    </div>
                    </span>
                </nav>
            </div>
        );
    }
}

export default Header;