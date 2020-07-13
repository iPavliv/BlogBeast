import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';

import { BACK_APP } from '../../constants';


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
            this.setState({is_following: !this.state.is_following});
        });
    }

    render() {
        const label = this.state.is_following ? "Unfollow" : "Follow";
        return (
            <div className="align-profile">
                <button htmlFor="follow-btn" className='follow' onClick={this.followUser}>{label}</button>
            </div>
        );
    }
}

export default Follow;
