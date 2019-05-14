import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextField from '../../Components/Input/TextField';
import CustomButton from '../../Components/Button/CustomButton';

import style from '../../Components/Style/Style';

export default class Login extends React.Component {
	static navigationOptions = {
		title: 'Login',
		header: null,
		gesturesEnabled: false
	};
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.login = this.login.bind(this);

		this.secondTextInputRef = React.createRef();
	}
	componentDidMount() {}
	onChange = (text) => {
		text.preventDefault();
		alert(text);
	};
	login = () => {
		alert('Login');
	};

	_focusNextField(nextField) {
		this.refs[nextField].focus();
	}

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
									<Text style={{ alignSelf: 'center', color: '#fff' }}>Log In</Text>
									<View style={{ marginTop: 40 }}>
										<Text style={style.headerLogReg}>Log In into</Text>
										<Text style={style.headerLogReg}>Application</Text>
									</View>
									<View style={{ width: '100%', marginTop: 80 }}>
										<TextField
											keyboard={'email-address'}
											placeholder={'Your Email'}
											onChange={this.onChange}
											label={'Email'}
											returnKey={'next'}
											onSubmitEditing={() => {
												this.nextInput.focus();
											}}
											blurOnSubmit={false}
											ref={'1'}
										/>
										<TextField
											placeholder={'Your Password'}
											onChange={this.onChange}
											label={'Password'}
											secureTextEntry
											ref={(nextInput) => (this.nextInput = nextInput)}
											onSubmitEditing={() => {
												alert('Logins');
											}}
										/>
									</View>
									<View style={{ alignItems: 'center', marginTop: 50 }}>
										<CustomButton
											pressed={this.login}
											text={'Login'}
											styleButton={style.btnLogReg}
											styleText={style.textHome}
										/>
										<CustomButton
											pressed={() => {
												this.props.navigation.navigate('register');
											}}
											text={'Register'}
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
