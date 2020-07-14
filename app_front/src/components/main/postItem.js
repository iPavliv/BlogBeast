import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from './like';

import './post.css';


class PostItem extends Component {
    render() {
        return (
            <div className='post-item'>
                <h4>{this.props.header}</h4>
                <h6>{this.props.postDate} by&nbsp;
                <Link className='post-link' to={`/user?user_id=${this.props.authorId}`}>{this.props.author}</Link></h6>
                <p className='post-text'>{this.props.postText}</p>
                <Like postId={this.props.postId} likeCount={this.props.likeCount} isLiked={this.props.isLiked}/>
            </div>
        );
    }
}

export default PostItem;
