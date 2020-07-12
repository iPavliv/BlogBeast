import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

import './post.css';


class Like extends Component {

    state = {
        is_liked: this.props.is_liked,
        like_count: this.props.like_count,
    }

    likePost = () => {
        const post_id = {
          "post_id": this.props.post_id,
        };

        const url = `${BACK_APP}/like`;

        axios.post(url, post_id, { withCredentials:true, crossDomain: true }
        ).then( respPost => {
            axios.get(url, { params:post_id, crossDomain:true, withCredentials:true }
            ).then( respGet => {
                this.setState({like_count: respGet.data, is_liked: !this.state.is_liked});
            });
        });
    }

    render() {
        const imgSrc = this.state.is_liked ? "./liked.jpg" : "./like.png";
        return (
            <div className="like-container">
                <label htmlFor="like-btn" className='like-post'>{this.state.like_count}</label>
                <img id="like-btn" alt="Like Button" className="like-post" src={imgSrc} onClick={this.likePost} />
            </div>
        );
    }
}

export default Like;
