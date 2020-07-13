import React, { Component } from "react";
import queryString from 'query-string';

import PostList from '../main/postList';
import Follow from './follow';


class UserPage extends Component {

    state = {
        'userId': '',
    }

    componentWillMount = () => {
        const userId = queryString.parse(this.props.location.search).user_id;
        this.setState({userId: userId});
    }

    render() {
        return (
            <div className="align-profile">
                <Follow userId={this.state.userId}/>
                <PostList user_id={this.state.userId} />
            </div>
        );
    }
}

export default UserPage;
