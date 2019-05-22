import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import WebStore from '../../Store/WebStore';

import SimpleReport from './SimpleReport';

export default class Report extends Component {
	constructor(){
		super();

		this.state = {
			isLoading: true,
			data: {
				suhu: [],
				humidity: [],
				airQ: [],
				label: []
			}
		}
	}

	componentWillMount(){
		var { suhu, humidity, airQ, label } = this.state.data;
		WebStore.getAllMonitor()
		.then(res => {
			// console.log(res)
			res.data.map((data) => {
				suhu.push(data.suhu);
				humidity.push(data.humidity);
				airQ.push(data.airQuality);
				label.push(moment(data.updatedAt).format('LLL'));
				return true;
			})
		})
		var datas = {
	   				suhu: suhu,
	   				label: label, 
	   				humidity: humidity, 
	   				airQ: airQ
	   			}
		this.setState({
			...this.state,
			data: datas 
		}, () => {
			this.setState({
				...this.state,
				isLoading: false
			}, () => console.log(JSON.stringify(this.state.data)))
		})
	}

	render() {
		return (
			<Row
            	className="mb-5 mt-5"
                style={{ minHeight: 'calc(100% - 152px)' }}
            >
                <Col className="mx-auto">
					<Link to='/dashboard'>Home</Link> / <Link to='/dashboard/monitoring'>Monitoring</Link> / Report
                	<div className='text-center w-100'>
                		<h3>Report Monitoring</h3>
                	</div>
                	<br />
                	<br />
                	<Row className='w-100 mx-auto'>
                		<Col>
                			<Card className='mb-4'>
                				<CardBody>
                				Suhu
                					
                				</CardBody>
                				<SimpleReport startColor={'#e74c3c'} endColor={'#3498db'} isLoading={this.state.isLoading} data={this.state.data.suhu} label={this.state.data.label} labels={'Suhu'} />
                			</Card>

                			<Card className='mb-4'>
                				<CardBody>
                				Humidity
                					
                				</CardBody>
                				<SimpleReport startColor={'#3498db'} endColor={'#2ecc71'} isLoading={this.state.isLoading} data={this.state.data.humidity} label={this.state.data.label} labels={'Humidity'} />
                			</Card>

                			<Card className='mb-4'>
                				<CardBody>
                				Air Quality
                					
                				</CardBody>
                				<SimpleReport startColor={'#f1c40f'} endColor={'#e74c3c'} isLoading={this.state.isLoading} data={this.state.data.airQ} label={this.state.data.label} labels={'Air Quality'} />
                			</Card>
                		</Col>
                	</Row>
				</Col>
			</Row>
		);
	}
}
