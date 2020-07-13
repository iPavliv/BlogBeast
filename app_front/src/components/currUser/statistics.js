import React, { Component } from "react";
import axios from 'axios';

import { BACK_APP } from '../../constants';

import StatList from './statList';


class Statistics extends Component {

    state = {
        'stats': [{
            'date': '',
            'stat': [],
        }]
    }

    componentWillMount = () => {
        const getParams = {}
        const url = `${BACK_APP}/statistics`;

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const stats = resp.data;
            let statsPushed = [];
            for (let key of Object.keys(stats)) {
                statsPushed.push({date: key, stat: resp.data[key]});
            }
            this.setState({stats: statsPushed});
        });
    }

    render() {
        return (
            <div className='user-activity'>
                {this.state.stats.map(stat => {
                    const date = stat.date;
                    const statArr = stat.stat;
                    return (<StatList key={date}
                                      date={date}
                                      statArr={statArr}
                    />);
                })}
            </div>
        );
    }
}

export default Statistics;
