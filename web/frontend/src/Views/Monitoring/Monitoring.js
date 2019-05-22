import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import WebStore from '../../Store/WebStore';
import moment from 'moment';

import Chart from './TestChart';
import Feeder from './Feeder';

import io from 'socket.io-client';

const link = 'http://localhost:5000';
const socket = io(link);

export default class Monitoring extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			data: {
				label: [],
				suhu: [],
				humidity: [],
				airQ: [],
				waterLevel:{},
				foodLeve: {}
			},
			plainData: {
				last: '-',
				lastSuhu: '-',
				lastHumidity: '-',
				lastAirQ: '-',
			}
		}
		this.avail = true;
		this.onConnect = this.onConnect.bind(this);
	}
	componentWillMount(){
		if(this.avail){

		
		WebStore.checkRegis().then(resp => {
             if(!resp.data.statusRegis){
                 return this.props.history.push('/dashboard/registration-board');
             }
         })
		socket.on('connect', this.onConnect);
		}
		
	}
	componentWillUnmount(){
		this.avail = false;

		socket.emit('disconnect');
		this._emitter.removeAllListeners();
		console.log(this.avail);
	}
	componentDidMount(){
		this.avail = true;
		WebStore.getMonitorData().then(resp => {
			const { suhu, label, humidity, airQ} = this.state.data;
			let {data} = this.state;
			const plainData = {
			 	last: moment(resp.data[0].updatedAt).format('LLL'),
				lastSuhu: resp.data[0].suhu,
				lastHumidity: resp.data[0].humidity,
				lastAirQ: resp.data[0].airQuality
			 }
			const dataRes = resp.data.reverse();

			dataRes.map((res) => {
				suhu.push(res.suhu);
				label.push(moment(res.updatedAt).format('LLL'));
				humidity.push(res.humidity);
				airQ.push(res.airQuality);
				return true;
			})

			data = {
				suhu: suhu,
				label: label, 
				humidity: humidity, 
				airQ: airQ
			}
			this.setState({
				isLoading: false,
				data: data,
				plainData:plainData})
		})
	}
	addData = (rawData) => {
		 if(!this.state.isLoading){
			 var { data, plainData } = this.state;
			 plainData = {
			 	last: moment(rawData.updatedAt).format('LLL'),
			 	lastSuhu: rawData.suhu,
			 	lastHumidity: rawData.humidity,
			 	lastAirQ: rawData.airQuality
			 };
			 data.label.push(moment(rawData.updatedAt).format('LLL'));
			 data.suhu.push(rawData.suhu);
			 data.humidity.push(rawData.humidity);
			  data.airQ.push(rawData.airQuality);

			 console.log(data, plainData);

			 this.setState({
			 	...this.state,
			 	data: data,
			 	plainData: plainData
			 })
		}
	}
	onConnect = connect => {
		
		// 	console.log('khhjkfkjdfskj');
			socket.emit('login', {
				uname: WebStore.getUsername(),
				token: WebStore.getToken(),
			});

			socket.on('pushupdate', data => {
				WebStore.getLastMonitorData().then(resp => {
					this.addData(resp.data);
				})
			})
		// }
		
	}
	render() {
		const { plainData } = this.state;

		if(!this.state.isLoading){
			console.log('here');
		}

		return (
			<Row
            	className="mb-5 mt-5"
                style={{ minHeight: 'calc(100% - 56px)' }}
            >
                <Col className="mx-auto">
                <Link to='/dashboard'>Home</Link> / Monitoring
                	<div className='text-center w-100'>
                		<h3>Monitoring</h3>
                	</div>
                <br />
                <br />
                <Row className='w-100'>
                	<Col>
                		<Card style={{width:'338px'}}>
                			<div className='bg-blue'>
                			<CardBody className='bg-blue'>
                				{plainData.last}
                			</CardBody>
                			<Chart startColor={'#e74c3c'} endColor={'#3498db'} isLoading={this.state.isLoading} data={this.state.data.suhu} label={this.state.data.label} labels={'Suhu'} />
                			</div>
                			<CardBody>
                				Temperature: 
                				<div className='w-100 text-center'>
                					{plainData.lastSuhu} Degree
                				</div>
                			</CardBody>
                		</Card>
                	</Col>
                	<Col>
                		<Card style={{width:'338px'}}>
                			<div className='bg-green'>
	                			<CardBody>
	                				{plainData.last}
	                			</CardBody>
	                			<Chart startColor={'#3498db'} endColor={'#2ecc71'} isLoading={this.state.isLoading} data={this.state.data.humidity} label={this.state.data.label} labels={'Humidity'} />
                			</div>
                			<CardBody>
                				Humidity
                				<div className='w-100 text-center'>
                					{plainData.lastHumidity}%
                				</div>
                			</CardBody>
                		</Card>
                	</Col>
                	<Col>
                		<Card style={{width:'338px'}}>
                			<div className='bg-red'>
	                			<CardBody>
	                				{plainData.last}
	                			</CardBody>
	                			<Chart startColor={'#f1c40f'} endColor={'#e74c3c'} isLoading={this.state.isLoading} data={this.state.data.airQ} label={this.state.data.label} labels={'Air Quality'} />
                			</div>
                			<CardBody>
                				Air Quality
                				<div className='w-100 text-center'>
                					{plainData.lastAirQ} PPM
                				</div>
                			</CardBody>
                		</Card>
                	</Col>
                	<div className='w-100 mt-3' />
                	<Col>
                		<Card>
                			<CardBody>
                				Food Level
                			</CardBody>
                			<Feeder status={'food'} />
                		</Card>
                	</Col>
                	<Col>
                		<Card>
                			<CardBody>
                				Water Level
                			</CardBody>
                			<Feeder status={'water'} />
                		</Card>
                	</Col>
                	<Col>
                		<Card className='h-100'>
                			<CardBody>
                				Status
                				<hr />
                				Jam: 14:00
                				<br />
                				Status: Active
                				<br />
                				Last Logout: Kemarin
                				<br />
                				<br />
                				<Button color="primary" size="md" block>Edit Schedule</Button>
                				<Button color="success" size="md" block>View All Data</Button>
                				<Button color="danger" size="md" block>Logout</Button>
                			</CardBody>
                		</Card>
                	</Col>
                </Row>
                </Col>
            </Row>
		);
	}
}
