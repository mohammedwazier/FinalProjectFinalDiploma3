import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import WebStore from '../../Store/WebStore';
import style from '../../Components/Style/Style';

import LineChart from "react-native-responsive-linechart";

export default class Monitoring extends Component {
	static navigationOptions = {
		title: 'Monitoring',
		header: null,
		gesturesEnabled: false
	};

	constructor(){
		super();

		this.state = {
			isLoading: true,
			status: 0,
			data: [],
			label: [],
		}

		this.logout = this.logout.bind(this);
	}
	componentWillMount(){
		WebStore.getUsername()
		.then(username => {
			if(username === null){
				 this.props.navigation.push('home');
			}
		})
		WebStore.checkUser()
		.then(user => {
			// console.log(user);
			if(user.msg === 'no_session'){
				 WebStore.deleteData('token');
				 WebStore.deleteData('username');
				 WebStore.deleteData('_id');

				 this.props.navigation.push('home');
			}else{
				WebStore.checkRegis().then(resp => {
					if(resp.msg === 'ok'){
						const data = resp.data;
						 if(data.regisPoint === 0){
						 	 this.props.navigation.push('boardcheck');
						 }else{
						 	if(!data.statusRegis){
						 		//Harus Registrasi Board
						 	}
						 }
					}
				})
			}
		})
		
	}
	componentDidMount(){
	}
	logout = (data) => {

		WebStore.logout().then(resp => {
			if(resp.msg === 'success'){
				WebStore.deleteData('_id');
				WebStore.deleteData('token');
				WebStore.deleteData('username');
				this.props.navigation.navigate('home');
			}
		})
	}
	loading = () => {
		return(
			<Text>
				Loading
			</Text>
			)
	}
	randomFunc = () => {
	    return parseInt(Math.floor(Math.random() * 10));
	}
	render() {
		const data = [18, 16, 20, 21, 19, 20, 10, 9];
		const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		const config = {
			line: {
				visible: false,
				 // strokeWidth: 1,
				 // strokeColor: "#10ac84"
			},
			area: {
				visible: true,
				gradientFrom: '#10ac84',
			    gradientFromOpacity: 1,
			    gradientTo: '#10ac84',
			    gradientToOpacity: 0.4,
			},
			 tooltip: {
			 	visible: true,
			 	labelFormatter: v => v.toFixed(0) + "° C",
			 	labelFontSize: 12
			 },
			yAxis: {
				visible: false,
			},
			xAxis: {
				visible: true,
				labelFontSize: 12,
				labelColor: "#54a0ff"
			},
			grid: {
				visible: false
			},
			dataPoint: {
				visible: true,
				color: "#777",
				radius: 1,
				label: { visible: true, marginBottom: -2, labelFontSize: 8, }
			},
			insetX: 10,
			insetY: 10
		};


		return (
			<View style={{ flex: 1, marginTop: 50 }}>
				<ScrollView style={{ height: '100%', flex: 1 }}>
					<View style={{ margin: 15, height: 200, backgroundColor: '#fff', alignItems: 'center' }} xLabels={labels}>
						<LineChart style={{ flex: 1, borderRadius: 20 }} config={config} data={data} />
						<Text>Suhu</Text>
						<Text>30°</Text>
					</View>

					<View style={{ margin: 15, height: 200, backgroundColor: '#fff', alignItems: 'center' }} xLabels={labels} >
						<LineChart style={{ flex: 1 }} config={config} data={data} />
						<Text>Humidity</Text>
					</View>

					<View style={{ margin: 15, height: 200, backgroundColor: '#fff', alignItems: 'center' }} xLabels={labels} >
						<LineChart style={{ flex: 1 }} config={config} data={data} />
						<Text>Air Quality</Text>
					</View>

				</ScrollView>
			</View>
		);
	}
}
