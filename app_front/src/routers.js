import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Header from './components/header/header';
import SignIn from './components/auth/sign_in';
import SignUp from './components/auth/sign_up';
import Main from './components/main/main';
import UserPage from './components/user/user';


const Routers = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className='container'>
                <Switch>
                    <Route path='/' exact component={Main}/>
                    <Route path='/auth/sign_in' component={SignIn}/>
                    <Route path='/auth/sign_up' component={SignUp}/>
                    <Route path='/user' component={UserPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
