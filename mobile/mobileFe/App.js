import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Screens/Home/Home';
import Login from './Screens/Login/Login';
// import ChatScreen from './src/screens/ChatScreen';

const MainNavigator = createStackNavigator(
	{
		home: { screen: Home },
		login: { screen: Login }
		// chat: { screen: ChatScreen }
	},
	{ initialRouteName: 'home' }
	// { headerMode: 'none' }
);

const app = createAppContainer(MainNavigator);

export default app;
