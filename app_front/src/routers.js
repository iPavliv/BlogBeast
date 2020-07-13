import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Header from './components/staticComponents/header';
import SignIn from './components/auth/sign_in';
import SignUp from './components/auth/sign_up';
import SignOut from './components/auth/sign_out';
import Main from './components/main/main';
import UserPage from './components/user/user';
import Activity from './components/currUser/activity';
import Statistics from './components/currUser/statistics';
import FollowersList from './components/followers/followers';


const Routers = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className='container'>
                <Switch>
                    <Route path='/' exact component={Main}/>
                    <Route path='/auth/sign_in' component={SignIn}/>
                    <Route path='/auth/sign_up' component={SignUp}/>
                    <Route path='/auth/sign_out' component={SignOut}/>
                    <Route path='/user' component={UserPage}/>
                    <Route path='/activity' component={Activity}/>
                    <Route path='/statistics' component={Statistics}/>
                    <Route path='/my_page' component={Statistics}/>
                    <Route path='/followers_list' component={FollowersList}/>
                    <Route path='/news' component={Statistics}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
