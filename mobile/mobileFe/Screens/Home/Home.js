import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import CustomButton from '../../Components/Button/CustomButton';

// import style from './Components/Style/Style';
import style from '../../Components/Style/Style';

// import Splash from './Screens/Splash/Splash';

const Logo = require('../../assets/images/Logo.png');

export default class Home extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor() {
		super();

		// this.loadingStatus = false;

		this.pressed = this.pressed.bind(this);
	}
	componentDidMount() {
		// setTimeout(() => {
		//   alert('do Epic Animation From SplashScreen')
		// }, 2000);
	}
	pressed = () => {
		// alert('Get Started');
		this.props.navigation.navigate('login');
	};
	render() {
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
