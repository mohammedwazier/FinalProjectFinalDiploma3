import React, { Component } from 'react';
import {
    View,
    // TouchableOpacity,
    // TouchableWithoutFeedback,
    ScrollView,
    // Keyboard,
    StyleSheet,
    Alert,
    ImageBackground,
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

import WebStore from '../../Store/WebStore';
import style from '../../Components/Style/Style';

const Logo = require('../../assets/images/top-banner.png');

// import LineChart from 'react-native-responsive-linechart';

import io from 'socket.io-client';

const link = 'http://192.168.1.3:5000';
const socket = io(link);
// console.log('hehehe ',socket);

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
        // this.socket = io(link);
        this.state = {
            isLoading: true,
            status: 0,
            data: [],
            label: [],
        };

        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);

        // this.socket.on('pushupdate', data => {
        // 	console.log(data)
        // })
    }

    test = () => {
        // console.log('asdasdasd');
        // socket.emit('appDate', "testing_waziruddin_akbar");
    };
    componentWillMount() {
        WebStore.getUsername().then(username => {
            if (username === null) {
                this.props.navigation.push('home');
            }
            console.log(username);
            socket.emit('login', { uname: username });
        });
        // console.log('asdasd')
        WebStore.checkUser().then(user => {
            console.log(user);
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
                            this.props.navigation.push('boardcheck');
                        } else {
                            if (!data.statusRegis) {
                                //Harus Registrasi Board
                            }
                        }
                    }
                });
            }
        });
    }
    componentDidMount() {}
    logout = data => {
        WebStore.logout().then(resp => {
            if (resp.msg === 'success') {
                WebStore.deleteData('_id');
                WebStore.deleteData('token');
                WebStore.deleteData('username');
                this.props.navigation.navigate('home');
            }
        });
    };
    loading = () => {
        return <Text>Loading</Text>;
    };
    randomFunc = () => {
        return parseInt(Math.floor(Math.random() * 10));
    };

    button() {
        Alert.alert('Logout', 'Are you sure to Logout from this application', [
            { text: 'Yes', onPress: () => console.log('YES Pressed') },
            {
                text: 'No',
                onPress: () => console.log('NO Pressed'),
                style: 'cancel',
            },
        ]);
    }

    render() {
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
                        // paddingBottom: 50,
                    }}
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
                                        30°
                                        {'\n'}Cool
                                    </Text>
                                </Left>
                                <Body>
                                    <Text style={styles.mainTextCode}>
                                        30°
                                        {'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            top: -25,
                                        }}
                                    >
                                        {moment(new Date()).format(
                                            'MMM Do, h:mm:ss',
                                        )}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text style={styles.rightTemp}>
                                        30°
                                        {'\n'}Hot
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
                                        30%
                                        {'\n'}Cool
                                    </Text>
                                </Left>
                                <Body>
                                    <Text style={styles.mainTextCode}>
                                        30%
                                        {'\n'}
                                    </Text>
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            top: -25,
                                        }}
                                    >
                                        {moment(new Date()).format(
                                            'MMM Do, h:mm:ss',
                                        )}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text style={styles.rightTemp}>
                                        30%
                                        {'\n'}Hot
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
                                        30°
                                        {'\n'}Cool
                                    </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.airQRight}>
                                        {'< 50 Good'}
                                        {'\n > 101 UnHealty'}
                                    </Text>
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
                                <Body>
                                    <Text>
                                        {'< 50 Good'}
                                        {'\n > 101 UnHealty'}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
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
    },
    airQRight: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
    },
});
