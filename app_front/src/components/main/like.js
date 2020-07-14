import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

import './post.css';


class Like extends Component {

    state = {
        isLiked: this.props.isLiked,
        likeCount: this.props.likeCount,
    }

    likePost = () => {
        const postId = {
            "post_id": this.props.postId,
        };

        const url = `${BACK_APP}/like`;

        axios.post(url, postId, { withCredentials:true, crossDomain: true }
        ).then( respPost => {
            axios.get(url, { params:postId, crossDomain:true, withCredentials:true }
            ).then( respGet => {
                this.setState({likeCount: respGet.data, isLiked: !this.state.isLiked});
            });
        });
    }

    render() {
        const imgSrc = this.state.isLiked ? "./liked.jpg" : "./like.png";
        return (
            <div className="like-container">
                <label htmlFor="like-btn" className="like-post">{this.state.likeCount}</label>
                <img id="like-btn" alt="Like Button" className="like-post" src={imgSrc} onClick={this.likePost} />
            </div>
        );
    }
}

export default Like;
