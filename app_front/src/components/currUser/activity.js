import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';


class Activity extends Component {

    state = {
        'lastLogin': '',
        'lastRequest': '',
    }

    componentWillMount = () => {
        const url = `${BACK_APP}/activity`;

        axios.get(url, { crossDomain:true, withCredentials:true },
        ).then( resp => {
            const activityInfo = resp.data;
            this.setState({lastLogin: activityInfo.last_login, lastRequest: activityInfo.last_request});
        });
    }

    render() {
        return (
            <div className='user-activity'>
                <p>Last time signed in: {this.state.lastLogin}</p>
                <p>Last request: {this.state.lastRequest}</p>
            </div>
        );
    }
}

export default Activity;
