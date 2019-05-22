import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import WebStore from '../../Store/WebStore';
import Header from '../../Components/Header/Header';

import Overview from '../../Views/Dashboard/Overview';
import RegistrationBoard from '../../Views/RegistrationBoard/RegistrationBoard';
import Monitoring from '../../Views/Monitoring/Monitoring';
// import FeederSetting from '../../Views/Setting/FeederSetting';
import Schedule from '../../Views/Schedule/Schedule';
import Report from '../../Views/Report/Report';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
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
                console.log(resp)
                  // this.setDataUser(resp.data);
            }
        });

        const current = WebStore.getCurrentUser();
        if (Object.keys(current).length !== 0) {
            // this.setDataUser(current);
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
            // console.log(callback)
            if (callback) {
                return this.props.history.push('/login');
            }
        });
    };
    // setDataUser = async (data) => {
    //     await this.setState({
    //         data: data,
    //     });
    // };

     logout = (data) => {
          WebStore.logout().then(resp => {
              if(resp){
                  this.pushToLogin();
              }
          })
     }
    render() {
        return (
            <div
                className="container-fluid vh-100"
                
            >
                <div className="container h-100">
                    <Header username={localStorage._username} logout={this.logout} />
                    <Switch>
                        <Route path="/dashboard" exact component={props => <Overview {...props} />} />
                        <Route path="/dashboard/registration-board" exact component={props => <RegistrationBoard {...props} />} />
                        <Route path="/dashboard/monitoring" exact component={props => <Monitoring logout={this.logout} {...props} />} />
{/*                         <Route path="/dashboard/monitoring" exact component={Monitoring} /> */}
{/*                         <Route path="/dashboard/feeder-setting" exact component={props => <FeederSetting {...props} />} /> */}
                        <Route path="/dashboard/edit-monitoring" exact component={props => <Schedule {...props} />} />
                        <Route path="/dashboard/report-monitoring" exact component={props => <Report {...props} />} />
                        <Redirect from="*" to="/404" />
                    </Switch>
                </div>
            </div>
        );
    }
}
