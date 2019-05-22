import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Screens/Home/Home';
import Login from './Screens/Login/Login';
import Register from './Screens/Register/Register';
import BoardCheck from './Screens/BoardCheck/BoardCheck';
import Monitoring from './Screens/Monitoring/Monitoring';
import BoardSetup from './Screens/BoardCheck/BoardSetup';
// import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';

const MainNavigator = createStackNavigator(
	{
		home: { screen: Home },
		login: { screen: Login },
		register: { screen: Register },
		boardcheck: { screen: BoardCheck },
		monitoring: { screen : Monitoring },
		boardsetup: { screen: BoardSetup }
	},
	{ initialRouteName: 'home' }
);

const app = createAppContainer(MainNavigator);

export default app;
