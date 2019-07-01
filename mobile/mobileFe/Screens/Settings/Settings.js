import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Switch,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Content,
    Card,
    CardItem,
    Button,
    Left,
    Text,
    Body,
    Right,
    Picker,
} from 'native-base';
import DatePicker from '../../Components/DatePicker/DatePicker';
import WebStore from '../../Store/WebStore';
import io from 'socket.io-client/dist/socket.io';

import { link } from '../../Store/SocketConnect';

export default class Setting extends Component {
    static navigationOptions = {
        title: 'Settings',
        gesturesEnabled: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            statusMonitoring: 'Interval Value',
            setDate: false,
            setHour: false,
            startHour: null,
            endHour: null,
        };
        this.setDate = this.setDate.bind(this);
        this.socket = io(link);

        this.sendData = this.sendData.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    componentWillMount() {
        WebStore.getStatusMonitoringData().then(res => {
            const {
                endDate,
                startDate,
                endHour,
                startHour,
                setHour,
                setDate,
                statusMonitoring,
            } = res.data;
            if (res.msg === 'ok') {
                this.setState({
                    ...this.state,
                    startDate: startDate,
                    endDate: endDate,
                    statusMonitoring: statusMonitoring,
                    setDate: setDate,
                    setHour: setHour,
                    startHour: startHour,
                    endHour: endHour,
                });
            }
        });

        // this.socket.on('dateNode', () => {
        //     console.log('menerima sesuatu ');
        // });
        // WebStore.getUsername().then(username => {
        //     //     // console.log(username);
        // });
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    sendData = () => {
        WebStore.updateStatusMonitoringData(this.state).then(resp => {
            alert('Success Update Data');
            this.socket.emit('appDate', this.state);
        });
    };
    render() {
        const d = new Date();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const date = d.getDate();

        const dateMin = `${year}-${month}-${date}`;
        const dateMax = `${year}-${month}-${date + 1}`;
        // console.log(dateMin, dateMax);
        return (
            <TouchableWithoutFeedback
                onPress={DatePicker.dismiss}
                accessible={false}
            >
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <Content padder>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text style={styles.headerText}>
                                            Edit Feed
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>Set Date (On/ Off)</Text>
                                    </Body>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    setDate: value,
                                                })
                                            }
                                            value={this.state.setDate}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={this.state.startDate}
                                            mode="date"
                                            placeholder="Start Date"
                                            format="YYYY-MM-DD"
                                            minDate={dateMin}
                                            maxDate=""
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            onDateChange={date => {
                                                if (
                                                    new Date(date) < new Date()
                                                ) {
                                                    this.setState({
                                                        startDate: dateMin,
                                                    });
                                                } else {
                                                    this.setState({
                                                        startDate: date,
                                                    });
                                                }
                                            }}
                                            disabled={!this.state.setDate}
                                        />
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={this.state.endDate}
                                            mode="date"
                                            placeholder="End Date"
                                            format="YYYY-MM-DD"
                                            minDate={dateMin}
                                            maxDate=""
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            onDateChange={date => {
                                                if (
                                                    new Date(date) <
                                                    new Date(
                                                        this.state.startDate,
                                                    )
                                                ) {
                                                    this.setState({
                                                        endDate: this.state
                                                            .startDate,
                                                    });
                                                } else if (
                                                    new Date(date) < new Date()
                                                ) {
                                                    this.setState({
                                                        endDate: dateMax,
                                                    });
                                                } else {
                                                    this.setState({
                                                        endDate: date,
                                                    });
                                                }
                                            }}
                                            disabled={!this.state.setDate}
                                        />
                                    </Body>
                                </CardItem>

                                <CardItem style={{ marginTop: 15 }}>
                                    <Body>
                                        <Text>Set Date (On/ Off)</Text>
                                    </Body>
                                    <Right>
                                        <Switch
                                            onValueChange={value =>
                                                this.setState({
                                                    ...this.state,
                                                    setHour: value,
                                                })
                                            }
                                            value={this.state.setHour}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={this.state.startHour}
                                            mode="time"
                                            placeholder="Start Hour"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            onDateChange={date => {
                                                console.log(date);
                                                this.setState({
                                                    startHour: date,
                                                });
                                            }}
                                            disabled={!this.state.setHour}
                                        />
                                        <Text
                                            style={{
                                                width: '100%',
                                                marginTop: 5,
                                                color: '#666',
                                                fontSize: 11,
                                                textAlign: 'center',
                                            }}
                                        >
                                            Start Hour
                                        </Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={this.state.endHour}
                                            mode="time"
                                            placeholder="End Hour"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            onDateChange={date => {
                                                console.log(date);
                                                this.setState({
                                                    endHour: date,
                                                });
                                            }}
                                            disabled={!this.state.setHour}
                                        />
                                        <Text
                                            style={{
                                                width: '100%',
                                                marginTop: 5,
                                                color: '#666',
                                                fontSize: 11,
                                                textAlign: 'center',
                                            }}
                                        >
                                            End Hour
                                        </Text>
                                    </Body>
                                </CardItem>

                                <CardItem style={{ marginTop: 15 }}>
                                    <Body>
                                        <Text>
                                            Inverval Monitoring Push Data
                                        </Text>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            selectedValue={
                                                this.state.statusMonitoring
                                            }
                                            placeholder={
                                                this.state.statusMonitoring
                                            }
                                            onValueChange={set =>
                                                this.setState({
                                                    statusMonitoring: set,
                                                })
                                            }
                                        >
                                            <Picker.Item
                                                label="10 second"
                                                value="10"
                                            />
                                            <Picker.Item
                                                label="60 second"
                                                value="60"
                                            />
                                            <Picker.Item
                                                label="10 minute"
                                                value="600"
                                            />
                                            <Picker.Item
                                                label="30 minute"
                                                value="1800"
                                            />
                                        </Picker>
                                    </Body>
                                </CardItem>
                                {/* <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                        }}
                                    /> */}
                                <CardItem>
                                    <Body>
                                        <Button
                                            rounded
                                            success
                                            style={{ alignSelf: 'center' }}
                                            onPress={this.sendData}
                                        >
                                            <Text>Submit</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        borderColor: '#000',
        padding: 15,
    },
    headerText: {
        fontSize: 30,
    },
    leftTemp: {
        width: '70%',
        textAlign: 'center',
        color: '#3498db',
    },
    rightTemp: {
        width: '100%',
        paddingLeft: '5%',
        textAlign: 'center',
        color: '#e74c3c',
    },
    mainTextCode: {
        fontSize: 25,
        textAlign: 'center',
        width: '100%',
    },
    airQLeft: {
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        textAlign: 'center',
    },
    airQRight: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
    },
});
