import React, { Component } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import qs from 'qs';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import { BACK_APP } from '../../../constants';

import StatList from './statList';

import './statistics.css';


axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => qs.stringify(params, {
    serializeDate: (date: Date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') });
  return config;
})


class Statistics extends Component {
    state = {
        "stats": [{
            "date": "",
            "stat": [],
        }],
        "dateRange": [new Date(), new Date()],
    }

    onChange = (dateRange) => {
        let dateFrom, dateTo;
        if (dateRange) {
            dateFrom = dateRange[0];
            dateTo = dateRange[1];
        } else {
            dateFrom = dateTo = new Date();
        }
        this.setState({dateRange: [dateFrom, dateTo]});

        const getParams = {
            "date_from": dateFrom,
            "date_to": dateTo,
        }
        const url = `${BACK_APP}/statistics`;

        axios.get(url, { params:getParams, crossDomain:true, withCredentials:true },
        ).then( resp => {
            const stats = resp.data;
            let statsPushed = [];
            for (let key of Object.keys(stats)) statsPushed.push({date: key, stat: resp.data[key]});
            this.setState({stats: statsPushed});
        });
    }

    render() {
        return (
            <div className="statistics">
                <div id="date-pickr">
                    <DateRangePicker
                        onChange={this.onChange}
                        value={this.state.dateRange}
                        format="dd.MM.y"
                        locale="en-EN"
                    />
                </div>
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
