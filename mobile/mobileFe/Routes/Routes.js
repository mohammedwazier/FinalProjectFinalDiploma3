import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../Screens/Home/Home';
// import ChatScreen from './src/screens/ChatScreen';

const MainNavigator = createStackNavigator(
	{
		home: { screen: Home },
		login: { screens: Login }
		// register: { screens: Register },
		// mainMenu: { screens: Main }
	},
	{ initialRouteName: 'home' }
	// { headerMode: 'none' }
);

export default MainNavigation;
