import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';

import { MAIN, BACK_APP } from '../../constants';

class SetNewPassword extends Component {
    state = {
      'password': "",
      'password2': ""
    };

    validateForm() {
        return this.state['password'].length && this.state['password2'].length;
    }

    validate = () => {
        let passwordValid = true;
        let password2Valid = true;

        if (this.state.password.length < 4) {
            passwordValid = false;
            // eslint-disable-next-line no-undef
            password.setCustomValidity("Password is too short.");
        } else {
            // eslint-disable-next-line no-undef
            password.setCustomValidity("");
        }
        if (this.state.password !== this.state.password2) {
            password2Valid = false;
            // eslint-disable-next-line no-undef
            password2.setCustomValidity("Repeat password correctly.");
        } else {
            // eslint-disable-next-line no-undef
            password2.setCustomValidity("");
        }

        if (passwordValid && password2Valid) return true;

        return false;
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
        if (isValid) {
            const newPassword = {
                "password": this.state.password
            };

            const values = queryString.parse(this.props.location.search);
            const url = `${BACK_APP}/reset_password?token=${values.token}`;
            const redir = `${MAIN}/auth/sign_in`;


            axios.put(url, newPassword, { withCredentials:true, crossDomain: true }
            ).then( response => {
                alert(response.data.message);
                window.location = redir;
            }).catch( error => {
                alert(error.response.data.error);
            });
        }
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="align-profile">
                    <label className="users-passwd" htmlFor="password">Password:</label>
                    <input id="password"
                        className="user-input"
                        onChange={this.handleChange}
                        type="password"
                    /><br />
                    <label className="users-passwd" htmlFor="password2">Submit password:</label>
                    <input id="password2"
                        className="user-input"
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <input
                    className="user-input"
                    id="users-btn"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Set new password'
                />
            </div>
        );
    }
}

export default SetNewPassword;
