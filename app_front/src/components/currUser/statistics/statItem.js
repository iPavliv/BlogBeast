import React, { Component } from "react";
import { Link } from "react-router-dom";


class StatItem extends Component {
    render() {
        return (
            <div className="stat-item">
                <h6>
                    <q>{this.props.postHeader}</q>&nbsp;liked by&nbsp;
                    <Link className="post-link" to={`/user?user_id=${this.props.userId}`}>
                        {this.props.username}</Link>
                </h6>
            </div>
        );
    }
}

export default StatItem;
