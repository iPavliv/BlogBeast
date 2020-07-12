import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';

import PostList from '../main/postList';


class Follow extends Component {

    state = {
        is_following: this.props.is_following,
    }

    followUser = () => {
        const values = queryString.parse(this.props.location.search);
        const userId = {
          "user_id": values.user_id,
        };

        const url = `${BACK_APP}/i_follow`;

        axios.post(url, userId, { withCredentials:true, crossDomain: true }
        ).then( respPost => {
            axios.get(url, { params:userId, crossDomain:true, withCredentials:true }
            ).then( respGet => {
                this.setState({is_following: !this.state.is_following});
            });
        });
    }

    render() {
        const imgSrc = this.state.is_following ? "./liked.png" : "./like.png";
        const label = this.state.is_following ? "Unfollow" : "Follow";

        return (
            <div className="align-profile">
                <label htmlFor="follow-btn" className='follow'>{label}</label>
                <img id="follow-btn" alt="To follow" className="follow" src="./like.png" onClick={this.followUser} />
            </div>
        );
    }
}

export default Follow;
