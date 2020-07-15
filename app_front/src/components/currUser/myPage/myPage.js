import React, { Component } from "react";

import MyPostList from './myPostList';
import PostCreate from '../../main/posts/createPost';


class MyPage extends Component {
    render() {
        return (
            <div className="Main">
                <div className="create-post-container">
                    <PostCreate />
                </div>
                <div className="post-list-container">
                    <MyPostList />
                </div>
            </div>
        );
    }
}

export default MyPage;
