import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class TestClart extends Component{
  constructor(props){
    super(props);
    this.data = this.data.bind(this);
  }
  data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,0,50);
      gradient.addColorStop(0, this.props.startColor);
      gradient.addColorStop(1, this.props.endColor);
    var dataChart = {
      labels: [0,0,0,0,0,0,0,0,0,0],
      datasets: [
        {
          label: this.props.labels,
          fill: true,
          borderColor: 'rgba(255,255,255,0.4)',
          backgroundColor: gradient,
          data: [0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };

     // console.log('datas', this.props.data);
     if(!this.props.isLoading){
        // dataChart.datasets[0].data.push(this.props.data);
       const {data, label} = this.props;
    //    if(data.length > 10){
    //      var tempData = [];
    //      var mins = data.length - 10;
    //        for(var i = data.length-1;i>=mins;i--){
    //         tempData.push(data[i]);
    //        }
    //        console.log(tempData);
    //        dataChart.datasets[0].data = tempData;
    //         // canvas.update();
    //        // canvas.resize().update();
    //    }else{
         dataChart.datasets[0].data = data;
    //    }
       dataChart.labels = label;
     }
    return dataChart;
  }

  chartReference = {};
  render() {
    const option = { 
       maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
             display: false,
             ticks: {
                        beginAtZero: true
                    }
          }
        ],
        xAxes: [
          {
             display: false
          }
        ]
      }
    }
    return (
      <div className='w-100'>
        <Line data={this.data} options={option} style={{width:'100%'}} className='w-100'/>
      </div>
    );
  }
}
