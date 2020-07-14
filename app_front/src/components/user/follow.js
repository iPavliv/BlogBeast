import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';


class Follow extends Component {

    state = {
        'isFollowing': '',
        'userId': ''
    }

    componentWillMount = () => {
        const userId = this.props.userId;
        const url = `${BACK_APP}/check_follower`;
        this.setState({userId: userId});

        axios.get(url, { params: {'user_id': userId}, crossDomain:true, withCredentials:true },
        ).then( resp => {
            this.setState({isFollowing: resp.data});
        });
    }

    followUser = () => {
        const userId = {
          "user_id": this.state.userId,
        };
        const url = `${BACK_APP}/followers`;

        axios.post(url, userId, { withCredentials:true, crossDomain: true }
        ).then( respPost => {
            this.setState({isFollowing: respPost.data});
        });
    }

    render() {
        const label = this.state.isFollowing ? "Unfollow" : "Follow";
        return (
            <div>
                <button htmlFor="follow-btn" className='follow' onClick={this.followUser}>{label}</button>
            </div>
        );
    }
}

export default Follow;
