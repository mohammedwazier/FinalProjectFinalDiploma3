import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import WebStore from '../../Store/WebStore';
import CustomButton from '../../Components/Button/CustomButton';

import style from '../../Components/Style/Style';

export default class BoardCheck extends Component {
	static navigationOptions = {
		title: 'BoardCheck',
		header: null,
		gesturesEnabled: false
	};
	constructor(){
		super();
		this.setupBord = this.setupBord.bind(this);
	}
	componentWillMount(){}
	setupBord = () => {
		WebStore.updateBoardPoint().then(resp => {
			// console.log(resp);
			if(resp.msg === 'ok'){
				this.props.navigation.push('monitoring');
			}
		})
		// alert('setup');
		// this.props.navigation.navigate('boardsetup');
	}
	render() {
		return (
			<Swiper style={styles.wrapper} loop={false}>
			  <View style={styles.slide1}>
			    <Text style={styles.text}>Setup</Text>
			    <Text style={styles.text}>your</Text>
			    <Text style={styles.text}>Bird Things</Text>
			    <Text style={styles.text}>Board</Text>
			    <Text style={styles.textInformation}>
			    	1. Turn On Your Bird Things Board
			    </Text>
			    <Text style={styles.textInformation}>
			    	2. Connect your laptop to Bird Things Board SSID "Bird Things" Password "developer"
			    </Text>
			    <Text style={styles.textInformation}>
			    	3. Open Browser and type 192.168.1.1/setup?ssid=[YourSSID]&pwd=[YourPassword]&username=[YourAccountUsername]
{/* 			    	3. Input Your SSID and Password to Connect Bird Things Board to Internet */}
			    </Text>
			    <Text style={styles.textInformation}>
			    	4. After you got Success Message, restart your board wait for board to apply changes
{/* 			    	4. Wait for System to Apply your changes */}
			    </Text>
			  </View>
			  <View style={styles.slide2}>
			    <Text style={styles.text}>Ready to Setup</Text>
					<CustomButton
						pressed={this.setupBord}
						text={'Done Setup'}
						styleButton={style.button}
						styleText={style.textHome}
					/>
			  </View>
			</Swiper>
		);
	}
}

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
     justifyContent: 'center',
    padding: 25,
    backgroundColor: '#4CAF50'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
  	alignItems: 'center',
    padding: 25,
    backgroundColor: '#4CAF50'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50'
  },
  text: {
    color: '#fff',
    fontSize:30,
    fontWeight:'bold'
  },
  textInformation: {
  	marginTop:20,
  	color: '#fff',
    fontSize:20
  }
}
