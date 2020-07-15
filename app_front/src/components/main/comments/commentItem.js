import React, { Component } from "react";
import { Link } from "react-router-dom";


class CommentItem extends Component {
    render() {
        return (
            <div className="comment-item">
                <h6>{this.props.commentDate} by&nbsp;
                <Link className="comment-link" to={`/user?user_id=${this.props.authorId}`}>
                {this.props.author}</Link></h6>
                <p className="comment-text">{this.props.commentText}</p>
            </div>
        );
    }
}

export default CommentItem;
