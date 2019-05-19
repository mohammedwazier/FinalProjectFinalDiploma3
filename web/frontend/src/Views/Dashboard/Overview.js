import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import WebStore from '../../Store/WebStore';

import Monitor from '../../Assets/image/006-home-8.svg';
import SetFeeder from '../../Assets/image/010-plug-4.svg';

import Loading from '../../Components/Loading/Loading';

export default class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }

    }
    componentWillMount() {
        WebStore.checkRegis().then(resp => {
            if(!resp.data.statusRegis){
                return this.props.history.push('/dashboard/registration-board');
            }else{
                this.setState({
                    isLoading: false
                })
            }
        })
    }
    render() {
        const { isLoading } = this.state;
        if(isLoading){
            return(
                <Loading />
                )
        }else{
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
                                    <Card>
                                        <CardBody className='p-5'>
                                            <img src={Monitor} alt="monitor" style={{width:'200px'}} />
                                            <br /><br />
                                            Monitoring
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <CardBody className='p-5'>
                                            <img src={SetFeeder} alt="monitor" style={{width:'200px'}} />
                                            <br /><br />
                                            Set Feeder
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
}
