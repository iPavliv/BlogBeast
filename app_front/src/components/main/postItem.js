import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from './like';

import './post.css';


class PostItem extends Component {
    render() {
        return (
            <div className='post-item'>
                <h4>{this.props.header}</h4>
                <h6>{this.props.post_date} by&nbsp;
                <Link className='post-link' to={`/user?user_id=${this.props.author_id}`}>{this.props.author}</Link></h6>
                <p className='post-text'>{this.props.post_text}</p>
                <Like post_id={this.props.post_id} like_count={this.props.like_count} is_liked={this.props.is_liked}/>
            </div>
        );
    }
}

export default PostItem;
