import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import WebStore from '../../Store/WebStore';
import SocketConnect from '../../Store/SocketConnect';
import moment from 'moment';

import Chart from './TestChart';
import Feeder from './Feeder';

// import io from 'socket.io-client';

// const link = 'http://localhost:5000';
// const socket = io(link);
// console.log('hehehe ',socket);

export default class Monitoring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataLoaded: false,
            data: {
                label: [],
                suhu: [],
                humidity: [],
                airQ: [],
                waterLevel: {},
                foodLeve: {},
            },
            plainData: {
                last: '-',
                lastSuhu: '-',
                lastHumidity: '-',
                lastAirQ: '-',
            },
            status: 'Not Connected',
        };
        this.avail = true;
        // this.onConnect = this.onConnect.bind(this);
        this.schedule = this.schedule.bind(this);
        this.report = this.report.bind(this);
    }
    componentWillMount() {
        if (this.avail) {
            WebStore.checkRegis().then(resp => {
                if (!resp.data.statusRegis) {
                    return this.props.history.push(
                        '/dashboard/registration-board',
                    );
                }
            });
            SocketConnect.monitoringFrame(WebStore.getUsername());

            SocketConnect.on('newMonitoringData', () => {
                WebStore.getLastMonitorData().then(resp => {
                    this.addData(resp.data);
                    this.setState({
                        ...this.state,
                        status: 'Board Connected',
                    });
                });
            });
        }
    }
    componentWillUnmount() {
        this.avail = false;
        SocketConnect.disconnect();
    }
    componentDidMount() {
        this.avail = true;
        WebStore.getMonitorData().then(resp => {
            console.log(resp);
            if (resp.data.length !== 0) {
                const { suhu, label, humidity, airQ } = this.state.data;
                let { data } = this.state;
                const plainData = {
                    last: moment(resp.data[0].updatedAt).format('LLL'),
                    lastSuhu: resp.data[0].suhu,
                    lastHumidity: resp.data[0].humidity,
                    lastAirQ: resp.data[0].airQuality,
                };
                const dataRes = resp.data.reverse();

                dataRes.map(res => {
                    suhu.push(res.suhu);
                    label.push(moment(res.updatedAt).format('LLL'));
                    humidity.push(res.humidity);
                    airQ.push(res.airQuality);
                    return true;
                });

                data = {
                    suhu: suhu,
                    label: label,
                    humidity: humidity,
                    airQ: airQ,
                };
                this.setState({
                    isLoading: false,
                    data: data,
                    plainData: plainData,
                });
            }
        });
    }
    addData = rawData => {
        if (!this.state.isLoading) {
            var { data, plainData } = this.state;
            plainData = {
                last: moment(rawData.updatedAt).format('LLL'),
                lastSuhu: rawData.suhu,
                lastHumidity: rawData.humidity,
                lastAirQ: rawData.airQuality,
            };
            data.label.push(moment(rawData.updatedAt).format('LLL'));
            data.suhu.push(rawData.suhu);
            data.humidity.push(rawData.humidity);
            data.airQ.push(rawData.airQuality);
            data.suhu.shift();
            data.humidity.shift();
            data.airQ.shift();
            data.label.shift();

            console.log(data);

            this.setState({
                ...this.state,
                data: data,
                plainData: plainData,
            });
        }
    };
    // onConnect = connect => {
    //     // // console.log('khhjkfkjdfskj');
    //     // socket.emit(
    //     //     'login',
    //     //     {
    //     //         uname: WebStore.getUsername(),
    //     //         // token: WebStore.getToken(),
    //     //     },
    //     //     () => {
    //     //         console.log('connected', socket);
    //     //     },
    //     // );
    //     // socket.on('pushupdate', data => {
    //     //     console.log(data);
    //     //     WebStore.getLastMonitorData().then(resp => {
    //     //         this.addData(resp.data);
    //     //         this.setState({
    //     //             ...this.state,
    //     //             status: 'Board Connected',
    //     //         });
    //     //     });
    //     // });
    // };
    schedule = () => {
        this.props.history.push('/dashboard/edit-monitoring');
    };

    report = () => {
        this.props.history.push('/dashboard/report-monitoring');
    };
    render() {
        const { plainData } = this.state;

        // socket.on('connect', this.onConnect, {
        //     reconnection: true,
        //     reconnectionDelay: 1000,
        //     reconnectionDelayMax: 5000,
        //     reconnectionAttempts: Infinity,
        // });

        return (
            <Row
                className="mb-5 mt-5"
                style={{ minHeight: 'calc(100% - 152px)' }}
            >
                <Col className="mx-auto">
                    <Link to="/dashboard">Home</Link> / Monitoring
                    <div className="text-center w-100">
                        <h3>Monitoring</h3>
                    </div>
                    <br />
                    <br />
                    <Row className="w-100">
                        <Col md={4} xs={12}>
                            <Card style={{ width: '338px' }}>
                                <div className="bg-blue">
                                    <CardBody className="bg-blue">
                                        {plainData.last}
                                    </CardBody>
                                    <Chart
                                        startColor={'#e74c3c'}
                                        endColor={'#3498db'}
                                        isLoading={this.state.isLoading}
                                        data={this.state.data.suhu}
                                        label={this.state.data.label}
                                        labels={'Suhu'}
                                    />
                                </div>
                                <CardBody>
                                    Temperature:
                                    <div className="w-100 text-center">
                                        {plainData.lastSuhu}° Celcius
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ width: '338px' }}>
                                <div className="bg-green">
                                    <CardBody>{plainData.last}</CardBody>
                                    <Chart
                                        startColor={'#3498db'}
                                        endColor={'#2ecc71'}
                                        isLoading={this.state.isLoading}
                                        data={this.state.data.humidity}
                                        label={this.state.data.label}
                                        labels={'Humidity'}
                                    />
                                </div>
                                <CardBody>
                                    Humidity
                                    <div className="w-100 text-center">
                                        {plainData.lastHumidity}%
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ width: '338px' }}>
                                <div className="bg-red">
                                    <CardBody>{plainData.last}</CardBody>
                                    <Chart
                                        startColor={'#f1c40f'}
                                        endColor={'#e74c3c'}
                                        isLoading={this.state.isLoading}
                                        data={this.state.data.airQ}
                                        label={this.state.data.label}
                                        labels={'Air Quality'}
                                    />
                                </div>
                                <CardBody>
                                    Air Quality
                                    <div className="w-100 text-center">
                                        {plainData.lastAirQ} PPM
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <div className="w-100 mt-3" />
                        <Col md={4} xs={12}>
                            <Card>
                                <CardBody>
                                    <h4>Food Level</h4>
                                </CardBody>
                                <Feeder status={'food'} />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card>
                                <CardBody>
                                    <h4>Water Level</h4>
                                </CardBody>
                                <Feeder status={'water'} />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card className="h-100">
                                <CardBody>
                                    <h4>Status</h4>
                                    <hr />
                                    Jam: {moment().format('LTS')}
                                    <br />
                                    Status: {this.state.status}
                                    <br />
                                    <br />
                                    <Button
                                        color="primary"
                                        size="md"
                                        onClick={this.schedule}
                                        block
                                    >
                                        Edit Schedule
                                    </Button>
                                    <Button
                                        color="success"
                                        size="md"
                                        onClick={this.report}
                                        block
                                        disabled
                                    >
                                        View All Data
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="md"
                                        onClick={() => this.props.logout(true)}
                                        block
                                    >
                                        Logout
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
