import React, { Component } from "react";
import { Link } from "react-router-dom";


class UserView extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link className='user-link' to={`/my_page`}>My page</Link></li>
                    <li><Link className='user-link' to={`/followers_list`}>Followers</Link></li>
                    <li><Link className='user-link' to={`/news`}>News</Link></li>
                    <li><Link className='user-link' to={`/activity`}>My activity</Link></li>
                    <li><Link className='user-link' to={`/statistics`}>Statistics</Link></li>
                </ul>
            </div>
        );
    }
}

export default UserView;
