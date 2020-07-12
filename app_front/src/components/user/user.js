import React, { Component } from "react";
import queryString from 'query-string';

import PostList from '../main/postList';


class UserPage extends Component {
    render() {
        const values = queryString.parse(this.props.location.search);
        return (
            <div className="align-profile">
                <PostList user_id={values.user_id}/>
            </div>
        );
    }
}

export default UserPage;
