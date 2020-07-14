import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from '../main/like';


class MyPostItem extends Component {
    render() {
        return (
            <div className='post-item'>
                <h4>{this.props.header}</h4>
                <h6>{this.props.post_date}</h6>
                <div className='post-edit-btn'>
                    <button className='follow' onClick={this.followUser}>&nbsp;Edit&nbsp;</button>
                    <button className='follow' onClick={this.followUser}>Delete</button>
                </div><br />
                <p className='post-text'>{this.props.post_text}</p>
                <Like post_id={this.props.post_id} like_count={this.props.like_count} is_liked={this.props.is_liked}/>
            </div>
        );
    }
}

export default MyPostItem;
