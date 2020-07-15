import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';

import { MAIN, BACK_APP } from '../../constants';

class SetNewPassword extends Component {
    state = {
        "password": "",
        "password2": ""
    };

    validateForm() {
        return this.state["password"].length && this.state["password2"].length;
    }

    validate = () => {
        const password = this.state.password;
        const password2 = this.state.password2;

        let passwordValid = (password.length < 4) ? true : false;
        let password2Valid = (password !== password2) ? true : false;

        return passwordValid && password2Valid;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        const isValid = this.validate();
        if (!isValid) {
            alert("Passwords should match!");
            return;
        }

        const newPassword = {
            "password": this.state.password
        };

        const values = queryString.parse(this.props.location.search);
        const url = `${BACK_APP}/reset_password?token=${values.token}`;
        const redir = `${MAIN}/auth/sign_in`;


        axios.put(url, newPassword, { withCredentials: true, crossDomain: true }
        ).then( response => {
            alert(response.data.message);
            window.location = redir;
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="align-center">
                    <label className="auth" htmlFor="password">Password:</label>
                    <input id="password"
                        className="auth-input"
                        onChange={this.handleChange}
                        type="password"
                    />
                    <label className="auth" htmlFor="password2">Submit password:</label>
                    <input id="password2"
                        className="auth-input"
                        onChange={this.handleChange}
                        type="password"
                    />
                    <input
                        className="auth-input"
                        id="auth-btn"
                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value="Set new password"
                    />
                </div>
            </div>
        );
    }
}

export default SetNewPassword;
