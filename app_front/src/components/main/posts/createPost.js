import React, { Component } from "react";
import axios from 'axios';

import { MAIN, BACK_APP } from '../../../constants';


class PostCreate extends Component {
    state = {
        "header": "",
        "postText": "",
        "defaultHeader": "Enter post header",
        "defaultPostText": "Enter post text...",
    }

    validateForm() {
        return this.state.header.length && this.state.postText.length &&
               this.state.header !== this.state.defaultHeader &&
               this.state.postText !== this.state.defaultPostText;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        const post_data = {
            "header": this.state.header,
            "post_text": this.state.postText,
        };

        const url = `${BACK_APP}/posts`;

        axios.post(url, post_data, { withCredentials: true, crossDomain: true }
        ).then( () => { window.location = `${MAIN}/my_page` }
        );
    }

    render() {
        return (
            <div className="create-post">
                <input id="header"
                       type="text"
                       defaultValue={this.state.defaultHeader}
                       onChange={this.handleChange}
                />
                <textarea id="postText"
                          name="post-text"
                          rows="4"
                          cols="50"
                          onChange={this.handleChange}
                          defaultValue={this.state.defaultPostText}
                />
                <input id="post-btn"
                       className="auth-input"
                       disabled={!this.validateForm()}
                       type="button"
                       onClick={this.handleSubmit}
                       value="Post"
                />
            </div>
        );
    }
}

export default PostCreate;
