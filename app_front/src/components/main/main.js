import React, { Component } from "react";

import PostList from './postList';
import PostCreate from './createPost';


class Main extends Component {
    render() {
        return (
            <div className="Main">
                <div className="align-profile">
                    <PostCreate />
                    <PostList />
                </div>
            </div>
        );
    }
}

export default Main;
