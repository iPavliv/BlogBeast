import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

import MyPostItem from './myPostItem';


class MyPostList extends Component {

    state = {
      'page': "",
      'per_page': "",
      'posts': [],
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentWillMount = () => {

        let getParams = {
            "page": this.state.page,
            "per_page": this.state.per_page,
            "user_id": "current",
        };

        let url = `${BACK_APP}/posts`;

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const posts = resp.data;
            this.setState({posts: posts});}
        );
    }

    render() {
        return (
            <div className='post-list'>
                <div>
                    {this.state.posts.map(post => {
                        const username = post.users.username;
                        const user_id = post.users.user_id;
                        return (<div>
                                <MyPostItem key={post.post_id}
                                            post_id={post.post_id}
                                            header={post.header}
                                            post_date={post.post_date}
                                            post_text={post.post_text}
                                            author={username}
                                            author_id={user_id}
                                            like_count={post.like_count}
                                            is_liked={post.liked_by_curr_user}
                        /><hr /></div>);
                    })}
                </div>
            </div>
        );
    }
}

export default MyPostList;
