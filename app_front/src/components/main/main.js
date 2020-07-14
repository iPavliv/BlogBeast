import React, { Component } from "react";
import cookie from 'react-cookies';

import { MAIN } from '../../constants';

import PostList from './postList';
import PostCreate from './createPost';

import './main.css';


class Main extends Component {

    componentDidMount() {
        const authorized = cookie.load('authorized');
        if (!authorized) {
            window.location = `${MAIN}/auth/sign_in`;
        }
    }

    render() {
        return (
            <div className="Main">
                <div className="align-profile">
                    <PostCreate /><br />
                    <PostList />
                </div>
            </div>
        );
    }
}

export default Main;
