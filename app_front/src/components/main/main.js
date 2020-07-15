import React, { Component } from "react";
import cookie from 'react-cookies';

import { MAIN } from '../../constants';

import PostList from './posts/postList';
import PostCreate from './posts/createPost';

import './main.css';


class Main extends Component {

    componentDidMount() {
        const authorized = cookie.load("authorized");
        if (!authorized) {
            window.location = `${MAIN}/auth/sign_in`;
        }
    }

    render() {
        return (
            <div className="Main">
                <div className="create-post-container">
                    <PostCreate />
                </div>
                <div className="post-list-container">
                    <PostList />
                </div>
            </div>
        );
    }
}

export default Main;
