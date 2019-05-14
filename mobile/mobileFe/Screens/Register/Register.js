import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextField from '../../Components/Input/TextField';
import CustomButton from '../../Components/Button/CustomButton';

import style from '../../Components/Style/Style';

export default class Register extends React.Component {
	static navigationOptions = {
		title: 'Register',
		header: null
		// gesturesEnabled: false
	};
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.login = this.login.bind(this);
	}
	componentDidMount() {}
	onChange = (text) => {
		text.preventDefault();
		alert(text);
	};
	login = () => {
		alert('Login');
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
									<Text style={{ alignSelf: 'center', color: '#fff' }}>Sign Up</Text>
									<View style={{ marginTop: 40 }}>
										<Text style={style.headerLogReg}>New</Text>
										<Text style={style.headerLogReg}>Account</Text>
									</View>
									<View style={{ width: '100%', marginTop: 80 }}>
										<TextField
											keyboard={'email-address'}
											placeholder={'Your Email'}
											onChange={this.onChange}
											label={'Email'}
										/>
										<TextField
											// keyboard={'email-address'}
											placeholder={'Your Username'}
											onChange={this.onChange}
											label={'Username'}
										/>
										<TextField
											placeholder={'Your Password'}
											onChange={this.onChange}
											label={'Password'}
											secureTextEntry
										/>
										<TextField
											placeholder={'Retry Password'}
											onChange={this.onChange}
											label={'Password'}
											secureTextEntry
										/>
									</View>
									<View style={{ alignItems: 'center', marginTop: 30 }}>
										<CustomButton
											// pressed={}
											text={'Register'}
											styleButton={style.btnLogReg}
											styleText={style.textHome}
										/>
										<CustomButton
											pressed={() => {
												this.props.navigation.goBack();
											}}
											text={'Login'}
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
