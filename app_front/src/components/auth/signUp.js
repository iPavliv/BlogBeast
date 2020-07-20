import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { MAIN, BACK_APP } from '../../constants';

import './auth.css';


class SignUp extends Component {

    state = {
        "username": "",
        "email": "",
        "password": "",
        "password2": "",
    };

    validateForm() {
        return this.state["username"].length && this.state["email"].length
            && this.state["password"].length && this.state["password2"].length;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validate = () => {
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const password2 = this.state.password2;

        let usernameValid = (username.match(/^[A-Za-z][A-Za-z0-9._]*$/) && username.length > 3) ? true : false;

        let emailValid = (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ? true : false;

        let passwordValid = (password.length > 4) ? true : false;

        let password2Valid = (password === password2) ? true : false;

        return usernameValid && emailValid && passwordValid && password2Valid;
    }

    handleSubmit = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        const isValid = this.validate();
        if (!isValid) {
            alert("Invalid input! Please, check you filled fields right");
            return;
        }

        const user = {
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password,
          "password2": this.state.password2,
        };

        const url = `${BACK_APP}/sign_up`;

        axios.post(url, user, { withCredentials: true }
        ).then( response => {
            alert(response.data.message);
            window.location(`${MAIN}/auth/sign_in`);
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="SignUp">
                <div className="align-center">
                    <label className="auth" htmlFor="username">Username:</label>
                    <input id="username"
                        className="auth-input"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label className="auth" htmlFor="email">Email:</label>
                    <input id="email"
                        className="auth-input"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label className="auth" htmlFor="password">Password:</label>
                    <input id="password"
                        className="auth-input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <label className="auth" htmlFor="password2">Repeat password:</label>
                    <input id="password2"
                        className="auth-input"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <input
                        id="auth-btn"
                        className="auth-input"
                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value="Sign Up"
                    />
                    <Link className="auth-link" to="/auth/sign_in">Already signed up? Click here to sign in.</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
