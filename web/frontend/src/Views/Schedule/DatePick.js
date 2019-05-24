import React, { Component } from 'react';
import {DateRangePicker} from 'react-dates';

export default class DatePick extends Component {
	constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      start: '',
      end: ''
    };
  }


	render() {
		return (
			<div className="App" style={{width:'100%'}}>
		        <DateRangePicker
		          startDateId="startDate"
		          endDateId="endDate"
		          startDate={this.state.startDate}
		          endDate={this.state.endDate}
		          numberOfMonths={1}
		          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }, () => console.log(this.state.startDate._d))}}
		          focusedInput={this.state.focusedInput}
		          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
		        />
		    </div>
		);
	}
}
