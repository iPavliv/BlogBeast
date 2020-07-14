import React, { Component } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { BACK_APP } from '../../constants';

import PostItem from './postItem';


class PostList extends Component {

    state = {
        'page': 1,
        'perPage': 5,
        'posts': [],
        'pageCount': 0,
    };

    handlePageClick = (e) => {
        const page = e.selected + 1;

        this.setState({ page: page }, () => {
            this.receivedData()
        });

    };

    receivedData = () => {

        let getParams = {
          'page': this.state.page,
          'per_page': this.state.perPage,
        };

        let url = `${BACK_APP}/`;

        if (this.props.user_id) {
            url = `${BACK_APP}/posts`;
            getParams.user_id = this.props.user_id;
        }

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const posts = resp.data.posts;
            const pageCount = resp.data.pages;
            this.setState({posts: posts, pageCount: pageCount});
            console.log(this.state.posts);}
        );
    }

    componentDidMount() {
        this.receivedData()
    }

    render() {
        return (
            <div className='post-list'>
                <div>
                    {this.state.posts.map(post => {
                        const username = post.users.username;
                        const user_id = post.users.user_id;
                        return (<div key={post.post_id}>
                            <PostItem
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
                    <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </div>
        );
    }
}

export default PostList;
