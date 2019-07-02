import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default (customButton = ({ pressed, text, styleButton, styleText }) => {
	return (
		<TouchableOpacity onPress={pressed}>
			<View style={styleButton}>
				<Text style={styleText}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
});
