import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default (TextField = ({
	style,
	label,
	placeholder,
	onChange,
	secureTextEntry,
	value,
	keyboard,
	returnKey,
	ref,
	onSubmitEditing
}) => {
	return (
		<View
			style={{
				paddingTop: 10,
				paddingLeft: 15,
				paddingRight: 15,
				paddingBottom: 10,
				borderColor: 'gray',
				width: '100%',
				borderWidth: 1,
				borderRadius: 10,
				marginTop: 10,
				backgroundColor: '#fff'
			}}
		>
			<Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{label}</Text>
			<TextInput
				returnKeyType={returnKey}
				keyboardType={keyboard}
				style={{ width: '100%' }}
				autoCorrect={false}
				ref={ref}
				onSubmitEditing={onSubmitEditing}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => onChange}
				placeholder={placeholder}
				value={value}
			/>
		</View>
	);
});
