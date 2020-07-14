import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Header from './components/staticComponents/header';
import SignIn from './components/auth/sign_in';
import SignUp from './components/auth/sign_up';
import SignOut from './components/auth/sign_out';
import ResetPassword from './components/auth/resetPasswd';
import SetNewPassword from './components/auth/setNewPasswd';
import Main from './components/main/main';
import UserPage from './components/user/user';
import Activity from './components/currUser/activity';
import Statistics from './components/currUser/statistics/statistics';
import MyPage from './components/currUser/myPage/myPage';
import NewsPage from './components/currUser/newsPage';
import FollowersList from './components/currUser/followers/followers';


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
                    <Route path='/my_page' component={MyPage}/>
                    <Route path='/followers_list' component={FollowersList}/>
                    <Route path='/news' component={NewsPage}/>
                    <Route path='/reset_password' component={ResetPassword}/>
                    <Route path='/set_new_password' component={SetNewPassword}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
