import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import WebStore from '../../Store/WebStore';

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
			username: '',
			password: '',
			error: {
				username: false,
				password: false
			},
			isSubmit: false
		};
		this.loginFunc = this.loginFunc.bind(this);
		this.setSubmit = this.setSubmit.bind(this);
	}
	componentWillMount(){}
	componentDidMount() {}
	loginFunc = () => {
		console.log('login');
		if(this.state.username.length === 0 && this.state.password.length === 0){
			this.setSubmit();
			return alert('Please input Username and Password');
		}else{
			if(this.state.username.length === 0){
				this.setSubmit();
				return alert('Please input Username');
			}

			if(this.state.password.length === 0){
				this.setSubmit();
				return alert('Please input Password');
			}	

			this.setSubmit();
			const body = {
				username: this.state.username,
				password: this.state.password
			}
			 WebStore.login(body).then(resp => {
			 	if(resp.msg === 'wrong_username'){
			 		alert('Username Not Found');
			 	}else if(resp.msg === 'wrong_password'){
			 		alert('Wrong Password, please check again');
			 	}else if(resp.msg === 'ok'){
			 		alert('Success Login');
			 		const data = resp.data;
					WebStore.setData('username', data.username);
					WebStore.setData('_id', `${data._id}`);
					WebStore.setData('token', data.token);
			 		 this.props.navigation.push('monitoring');
			 	}
			 })
		}
	};

	setSubmit(){
		this.setState({
			...this.state,
			isSubmit: !this.state.isSubmit
		})
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
											placeholder={'Your username'}
											onChange={(text) => this.setState({username:text})}
											label={'username'}
											returnKey={'next'}
											blurOnSubmit={false}
											autoCapitalize={'none'}
										/>
										<TextField
											placeholder={'Your Password'}
											onChange={(text) => this.setState({password:text})}
											label={'Password'}
											secureTextEntry
										/>
									</View>
									<View style={{ alignItems: 'center', marginTop: 50 }}>
										<CustomButton
											pressed={this.loginFunc}
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
