import React, { Component } from "react";
import axios from 'axios';

import PostList from './postList';


class Main extends Component {
    render() {
        return (
            <div className="Main">
                <div className="align-profile">
                    <PostList />
                </div>
            </div>
        );
    }
}

export default Main;
