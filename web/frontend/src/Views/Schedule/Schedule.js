import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import WebStore from '../../Store/WebStore';

export default class Schedule extends Component {
	constructor(){
		super();

		this.state = {
			data: '-',
			before: '-',
			disable: true
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = (e) => {
		e.preventDefault();
		console.log(e.target.value)
		if(e.target.value !== this.state.before){
			this.setState({
				...this.state,
				data: e.target.value,
				disable: false
			})
		}
	}
	componentWillMount(){
		WebStore.getStatusMonitoringData().then(resp => {
			 console.log(resp);
			 if(resp.msg === 'ok'){
				this.setState({
					...this.state,
					data: resp.data.statusMonitoring,
					before: resp.data.statusMonitoring
				})	 		
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
							          <Label for="exampleSelect">Edit Time BirdThings Board to Push data to Monitoring Server</Label>
							          <Input type="select" onChange={this.onChange} value={this.state.data} name="selectTime" id="exampleSelect">
							          	<option value={'-'}>-</option>
							            <option value={'60'}>60 Seconds</option>
							            <option value={'10'}>10 Minutes</option>
							            <option value={'30'}>30 Minutes</option>
							          </Input>
							        </FormGroup>
							        <Button color="primary" onClick={this.onSubmit} disabled={this.state.disable}>Save</Button>
                				</CardBody>
                			</Card>
                		</Col>
                	</Row>
				</Col>
			</Row>
		);
	}
}
