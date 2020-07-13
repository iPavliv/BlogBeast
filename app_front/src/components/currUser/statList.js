import React, { Component } from "react";

import StatItem from './statItem';


class StatList extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.date}</h4>
                {this.props.statArr.map(stat => {
                    return (<StatItem key={stat.like_id}
                                      postHeader={stat.posts.header}
                                      postId={stat.posts.post_id}
                                      username={stat.users.username}
                                      userId={stat.users.user_id}
                    />);
                })}
            </div>
        );
    }
}

export default StatList;
