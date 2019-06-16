import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';

export default class DatePick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
        };
        this.changeDate = this.changeDate.bind(this);
    }
    changeDate = ({ startDate, endDate }) => {
        this.setState({
            startDate,
            endDate,
        });
        if (!endDate) {
            //just startDate
            this.props.updateDate({
                status: 'startDate',
                data: startDate._d,
            });
        } else {
            //with EndDate
            // console.log(startDate._d.toJSON(), endDate._d.toJSON());
            this.props.updateDate({
                status: 'endDate',
                data: endDate._d,
            });
        }
    };

    render() {
        return (
            <div className="App" style={{ width: '100%' }}>
                <DateRangePicker
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    numberOfMonths={1}
                    onDatesChange={this.changeDate}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => {
                        this.setState({ focusedInput });
                    }}
                />
            </div>
        );
    }
}
