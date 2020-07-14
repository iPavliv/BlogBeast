import React, { Component } from "react";

import MyPostList from './myPostList';
import PostCreate from '../main/createPost';


class MyPage extends Component {
    render() {
        return (
            <div className="Main">
                <div className="align-profile">
                    <PostCreate /><br />
                    <MyPostList />
                </div>
            </div>
        );
    }
}

export default MyPage;
