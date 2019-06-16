import React, { Component } from 'react';
import {
    Button,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
    CustomInput,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import WebStore from '../../Store/WebStore';
import DatePick from '../../Components/DatePick/DatePick';

import io from 'socket.io-client';

import moment from 'moment';

const link = 'http://localhost:5000';
const socket = io(link);

export default class Schedule extends Component {
    constructor() {
        super();

        this.state = {
            data: '-',
            before: '-',
            disableHour: false,
            date: {},
            dateChange: {
                endDate: null,
                startDate: null,
            },
            system: true,
            statusMonitoring: '',
            loadData: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.monitoring = this.monitoring.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    onChange = e => {
        if (e.target.name !== 'data') {
            this.setState({
                ...this.state,
                [e.target.name]: !this.state[e.target.name],
            });
            return true;
        }
        this.setState({
            ...this.state,
            data: e.target.value,
        });
    };

    componentWillMount() {
        WebStore.getStatusMonitoringData().then(resp => {
            if (resp.msg === 'ok') {
                this.setState(
                    {
                        ...this.state,
                        data: resp.data.statusMonitoring,
                        before: resp.data.statusMonitoring,
                        date: {
                            startDate: resp.data.startDate,
                            endDate: resp.data.endDate,
                            startHour: resp.data.startHour,
                            endHour: resp.data.endHour,
                        },
                        system: resp.data.system,
                        statusMonitoring: resp.data.statusMonitoring,
                        loadData: true,
                    },
                    () => {
                        if (resp.data.endDate > new Date()) {
                            this.setState({
                                ...this.state,
                                date: {
                                    ...this.state.date,
                                    startDate: null,
                                    endDate: null,
                                },
                            });
                        }
                    },
                );
            }
        });
    }
    onSubmit = () => {
        // console.log(this.state.dateChange);
        if (
            this.state.dateChange.endDate === null ||
            this.state.dateChange.startDate === null
        ) {
            alert('Please input Start Date and End Date');
            return true;
        } else {
            // console.log('asdasdasdas');

            const sendData = {
                statusMonitoring: this.state.data,
                startDate: this.state.dateChange.startDate.toJSON(),
                endDate: this.state.dateChange.endDate.toJSON(),
            };
            WebStore.updateStatusMonitoringData(sendData).then(resp => {
                // console.log(resp);
                socket.emit('appDate', sendData);
                alert('sukses update Data');
                window.location.href = '/dashboard/monitoring';
            });
            // console.log(sendData);
        }
    };
    monitoring = e => {
        e.preventDefault();
        window.location.href = '/dashboard/monitoring';
    };
    updateDate = data => {
        this.setState({
            ...this.state,
            dateChange: {
                ...this.state.dateChange,
                [data.status]: data.data,
            },
        });
    };
    hour = () => {
        var ret = [];
        for (var i = 0; i <= 24; i++) {
            ret.push(
                <option key={i} value={i}>
                    {i}
                </option>,
            );
        }
        return ret;
    };
    statusDate = () => {
        if (this.state.loadData) {
            if (
                this.state.date.startDate !== null &&
                this.state.date.endDate !== null
            ) {
                // console.log(this.state.date);
                return (
                    <FormGroup>
                        <Label for="sd">Start Date</Label>
                        <Input
                            type="text"
                            name="startDate"
                            id="sd"
                            defaultValue={moment(
                                this.state.date.startDate,
                            ).format('LL')}
                            disabled
                        />

                        <Label for="sd">End Date</Label>
                        <Input
                            type="text"
                            name="endDate"
                            id="ed"
                            defaultValue={moment(
                                this.state.date.endDate,
                            ).format('LL')}
                            disabled
                        />
                    </FormGroup>
                );
            } else {
                return <div />;
            }
        }
    };
    render() {
        return (
            <Row
                className="mb-5 mt-5"
                style={{ minHeight: 'calc(100% - 152px)' }}
            >
                <Col className="mx-auto">
                    <Link to="/dashboard">Home</Link> /{' '}
                    <span
                        style={{ cursor: 'pointer', color: '#007bff' }}
                        onClick={this.monitoring}
                    >
                        Monitoring
                    </span>{' '}
                    / Edit Schedule
                    <div className="text-center w-100">
                        <h3>Edit Schedule Monitoring</h3>
                    </div>
                    <br />
                    <br />
                    <Row className="w-50 mx-auto">
                        <Col>
                            <Card>
                                <CardBody>
                                    {this.statusDate()}
                                    <FormGroup>
                                        <Label>Scheduled On/Off</Label>
                                        <DatePick
                                            updateDate={this.updateDate}
                                        />
                                        {/* <CustomInput type="switch" name="disableHour" onChange={this.onChange} checked={this.state.disableHour} id='disableHour' label="Hour" /> */}
                                        {/* <FormGroup>
															<Label for="Hour">Hour</Label>
															<Input type="select" name="startHour" id="Hour" disabled={!this.state.disableHour} onChange={({a}) => {console.log(a)}}>
																{this.hour()}
															</Input>
															<Label for="EndHour">End Hour</Label>
															<Input type="select" name="endHour" id="EndHour" disabled={!this.state.disableHour}>
																{this.hour()}
															</Input>
														</FormGroup> */}
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <Label>System Of/Off</Label>
                                        <CustomInput
                                            type="switch"
                                            name="system"
                                            onChange={this.onChange}
                                            checked={this.state.system}
                                            id="system"
                                            label="Manual On/Off System (On)"
                                        />
                                    </FormGroup>
                                    <hr />
                                    <FormGroup>
                                        <Label for="data">
                                            Edit Time BirdThings Board to Push
                                            data to Monitoring Server
                                        </Label>
                                        <Input
                                            type="select"
                                            onChange={this.onChange}
                                            value={this.state.data}
                                            name="data"
                                            id="data"
                                        >
                                            <option value={'-'}>-</option>
                                            <option value={'10'}>
                                                10 Seconds
                                            </option>
                                            <option value={'60'}>
                                                60 Seconds
                                            </option>
                                            <option value={'10'}>
                                                10 Minutes
                                            </option>
                                            <option value={'30'}>
                                                30 Minutes
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    <hr />
                                    <Button
                                        color="primary"
                                        onClick={this.onSubmit}
                                    >
                                        Save
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
