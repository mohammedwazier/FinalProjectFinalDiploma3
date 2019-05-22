import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import WebStore from '../../Store/WebStore';

import TextField from '../../Components/Input/TextField';
import CustomButton from '../../Components/Button/CustomButton';

import style from '../../Components/Style/Style';

export default class BoardSetup extends React.Component {
	static navigationOptions = {
		title: 'BoardSetup',
		header: null,
		// gesturesEnabled: false
	};
	constructor(props) {
		super(props);

		this.state = {
			ssid: '',
			pwd: '',
		};
		this.setupBoard = this.setupBoard.bind(this);
	}
	setupBoard = () => {
		if(this.state.ssid.length === 0 && this.state.pwd.length === 0){
			return alert('Please input SSID and Password');
		}else{
			if(this.state.ssid.length === 0){
				return alert('Please input SSID');
			}

			if(this.state.pwd.length === 0){
				return alert('Please input Password');
			}

			WebStore.boardUpdate(this.state);
			// console.log(this.state);

			 // WebStore.login(body).then(resp => {
			 // 	if(resp.msg === 'wrong_username'){
			 // 		alert('Username Not Found');
			 // 	}else if(resp.msg === 'wrong_password'){
			 // 		alert('Wrong Password, please check again');
			 // 	}else if(resp.msg === 'ok'){
			 // 		alert('Success Login');
			 // 		const data = resp.data;
				// 	// WebStore.setData('username', data.username);
				// 	// WebStore.setData('_id', `${data._id}`);
				// 	// WebStore.setData('token', data.token);
			 // 		 this.props.navigation.navigate('monitoring');
			 // 	}
			 // })
		}
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={style.wrapper}>
					<KeyboardAwareScrollView
						resetScrollToCoords={{ x: 0, y: 0 }}
						contentContainerStyle={style.wrapper}
						scrollEnabled={false}
					>
						<ImageBackground
							source={require('../../assets/images/top-banner.png')}
							style={style.imageBackground}
						>
							<ScrollView>
								<View style={style.container}>
									<Text style={{ alignSelf: 'center', color: '#fff' }}>Add WiFi to Bird Things Board</Text>
									<View style={{ marginTop: 40 }}>
										<Text style={style.headerLogReg}>Setup Board Things</Text>
										<Text style={style.headerLogReg}>Application</Text>
									</View>
									<View style={{ width: '100%', marginTop: 80 }}>
										<TextField
											placeholder={'Your SSID'}
											onChange={(text) => this.setState({ssid:text})}
											label={'SSID'}
											returnKey={'next'}
											blurOnSubmit={false}
											autoCapitalize={'none'}
										/>
										<TextField
											placeholder={'Your Password'}
											onChange={(text) => this.setState({pwd:text})}
											label={'Password'}
											secureTextEntry
										/>
									</View>
									<View style={{ alignItems: 'center', marginTop: 50 }}>
										<CustomButton
											pressed={this.setupBoard}
											text={'Setup'}
											styleButton={style.btnLogReg}
											styleText={style.textHome}
										/>
									</View>
								</View>
							</ScrollView>
						</ImageBackground>
					</KeyboardAwareScrollView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
