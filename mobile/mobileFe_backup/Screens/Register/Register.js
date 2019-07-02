import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WebStore from '../../Store/WebStore';

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
			username: '',
			password: '',
			rpassword: '',
		};

		this.registerFunc = this.registerFunc.bind(this);
	}
	componentDidMount() {}
	registerFunc = () => {
		const { email, username, password, rpassword } = this.state;

		if(!email && !username && !password && !password){
			return alert('Please fill the form');
		}else{
			if(!email){
				return alert('Please input Email');
			}

			if(!username){
				return alert('Please input Username');
			}

			if(!password){
				return alert('Please input Password');
			}

			if(!rpassword){
				return alert('Please input ReType Password');
			}

			if(password !== rpassword){
				return alert('Password not Match');
			}

			WebStore.register(this.state).then(resp => {
				if(resp.msg === 'success_regis'){
					alert('Success Registration');
					this.props.navigation.goBack();
				}
			})

		}

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
									<Text style={{ alignSelf: 'center', color: '#fff' }}>Sign Up</Text>
									<View style={{ marginTop: 40 }}>
										<Text style={style.headerLogReg}>New</Text>
										<Text style={style.headerLogReg}>Account</Text>
									</View>
									<View style={{ width: '100%', marginTop: 80 }}>
										<TextField
											keyboard={'email-address'}
											placeholder={'Your Email'}
											onChange={(text) => this.setState({email:text})}
											label={'Email'}
											autoCapitalize={'none'}
										/>
										<TextField
											// keyboard={'email-address'}
											placeholder={'Your Username'}
											onChange={(text) => this.setState({username:text})}
											label={'Username'}
											autoCapitalize={'none'}
										/>
										<TextField
											placeholder={'Your Password'}
											onChange={(text) => this.setState({password:text})}
											label={'Password'}
											secureTextEntry
										/>
										<TextField
											placeholder={'Retry Password'}
											onChange={(text) => this.setState({rpassword:text})}
											label={'ReType Password'}
											secureTextEntry
										/>
									</View>
									<View style={{ alignItems: 'center', marginTop: 30 }}>
										<CustomButton
											pressed={this.registerFunc}
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
