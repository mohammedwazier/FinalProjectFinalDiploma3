/*
* Main Styling for Display Section
*/

import { StyleSheet } from 'react-native';

const globalVariable = {
	logoFont: 30,
	mainFont: 14,
	mainSmallerFont: 12,
	mainBiggerFont: 18,
	mainColor: 'orange'
}

const style = StyleSheet.create({
	mainContainer: {
		borderColor:'#000',
		flex: 1,
		// flexDirection: 'row',
		width: '100%',
		marginTop:180,
		alignItems: 'center',
    	justifyContent: 'center'
	},
	imageLogo:{
		width:200, 
		height:130,
	},
	homeDesc: {
		marginTop:30,
		fontSize: globalVariable.mainFont,
	},
	header: {
		width: '100%',
		padding:30,
		height: 250,
		alignItems: 'center',
    	justifyContent: 'center'
	},
	headerText: {
		fontFamily: 'Helvetica',
		letterSpacing: 5,
		fontSize: globalVariable.logoFont,
	},
	splashScreen: {
		width:'100%',
		padding:25,
		backgroundColor: '#2f9b5b',
	},

	btnHome: {
		backgroundColor: '#23b11b', 
		alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 50,
        width:200,
        top:130,
        padding:15,
	},
	textHome: {
		color: '#fff',
	}
})

export default style;

// module.exports = {
// 	style
// };