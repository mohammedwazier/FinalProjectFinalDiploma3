import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
// import CustomButton from '../../Components/Button/CustomButton';

// import style from './Components/Style/Style';
import style from '../../Components/Style/Style';

export default class Login extends React.Component {
	static navigationOptions = {
		title: 'Login',
		header: null,
		gesturesEnabled: false
	};
	constructor() {
		super();

		// this.pressed = this.pressed.bind(this);
	}
	componentDidMount() {}
	render() {
		return (
			<ScrollView>
				<View style={style.mainContainer}>
					<Text>Login Page</Text>
				</View>
			</ScrollView>
		);
	}
}
