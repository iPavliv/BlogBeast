import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

import PostItem from './postItem';


class PostList extends Component {

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
        };

        let url = `${BACK_APP}/`;

        if (this.props.user_id) {
            url = `${BACK_APP}/posts`;
            getParams.user_id = this.props.user_id;
        }

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const posts = resp.data;
            this.setState({posts: posts});
            console.log(this.state.posts);}
        );
    }

    render() {
        return (
            <div className='form-list'>
                <div>
                    {this.state.posts.map(post => {
                        const username = post.users.username;
                        const user_id = post.users.user_id;
                        return (<PostItem post_id={post.post_id}
                                          header={post.header}
                                          post_date={post.post_date}
                                          post_text={post.post_text}
                                          author={username}
                                          author_id={user_id}
                                          like_count={post.like_count}
                                          is_liked={post.liked_by_curr_user}
                        />);
                    })}
                </div>
            </div>
        );
    }
}

export default PostList;
