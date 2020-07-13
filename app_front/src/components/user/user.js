import React, { Component } from "react";
import queryString from 'query-string';

import PostList from '../main/postList';
import Follow from './follow';


class UserPage extends Component {
    checkFollowing = () => {
        return false;
    }

    render() {
        const values = queryString.parse(this.props.location.search);
        return (
            <div className="align-profile">
                <Follow is_following={this.checkFollowing} />
                <PostList user_id={values.user_id} />
            </div>
        );
    }
}

export default UserPage;
