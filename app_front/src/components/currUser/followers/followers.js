import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { BACK_APP } from '../../../constants';

import Follow from '../../user/follow';

import './followers.css';


class FollowersList extends Component {
    state = {
        "followers": [],
        "follows": [],
        "followersPageCount": 0,
        "followsPageCount": 0,
        "page": 1,
        "perPage": 20,
    }

    handlePageClick = (e) => {
        const page = e.selected + 1;

        this.setState({ page: page }, () => {
            this.receivedData()
        });

    };

    receivedData = () => {
        let getParams = {
            "users": "follower",
            "page": this.state.page,
            "per_page": this.state.perPage,
        }
        const url = `${BACK_APP}/followers`;

        axios.get(url, { params: getParams, crossDomain: true, withCredentials: true },
        ).then( resp => {
            const followers = resp.data.friends;
            const pageCount = resp.data.pages
            this.setState({followers: followers, followersPageCount: pageCount});
        });

        getParams = {
            "users": "follows",
            "page": this.state.page,
            "per_page": this.state.perPage,
        }

        axios.get(url, { params: getParams, crossDomain: true, withCredentials: true },
        ).then( resp => {
            const follows = resp.data.friends;
            const pageCount = resp.data.pages
            this.setState({follows: follows, followersPageCount: pageCount});
        });
    }

    componentDidMount() {
        this.receivedData()
    }

    render() {
        const followersList = this.state.followers.map( user =>
            <li className="follower-item" key={user.user_id}>
                <Link className="user-link" to={`/user?user_id=${user.user_id}`}>{user.username}</Link>
            </li>
        );
        const followsList = this.state.follows.map( user =>
            <li className="follower-item" key={user.user_id}>
                <Link className="user-link" to={`/user?user_id=${user.user_id}`}>{user.username}</Link>&nbsp;
                <Follow userId={user.user_id}/>
            </li>
        );

        return (
            <div className="followers-list">
                <Tabs defaultActiveKey="followers" transition={false}>
                    <Tab eventKey="followers" title="Followers">
                        <ul>{followersList}</ul>
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.followersPageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </Tab>
                    <Tab eventKey="follows" title="I follow">
                        <ul>{followsList}</ul>
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.followsPageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default FollowersList;
