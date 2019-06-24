import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import WebStore from '../../Store/WebStore';

import Monitor from '../../Assets/image/006-home-8.svg';
import SetFeeder from '../../Assets/image/010-plug-4.svg';

// import Loading from '../../Components/Loading/Loading';

export default class Overview extends Component {
    constructor(props) {
        super(props);

        this.monitoring = this.monitoring.bind(this);
        this.feederSetting = this.feederSetting.bind(this);
    }
    componentWillMount() {
        WebStore.checkRegis().then(resp => {
            if (!resp.data.statusRegis) {
                return this.props.history.push('/dashboard/registration-board');
            }
        });
    }

    monitoring = e => {
        e.preventDefault();
        window.location.href = '/dashboard/monitoring';
        // return this.props.history.push('/dashboard/monitoring');
    };

    feederSetting = () => {
        return this.props.history.push('/dashboard/edit-monitoring');
    };
    render() {
        return (
            <Row
                className="align-items-center"
                style={{ height: 'calc(100% - 56px)' }}
            >
                <Col className="mx-auto d-flex justify-content-center">
                    <div className="text-center w-75">
                        <h4>
                            Hi,{' '}
                            <span className="text-capitalize">
                                {localStorage._username}
                            </span>
                        </h4>
                        Welcome to BirdThings Dashboard.
                        <br />
                        This is where the magic happens. Here you can work with
                        your Canaries Bird Cage,
                        <br />
                        like monitoring, set the feeder schedul and more.
                        <Row className="mt-4">
                            <Col>
                                <Card
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.monitoring}
                                >
                                    <CardBody className="p-5">
                                        <img
                                            src={Monitor}
                                            alt="monitor"
                                            style={{ width: '200px' }}
                                        />
                                        <br />
                                        <br />
                                        Monitoring
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.feederSetting}
                                >
                                    <CardBody className="p-5">
                                        <img
                                            src={SetFeeder}
                                            alt="monitor"
                                            style={{ width: '200px' }}
                                        />
                                        <br />
                                        <br />
                                        Setting
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}
