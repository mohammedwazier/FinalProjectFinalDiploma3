import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import WebStore from '../../Store/WebStore';

export default class RegistrationBoard extends Component {
    constructor(){
        super();
        this.check = this.check.bind(this);
    }
	componentWillMount(){
		WebStore.checkRegis().then(resp => {
            // console.log(resp)
            if(resp.data.statusRegis){
                return this.props.history.push('/dashboard');
            }else{
            	console.log(resp);
            }
        })
	}
	check =() => {
		window.location.reload(true);
	}
    render() {
        return (
        	<Row
                    className="align-items-center"
                    style={{ height: 'calc(100% - 56px)' }}
                >
                    <Col className="mx-auto d-flex justify-content-center">
                        <Card>
                        	
                        	<CardBody>
                        		<h4>Tutorial How To Connect your Board to Application</h4>
                        		<hr/>
                        			1. Turn on your Board
                        			<br />
                        			2. Connect WiFi 'BidrThingsBoard'
                        			<br />
                        			3. Open Application BirdThings on your SmartPhone
                        			<br />
                        			3. Input your SSID and Password of your WiFi
                        			<br />
                        			4. Restart your Board
                        			<br />
                        			5. Waiting 5 Minutes to automatic configure
                        			<br />
                        			<Button onClick={this.check}> Check </Button>
                        	</CardBody>
                        </Card>
                </Col>
            </Row>
        	);
    }
}
