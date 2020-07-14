import React, { Component } from "react";
import axios from 'axios';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import { BACK_APP } from '../../../constants';

import StatList from './statList';

import './statistics.css';


class Statistics extends Component {
    state = {
        'stats': [{
            'date': '',
            'stat': [],
        }],
        'dateRange': [new Date(), new Date()],
    }

    onChange = (dateRange) => {
        if (dateRange) this.setState({dateRange: dateRange});
        else this.setState({dateRange: [new Date(), new Date()]});

        const getParams = {
            'date_from': this.state.dateRange[0],
            'date_to': this.state.dateRange[1],
        }
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
                <DateRangePicker
                    onChange={this.onChange}
                    value={this.state.dateRange}
                /><br />
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
