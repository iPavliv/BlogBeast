import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import { MAIN, BACK_APP } from '../../constants';

class SignOut extends Component {

    componentWillMount = () => {
        const url = `${BACK_APP}/sign_out`;
        axios.post(url,  { withCredentials:true }
        ).then( () => {
            cookie.remove("authorized", { path: "/" });
            window.location = `${MAIN}/auth/sign_in`;
        });
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default SignOut;
