import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

class ResetPassword extends Component {
    state = {
      'email': ""
    };

    validateForm() {
        return this.state['email'].length > 0;
    }

    validate = () =>  {
        let emailValid = true;

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailValid = false;
            // eslint-disable-next-line no-undef
            email.setCustomValidity("Invalid email.");
        } else {
            // eslint-disable-next-line no-undef
            email.setCustomValidity("");
        }

        if (!emailValid) return false;

        return true;
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
            const emailData = {
                "email": this.state.email
            };

            const url = `${BACK_APP}/reset_password`;

            axios.post(url, emailData, { withCredentials:true, crossDomain: true }
            ).then( response => {
                alert(response.data.message);
                this.props.history.push("/auth/sign_in");
            }).catch( error => {
                alert(error.response.data.error);
            });
        }
    }

    render() {
        return (
            <div className="ResetPassword">
                <div>
                    <label className="users" htmlFor="email">Enter your email:</label><br />
                    <input id="email"
                        className="user-input"
                        type="email"
                        onChange={this.handleChange}
                    />
                </div>
                <input
                    id="users-btn"
                    className="user-input"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.handleSubmit}
                    value='Send reset request'
                />
            </div>
        );
    }
}

export default ResetPassword;
