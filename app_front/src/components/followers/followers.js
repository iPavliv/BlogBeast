import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';

import { BACK_APP } from '../../constants';

import Follow from '../user/follow';

import './followers.css';


class FollowersList extends Component {
    state = {
        'followers': [],
        'follows': [],
    }

    componentWillMount = () => {
        let getParams = { 'users': 'follow_me' }
        const url = `${BACK_APP}/followers`;

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const followers = resp.data;
            this.setState({followers: followers});
        });

        getParams = { 'users': 'i_follow' }

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const follows = resp.data;
            this.setState({follows: follows});
        });
    }

    render() {
        const followersList = this.state.followers.map( user =>
            <li key={user.user_id}>
                <Link className='user-link' to={`/user?user_id=${user.user_id}`}>{user.username}</Link>
            </li>
        );
        const followsList = this.state.follows.map( user =>
            <li key={user.user_id}>
                <Link className='user-link' to={`/user?user_id=${user.user_id}`}>{user.username}</Link>
                <Follow userId={user.user_id}/>
            </li>
        );

        return (
            <div className='followers-list'>
                <Tabs defaultActiveKey="followers" transition={false}>
                    <Tab eventKey="followers" title="Followers">
                        <ul>{followersList}</ul>
                    </Tab>
                    <Tab eventKey="follows" title="I follow">
                        <ul>{followsList}</ul>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default FollowersList;
