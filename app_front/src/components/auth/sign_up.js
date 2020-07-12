import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { MAIN, BACK_APP } from '../../constants';

import './auth.css';


class SignUp extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
    };

    validateForm() {
        return this.state['username'].length > 0 && this.state['email'].length > 0
            && this.state['password'].length > 0 && this.state['password2'].length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validate = () => {
        let usernameValid = true;
        let emailValid = true;
        let passwordValid = true;
        let password2Valid = true;

        if (!this.state.username.match(/^[A-Za-z/./_]+$/) ||
            this.state.username.length < 3) {
            usernameValid = false;
            usernameValid.setCustomValidity("Invalid value: is too short or contains not allowed symbols.");
        } else {
            usernameValid.setCustomValidity("");
        }

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailValid = false;
            emailValid.setCustomValidity("Invalid email.");
        } else {
            emailValid.setCustomValidity("");
        }

        if (this.state.password.length < 4) {
            passwordValid = false;
            passwordValid.setCustomValidity("Password is too short.");
        } else {
            passwordValid.setCustomValidity("");
        }

        if (this.state.password != this.state.password2) {
            password2Valid = false;
            password2Valid.setCustomValidity("Password does not match.");
        } else {
            password2Valid.setCustomValidity("");
        }

        if (usernameValid && emailValid && passwordValid && password2Valid) {
            return true;
        }

        return false;
    }

    handleSubmit = () => {

        const user = {
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password,
          "password2": this.state.password2,
        };

        const url = `${BACK_APP}/sign_up`;

        axios.post(url, user, { withCredentials:true }
        ).then( response => {
            alert(response.data.message);
            window.location(`${MAIN}/sign_in`);
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="SignUp">
                <div className="align-profile">
                    <label className="users" htmlFor="username">Username:</label>
                    <input id="username"
                        className="user-input"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="email">Email:</label>
                    <input id="email"
                        className="user-input"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="password">Password:</label>
                    <input id="password"
                        className="user-input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="password2">Repeat password:</label>
                    <input id="password2"
                        className="user-input"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <input
                    id="users-btn"
                    className="user-input"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Sign Up'
                />
                <Link className="sign-in-link" to="/auth/sign_in">Already signed up? Click here to sign in.</Link>
            </div>
        );
    }
}

export default SignUp;
