import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Switch } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

import App from './components/app';
import '../imports/startup/accounts-config';
import EmployeesList from './components/employees_list';
import Profile from './components/profile';
import Vote from './components/vote';

const routes = (
    <Router history={customHistory}>
        <App>
            <Switch>
                <Route exact path="/" component={EmployeesList} />

                <Route path="/users/:userId" component={Profile}></Route>
                <Route path="/skills/:skillId" component={Vote}></Route>
            </Switch>
        </App>
    </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.contain'));
});