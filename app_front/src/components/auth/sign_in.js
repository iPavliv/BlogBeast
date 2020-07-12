import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { MAIN, BACK_APP } from '../../constants';

import './auth.css';


class SignIn extends Component {

    state = {
      'email': "",
      'password': ""
    };

    validateForm() {
        return this.state['email'].length > 0 && this.state['password'].length > 0;
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
        alert(resp.data.message);
        window.location = `${MAIN}` }
        ).catch( error => { alert(error.response.data.error) });
    }

    render() {
        return (
            <div className="SignIn">
                <div className="align-profile">
                    <label className="users" htmlFor="email">Email:</label>
                    <input id="email"
                        className="user-input"
                        type="email"
                        value={this.state['email']}
                        onChange={this.handleChange}
                    />
                    <label className="users" htmlFor="password">Password:</label>
                    <input id="password"
                        className="user-input"
                        value={this.state['password']}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <Link className="sign-in-link" to="/reset_password">I have forgotten my password :(</Link>
                <input
                    id="users-btn"
                    className="user-input"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Sign in'
                />
                <Link className="sign-in-link" to="/auth/sign_up">New user? Click here to sign up.</Link>
            </div>
        );
    }
}

export default SignIn;
