import React, { Component } from 'react';
import WebStore from '../../Store/WebStore';

import Header from '../../Components/Header/Header';
// import Loading from '../../Components/Loading/Loading';

import { Switch, Route, Redirect } from 'react-router';

import Overview from '../../Views/Dashboard/Overview';
import RegistrationBoard from '../../Views/RegistrationBoard/RegistrationBoard';

// import io from 'socket.io-client';

//Socket Link (Not Working on HTTPS Server cause its just forwarding from HTTPS NGINX to http nodejs server)
// const link = 'http://localhost:5000';
// const socket = io(link);

export default class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        const status = WebStore.checkLocalStorage();
        if (!status) {
            return this.props.history.push('/');
        }
        WebStore.checkUser().then(resp => {
            if (resp.msg === 'no_session') {
                return this.pushToLogin();
            } else {
                WebStore.setCurrentUser(resp.data);
                this.setDataUser(resp.data);
                //check status registrasi
            }
        });

        const current = WebStore.getCurrentUser();
        if (Object.keys(current).length !== 0) {
            this.setDataUser(current);
        }
        // socket.emit('login', {
        //     uname: WebStore.getUsername(),
        //     token: WebStore.getToken(),
        // });

        // socket.on('data_rec', data => {
        //     console.log(data);
        // });

        // socket.on('pushUpdate', data => {
        //     console.log(data);
        // });
    }
    pushToLogin = () => {
        WebStore.clearStorage(callback => {
            if (callback) {
                return this.props.history.push('/login');
            }
        });
    };
    setDataUser = data => {
        this.setState({
            data: data,
        });
    };

    // test = () => {
    //     console.log('clicked');
    //     socket.emit('send', {
    //         username: WebStore.getUsername(),
    //         msg: 'asdasdasd',
    //     });
    // };
    render() {
        return (
            <div
                className="container-fluid vh-100"
                style={{ background: '#ecf0f1' }}
            >
                <div className="container h-100">
                    <Header username={localStorage._username} />
                    <Switch>
                        <Route path="/dashboard" exact component={props => <Overview {...props} />} />
                        <Route path="/dashboard/registration-board" exact component={props => <RegistrationBoard {...props} />} />
                        <Redirect from="*" to="/404" />
                    </Switch>
                </div>
            </div>
        );
    }
}
