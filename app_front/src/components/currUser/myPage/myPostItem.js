import React, { Component } from "react";
import axios from 'axios';

import { MAIN, BACK_APP } from '../../../constants';

import Like from '../../main/like';
import Comments from '../../main/comments/comments';


class MyPostItem extends Component {
    state = {
        "postId": this.props.postId,
        "editPostText": "",
        "prevPostText": this.props.postText,
        "editInput": undefined,
        "editBtn": undefined,
        "editLabel": undefined,
        "closeEdit": undefined,
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        const post_data = {
            "post_id": this.state.postId,
            "post_text": this.state.editPostText,
        };

        const valid = this.state.editPostText.length && (this.state.editPostText !== this.state.prevPostText);

        if (!valid) {
            alert("Post text is empty or not changed.");
            return;
        }

        const url = `${BACK_APP}/posts`;

        axios.put(url, post_data, { withCredentials: true, crossDomain: true }
        ).then( (resp) => {
            alert(resp.data.message);
            window.location = `${MAIN}/my_page`;
        });
    }

    editText = () => {
        this.setState({
            editLabel: <label htmlFor="editPostText">Edit post text:</label>,
            editInput: <textarea
                id="editPostText"
                name="post-text"
                rows="4"
                cols="50"
                onChange={this.handleChange}
                defaultValue={this.state.prevPostText}
            />,
            editBtn: <input
                id="edit-post-btn"
                className="auth-input"
                type="button"
                onClick={this.handleSubmit}
                value="Save"
            />,
            closeEdit: <input
                id="edit-post-btn"
                type="button"
                className="auth-input"
                onClick={this.closeEditBtn}
                value="Discard"
            />,
        });
    }

    closeEditBtn = () => {
        this.setState({
            editLabel: undefined,
            editInput: undefined,
            editBtn: undefined,
            closeEdit: undefined,
            editPostText: this.state.prevPostText,
        });
    }

    deletePost = () => {
        // eslint-disable-next-line no-restricted-globals
        let conf = confirm("Are you sure you want to delete this post?");
        if (!conf) return;

        const url = `${BACK_APP}/posts`;

        axios.delete(url,  {data: {"post_id": this.state.postId, crossDomain: true }}
        ).then( (resp) => {
            alert(resp.data.message);
            window.location = `${MAIN}/my_page`;
        });
    }

    render() {
        return (
            <div className="post-item">
                <h4>{this.props.header}</h4>
                <h6>{this.props.postDate}</h6>
                <div className="post-delete-btn">
                    <input id="delete-btn"
                        className="auth-input"
                        type="button"
                        onClick={this.deletePost}
                        value="Delete"
                />
                </div><br />
                <p className="post-text" onClick={this.editText}>{this.props.postText}</p>
                <Like postId={this.props.postId} likeCount={this.props.likeCount} isLiked={this.props.isLiked}/>
                <div className="edit-post">
                    {this.state.editLabel}
                    {this.state.editInput}
                    <div className="edit-buttons">
                        {this.state.editBtn}
                        {this.state.closeEdit}
                    </div>
                </div>
                <Comments key={this.state.postId}
                    postId={this.state.postId}
                />
            </div>
        );
    }
}

export default MyPostItem;
