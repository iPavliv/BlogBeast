import React, { Component } from "react";

import StatItem from './statItem';


class StatList extends Component {
    render() {
        return (
            <div className="statistics-list">
                <h4  className="stat-item">{this.props.date}</h4>
                {this.props.statArr.map(stat => {
                    return (<StatItem key={stat.like_id}
                                      postHeader={stat.posts.header}
                                      postId={stat.posts.post_id}
                                      username={stat.users.username}
                                      userId={stat.users.user_id}
                    />);
                })}<br />
            </div>
        );
    }
}

export default StatList;
