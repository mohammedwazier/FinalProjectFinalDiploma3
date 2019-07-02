import React from 'react';
import { Text, View, ScrollView, Image, AsyncStorage } from 'react-native';
import { AppLoading, Asset } from 'expo';
import CustomButton from '../../Components/Button/CustomButton';

import WebStore from '../../Store/WebStore';
import style from '../../Components/Style/Style';

const Logo = require('../../assets/images/Logo.png');

const images = [ require('../../assets/images/Logo.png'), require('../../assets/images/top-banner.png') ];

export default class Home extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor() {
		super();

		this.state = {
			isLoadingComplete: false
		};
		this.pressed = this.pressed.bind(this);
		this.handleResourcesAsync = this.handleResourcesAsync.bind(this);
	}
	componentWillMount(){
		WebStore.getUsername()
		.then(username => {
			if(username !== null){
				 this.props.navigation.push('monitoring');
			}
		})
	}
	componentDidMount() {
		// setTimeout(() => {
		//   alert('do Epic Animation From SplashScreen')
		// }, 2000);
	}
	handleResourcesAsync = async () => {
		const cachedImages = images.map((img) => {
			return Asset.fromModule(img).downloadAsync();
		});

		return Promise.all(cachedImages);
	};
	pressed = () => {
		this.props.navigation.navigate('login');
	};
	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this.handleResourcesAsync}
					onError={(erorr) => console.warn(error)}
					onFinish={() => {
						this.setState({
							isLoadingComplete: !this.state.isLoadingComplete
						});
					}}
				/>
			);
		}
		return (
			<ScrollView>
				<View style={style.mainContainer}>
					<Image source={Logo} style={style.imageLogo} />
					<Text style={style.homeDesc}>Monitoring Application</Text>
					<Text>for your Bird Cage</Text>
					<CustomButton
						pressed={this.pressed}
						text={'Get Started'}
						styleButton={style.btnHome}
						styleText={style.textHome}
					/>
				</View>
			</ScrollView>
		);
	}
}
