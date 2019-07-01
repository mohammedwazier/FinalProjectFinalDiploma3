import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    // TouchableWithoutFeedback,
    ScrollView,
    // Keyboard,
    StyleSheet,
    Alert,
    ImageBackground,
    RefreshControl,
} from 'react-native';
import {
    Content,
    Card,
    CardItem,
    // Thumbnail,
    Text,
    Button,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { YellowBox } from 'react-native';
import moment from 'moment';

import ImageLevel from '../../Components/ImageLevel/ImageLevel';

import WebStore from '../../Store/WebStore';
// import SocketConnect from '../../Store/SocketConnect';
import style from '../../Components/Style/Style';
import io from 'socket.io-client/dist/socket.io';

import { link } from '../../Store/SocketConnect';

const Logo = require('../../assets/images/top-banner.png');

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

const img_array = [
    { name: 0, img: img_0 },
    { name: 10, img: img_1 },
    { name: 20, img: img_2 },
    { name: 30, img: img_3 },
    { name: 40, img: img_4 },
    { name: 50, img: img_5 },
    { name: 60, img: img_6 },
    { name: 70, img: img_7 },
    { name: 80, img: img_8 },
    { name: 90, img: img_9 },
    { name: 100, img: img_10 },
];

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

export default class Monitoring extends Component {
    static navigationOptions = {
        title: 'Monitoring',
        header: null,
        gesturesEnabled: false,
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            status: 0,
            data: {
                suhu: 0,
                minSuhu: 0,
                minSuhuDate: new Date(),
                maxSuhu: 0,
                maxSuhuDate: new Date(),
                humidity: 0,
                minHumidity: 0,
                minHumidityDate: new Date(),
                maxHumidity: 0,
                maxHumidityDate: new Date(),
                airQuality: 0,
                lvlPakan: 0,
                statePakan: 0,
                lvlMinum: 0,
                stateMinum: 0,
                updatedAt: new Date(),
            },
            refreshing: false,
            username: null,
        };

        this.keluar = this.keluar.bind(this);
        // this.getImage = this.getImage.bind(this);
    }
    _onRefresh = () => {
        this.setState({ refreshing: true }, () =>
            this.setState({ refreshing: false }),
        );
    };

    componentWillMount() {
        WebStore.getUsername().then(username => {
            if (username === null) {
                return this.props.navigation.push('home');
            }

            // const link = 'http://192.168.1.4:5000';
            const socket = io(link);

            socket.emit('login', { uname: username });

            socket.on('pushupdate', data => {
                this.getData('update');
            });
        });

        WebStore.checkUser().then(user => {
            if (user.msg === 'no_session') {
                WebStore.deleteData('token');
                WebStore.deleteData('username');
                WebStore.deleteData('_id');

                this.props.navigation.push('home');
            } else {
                WebStore.checkRegis().then(resp => {
                    if (resp.msg === 'ok') {
                        const data = resp.data;
                        if (data.regisPoint === 0) {
                            return this.props.navigation.push('boardcheck');
                        } else {
                            if (!data.statusRegis) {
                                //Harus Registrasi Board
                            }
                        }
                    }
                });
                this.getData('new');
            }
        });
    }
    getData = status => {
        WebStore.getLastMonitorData().then(resp => {
            delete resp.data._id;
            delete resp.data.username;
            delete resp.data.status;
            var data = {};
            if (status === 'new') {
                data = {
                    ...resp.data,
                    minSuhu: resp.data.suhu,
                    maxSuhu: resp.data.suhu,
                    minSuhuDate: resp.data.updatedAt,
                    maxSuhuDate: resp.data.updatedAt,
                    minHumidity: resp.data.humidity,
                    maxHumidity: resp.data.humidity,
                    minHumidityDate: resp.data.updatedAt,
                    maxHumidityDate: resp.data.updatedAt,
                    statePakan: Math.ceil(resp.data.lvlPakan / 10) * 10,
                    stateMinum: Math.ceil(resp.data.lvlMinum / 10) * 10,
                };
            } else {
                data = {
                    ...this.state.data,
                    ...resp.data,
                    statePakan: Math.ceil(resp.data.lvlPakan / 10) * 10,
                    stateMinum: Math.ceil(resp.data.lvlMinum / 10) * 10,
                };

                if (data.suhu < data.minSuhu) {
                    data.minSuhu = data.suhu;
                    data.minSuhuDate = data.updatedAt;
                }

                if (data.suhu > data.maxSuhu) {
                    data.maxSuhu = data.suhu;
                    data.maxSuhuDate = data.updatedAt;
                }

                if (data.humidity < data.minHumidity) {
                    data.minHumidity = data.humidity;
                    data.minHumidityDate = data.updatedAt;
                }

                if (data.humidity > data.maxHumidity) {
                    data.maxHumidity = data.humidity;
                    data.maxHumidityDate = data.updatedAt;
                }
            }

            this.setState(
                {
                    ...this.state,
                    data: {
                        ...this.state.data,
                        ...data,
                    },
                },
                () => console.log(this.state.data, status),
            );
        });
    };
    componentWillUnmount() {
        // SocketConnect.disconnect();
    }
    keluar = () => {
        console.log('presseds');
        WebStore.logout().then(resp => {
            console.log(resp);
            if (resp.msg === 'success') {
                WebStore.deleteData('_id');
                WebStore.deleteData('token');
                WebStore.deleteData('username');
                this.props.navigation.navigate('home');
            }
        });
    };
    randomFunc = () => {
        return parseInt(Math.floor(Math.random() * 10));
    };

    button() {
        Alert.alert('Logout', 'Are you sure to Logout from this application', [
            { text: 'Yes', onPress: () => this.keluar() },
            {
                text: 'No',
                onPress: () => console.log('NO Pressed'),
                style: 'cancel',
            },
        ]);
    }

    render() {
        const {
            suhu,
            minSuhu,
            maxSuhu,
            humidity,
            minHumidity,
            maxHumidity,
            airQuality,
            lvlPakan,
            lvlMinum,
            statePakan,
            stateMinum,
            minSuhuDate,
            maxSuhuDate,
            minHumidityDate,
            maxHumidityDate,
            updatedAt,
        } = this.state.data;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={Logo}
                    style={style.mainImgBackground}
                />
                <ScrollView
                    style={{
                        height: '100%',
                        flex: 1,
                        marginTop: -450,
                        padding: 20,
                        width: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <Text>Welcome</Text>
                    <Text>{moment(new Date()).format('MMMM Do YYYY')}</Text>
                    <Text>{moment(new Date()).format('h:mm:ss A')}</Text>
                    <Content style={{ top: 10 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={styles.headerText}>
                                        Temperature
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.leftTemp}>
                                        {minSuhu}°{'\n'}
                                        {moment(minSuhuDate)
                                            .startOf('hour')
                                            .fromNow()}
                                    </Text>
                                </Left>
                                <Body>
                                    <Text style={styles.mainTextCode}>
                                        {suhu}°{'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            top: -25,
                                        }}
                                    >
                                        {moment(updatedAt).format(
                                            'MMM Do, h:mm:ss',
                                        )}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text style={styles.rightTemp}>
                                        {maxSuhu}°{'\n'}
                                        {moment(maxSuhuDate)
                                            .startOf('hour')
                                            .fromNow()}
                                    </Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content style={{ top: 10 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={styles.headerText}>
                                        Humidity
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.leftTemp}>
                                        {minHumidity}%{'\n'}
                                        {moment(minHumidityDate)
                                            .startOf('hour')
                                            .fromNow()}
                                    </Text>
                                </Left>
                                <Body>
                                    <Text style={styles.mainTextCode}>
                                        {humidity}%{'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            top: -25,
                                        }}
                                    >
                                        {moment(updatedAt).format(
                                            'MMM Do, h:mm:ss',
                                        )}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text style={styles.rightTemp}>
                                        {maxHumidity}%{'\n'}
                                        {moment(maxHumidityDate)
                                            .startOf('hour')
                                            .fromNow()}
                                    </Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content style={{ top: 10 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={styles.headerText}>
                                        Air Quality
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.airQLeft}>
                                        {airQuality} PM
                                        {'\n'}
                                        {moment(updatedAt).format(
                                            'MMM Do, h:mm:ss',
                                        )}
                                    </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.airQRight}>
                                        {'< 50 Good'}
                                        {'\n'}
                                    </Text>
                                    <Text>> 101 UnHealty</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content style={{ marginTop: 20 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={styles.headerText}>
                                        Food Level
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageLevel image={statePakan} />
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {lvlPakan}%
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content style={{ marginTop: 20 }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={styles.headerText}>
                                        Drink Level
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* {this.getImage(stateMinum)} */}
                                    <ImageLevel image={stateMinum} />
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {lvlMinum}%
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                    <View
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{ padding: 30 }}
                            onPress={() =>
                                this.props.navigation.navigate('editFeed')
                            }
                        >
                            <Text style={{ textAlign: 'center' }}>
                                Edit Schedule
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.button()}>
                            <Icon name="logout" />
                            <Text>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
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
