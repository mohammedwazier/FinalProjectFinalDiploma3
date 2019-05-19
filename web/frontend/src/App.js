import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';

import Login from './Routes/Index/Login';
import Register from './Routes/Index/Register';
import Dashboard from './Routes/Dashboard/Dashboard';
import NoMatch from './Views/NoMatch/NoMatch';

import WebStore from './Store/WebStore';

import './App.css';

export default class App extends Component {
    componentWillMount() {
        WebStore.on('NOTIFICATION', () => {
            var data = WebStore.getNotif();
            this.notify(data.text, data.color);
        });
    }
    notify(notify_info, color) {
        var type = color;
        // type = "primary";
        // type = "success";
        // type = "danger";
        // type = "warning";
        // type = "info";

        var options = {};
        options = {
            place: 'tc',
            message: (
                <div className="text-center">
                    <div>{notify_info}</div>
                </div>
            ),
            type: type,
            // icon: 'icon-rocket',
            autoDismiss: 7,
        };
        this.refs.notificationAlert.notificationAlert(options);
    }

    render() {
        return (
            <>
                <NotificationAlert ref="notificationAlert" />
                <Switch>
                    <Route
                        path={'/'}
                        exact
                        component={props => <Login {...props} />}
                    />
                    <Route
                        path={'/login'}
                        exact
                        component={props => <Login {...props} status="login" />}
                    />
                    <Route
                        path={'/register'}
                        exact
                        component={props => (
                            <Register {...props} status="register" />
                        )}
                    />

                    <Route path={'/dashboard'} component={Dashboard} />

                    <Route path={'/404'} exact component={() => <NoMatch />} />
                    <Redirect from="*" to="/404" />
                </Switch>
            </>
        );
    }
}
