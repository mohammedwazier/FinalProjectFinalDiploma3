import React, { Component } from 'react';

export default class Feeder extends Component {
    getLevel = () => {
        const { level } = this.props;
        if (level < 10) {
            return 'water-empty draining';
        } else if (level < 30) {
            return 'water-low draining';
        } else if (level < 80) {
            return 'water-medium draining';
        } else {
            return 'water-full draining';
        }
    };
    render() {
        return (
            <div className="water-bottle">
                <div className="cap">
                    <div className="cap-top" />
                    <div className="cap-seal" />
                </div>
                <div className="bottle">
                    {/* 		       	water-full water-medium water-low water-empty */}
                    <div className={this.getLevel()}>
                        {/* 		            status */}
                    </div>
                </div>
                <div className="labelTinggi">{this.props.level}%</div>
            </div>
        );
    }
}
