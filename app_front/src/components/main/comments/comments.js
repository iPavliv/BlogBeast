import React, { Component } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { BACK_APP } from '../../../constants';

import CommentItem from './commentItem';

import './comments.css';


class Comments extends Component {
    state = {
        "commentText": "",
        "page": 1,
        "perPage": 3,
        "pageCount": 0,
        "comments": [],
        "postId": this.props.postId,
    }

    validateForm() {
        return this.state.commentText;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        const comment = {
            "comment_text": this.state.commentText,
            "post_id": this.state.postId,
        };

        const url = `${BACK_APP}/comment`;

        axios.post(url, comment, { withCredentials: true, crossDomain: true }
        ).then( () => {
            this.receivedData();
        });
    }

    handlePageClick = (e) => {
        const page = e.selected + 1;

        this.setState({ page: page }, () => {
            this.receivedData()
        });

    };

    receivedData = () => {

        let getParams = {
            "page": this.state.page,
            "per_page": this.state.perPage,
            "post_id": this.state.postId,
        };

        let url = `${BACK_APP}/comment`;

        axios.get(url, { params: getParams, crossDomain: true, withCredentials: true },
        ).then( resp => {
            const comments = resp.data.comments;
            const pageCount = resp.data.pages;
            this.setState({comments: comments, pageCount: pageCount, commentText: ""});
        });
    }

    componentDidMount() {
        this.receivedData();
    }

    render() {
        let pages = this.state.pageCount > 1;
        let pagination = pages ? <ReactPaginate
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
            activeClassName={"active"}/> : undefined;

        return (
            <div className="comment-container">
                <div className="comment-list-container">
                    <hr />
                    {this.state.comments.map(comment => {
                        const username = comment.users.username;
                        const userId = comment.users.user_id;
                        return (<div key={comment.comment_id}>
                            <CommentItem
                                commentId={comment.comment_id}
                                commentDate={comment.comment_date}
                                commentText={comment.comment_text}
                                author={username}
                                authorId={userId}
                        /><hr /></div>);
                    })}
                    <div className="paginate-item comment-pages">
                        {pagination}
                    </div>
                </div>
                <div className="create-comment">
                    <textarea id="commentText"
                              name="comment-text"
                              rows="2"
                              cols="50"
                              onChange={this.handleChange}
                              value={this.state.commentText}
                    />
                    <input id="comment-btn"
                           className="auth-input"
                           disabled={!this.validateForm()}
                           type="button"
                           onClick={this.handleSubmit}
                           value="Comment"
                    />
                </div>
            </div>
        );
    }
}

export default Comments;
