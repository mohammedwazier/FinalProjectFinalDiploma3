import React, { Component } from 'react';
import { Image } from 'react-native';

const img_0 = require('../../assets/images/leveling/0.jpg');
const img_1 = require('../../assets/images/leveling/10.jpg');
const img_2 = require('../../assets/images/leveling/20.jpg');
const img_3 = require('../../assets/images/leveling/30.jpg');
const img_4 = require('../../assets/images/leveling/40.jpg');
const img_5 = require('../../assets/images/leveling/50.jpg');
const img_6 = require('../../assets/images/leveling/60.jpg');
const img_7 = require('../../assets/images/leveling/70.jpg');
const img_8 = require('../../assets/images/leveling/80.jpg');
const img_9 = require('../../assets/images/leveling/90.jpg');
const img_10 = require('../../assets/images/leveling/100.jpg');

export default class ImageLevel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.image === 0) {
            return (
                <Image
                    source={img_0}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 10) {
            return (
                <Image
                    source={img_1}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 20) {
            return (
                <Image
                    source={img_2}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 30) {
            return (
                <Image
                    source={img_3}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 40) {
            return (
                <Image
                    source={img_4}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 50) {
            return (
                <Image
                    source={img_5}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 60) {
            return (
                <Image
                    source={img_6}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 70) {
            return (
                <Image
                    source={img_7}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 80) {
            return (
                <Image
                    source={img_8}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else if (this.props.image === 90) {
            return (
                <Image
                    source={img_9}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        } else {
            return (
                <Image
                    source={img_10}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            );
        }
    }
}
