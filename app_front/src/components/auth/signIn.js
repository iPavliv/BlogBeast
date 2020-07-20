import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";

import { MAIN, BACK_APP } from '../../constants';

import './auth.css';


class SignIn extends Component {

    state = {
      "email": "",
      "password": ""
    };

    validateForm() {
        return this.state.email.length && this.state.password.length;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {

        const user = {
            "email": this.state.email,
            "password": this.state.password
        };

        const url = `${BACK_APP}/sign_in`;

        axios.post(url, user, { withCredentials:true, crossDomain: true }
        ).then( resp => {
            cookie.save("authorized", true, { path: "/" });
            window.location = `${MAIN}`; }
        ).catch( error => { alert(error.response.data.error) });
    }

    render() {
        return (
            <div className="SignIn">
                <div className="align-center">
                    <label className="auth" htmlFor="email">Email:</label>
                    <input id="email"
                        className="auth-input"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <label className="auth" htmlFor="password">Password:</label>
                    <input id="password"
                        className="auth-input"
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <Link className="auth-link" to="/reset_password">I have forgotten my password :(</Link>
                <input
                    id="auth-btn"
                    className="auth-input"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value="Sign in"
                />
                <Link className="auth-link" to="/auth/sign_up">New user? Click here to sign up.</Link>
            </div>
        );
    }
}

export default SignIn;
