import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';

import WebStore from '../../Store/WebStore';
import DatePick from './DatePick';

export default class Schedule extends Component {
	constructor(){
		super();

		this.state = {
			data: '-',
			before: '-',
			// disable: true,
			startDate: '',
			endDate: '',
			startHour: '',
			endHour: '',
			system: true,
			statusMonitoring: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.changeSlide = this.changeSlide.bind(this);
	}

	onChange = (e) => {
		e.preventDefault();
		console.log(e.target.value)
		if(e.target.value !== this.state.before){
			this.setState({
				...this.state,
				data: e.target.value,
			})
		}
	}

	changeSlide = e => {

	}
	componentWillMount(){
		WebStore.getStatusMonitoringData().then(resp => {
			 // console.log(resp);
			 if(resp.msg === 'ok'){
				this.setState({
					...this.state,
					data: resp.data.statusMonitoring,
					before: resp.data.statusMonitoring,

					startDate: resp.data.startDate,
					endDate: resp.data.endDate,
					startHour: resp.data.startHour,
					endHour: resp.data.endHour,
					// system: resp.data.system,
					statusMonitoring: resp.data.statusMonitoring
				}, () => console.log(this.state))
			 }
		})
	}
	onSubmit = () => {
		WebStore.updateStatusMonitoringData(this.state.data).then(resp => {
			this.setState({
				...this.state,
				before: this.state.data,
				disable: true
			}, () => {
				WebStore.notif('Success Update Monitoring', 'success');
			})
		})
	}
	render() {
		return (
			<Row
            	className="mb-5 mt-5"
                style={{ minHeight: 'calc(100% - 152px)' }}
            >
                <Col className="mx-auto">
					<Link to='/dashboard'>Home</Link> / <Link to='/dashboard/monitoring'>Monitoring</Link> / Edit Schedule
                	<div className='text-center w-100'>
                		<h3>Edit Schedule Monitoring</h3>
                	</div>
                	<br />
                	<br />
                	<Row className='w-50 mx-auto'>
                		<Col>
                			<Card>
                				<CardBody>
							        <FormGroup>
							        	<Label>Scheduled On/Off</Label>
                						<DatePick />
							        </FormGroup>
							        <hr />
							        <FormGroup>
							        	<Label>System Of/Off</Label>
                						<CustomInput type="switch" name="system" onChange={this.onChange} checked={this.state.system} id='system' label="Manual On/Off System" />
							        </FormGroup>
							        <hr />
							        <FormGroup>
							          <Label for="exampleSelect">Edit Time BirdThings Board to Push data to Monitoring Server</Label>
							          <Input type="select" onChange={this.onChange} value={this.state.data} name="selectTime" id="exampleSelect">
							          	<option value={'-'}>-</option>
							            <option value={'60'}>60 Seconds</option>
							            <option value={'10'}>10 Minutes</option>
							            <option value={'30'}>30 Minutes</option>
							          </Input>
							        </FormGroup>
							        <hr />
							        <Button color="primary" onClick={this.onSubmit}>Save</Button>
                				</CardBody>
                			</Card>
                		</Col>
                	</Row>
				</Col>
			</Row>
		);
	}
}
