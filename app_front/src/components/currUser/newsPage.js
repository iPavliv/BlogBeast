import React, { Component } from "react";

import NewsList from './newsList';


class NewsPage extends Component {
    render() {
        return (
            <div className="Main">
                <div className="align-profile">
                    <NewsList />
                </div>
            </div>
        );
    }
}

export default NewsPage;
