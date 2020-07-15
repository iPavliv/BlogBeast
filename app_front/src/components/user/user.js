import React, { Component } from "react";
import queryString from 'query-string';

import PostList from '../main/posts/postList';
import Follow from './follow';


class UserPage extends Component {

    state = {
        "userId": "",
    }

    componentWillMount = () => {
        const userId = queryString.parse(this.props.location.search).user_id;
        this.setState({userId: userId});
    }

    render() {
        return (
            <div className="Main">
                <Follow userId={this.state.userId}/>
                <div className="post-list-container">
                    <PostList userId={this.state.userId} />
                </div>
            </div>
        );
    }
}

export default UserPage;
