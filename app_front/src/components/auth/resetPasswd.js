import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

class ResetPassword extends Component {
    state = {
        "email": ""
    };

    validateForm() {
        return this.state["email"].length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        const emailData = {
            "email": this.state.email
        };

        const url = `${BACK_APP}/reset_password`;

        axios.post(url, emailData, { withCredentials: true, crossDomain: true }
        ).then( response => {
            alert(response.data.message);
            this.props.history.push("/auth/sign_in");
        }).catch( error => {
            alert(error.response.data.error);
        });
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="align-center">
                    <label className="auth" htmlFor="email">Enter your email:</label>
                    <input id="email"
                        className="auth-input"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <input
                        id="auth-btn"
                        className="auth-input"
                        disabled={!this.validateForm()}
                        type="button"
                        onClick={this.handleSubmit}
                        value="Send reset request"
                    />
                </div>
            </div>
        );
    }
}

export default ResetPassword;
