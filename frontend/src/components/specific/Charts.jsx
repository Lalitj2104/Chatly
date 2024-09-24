import React from 'react'
import {Line,Doughnut}  from "react-chartjs-2"
import { CategoryScale, Chart as ChartJS, Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend, plugins} from 'chart.js'
import { getLast7Days } from '../../lib/features';
import { brown, orange, pink } from '@mui/material/colors';


ChartJS.register(
    CategoryScale,
    Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend
);
const labels=getLast7Days();
const LineChartOptions={
  responsive:true,
  plugins:{
    legend:{
      display:false
    }, 
  title:{
    display:false,
  }
  },
  scales:{
    x:{
      grid:{
        display:false
      }
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false
      }
    }
  }
};

export const LineChart = ({value=[]}) => {

  const data={
    labels,
    datasets:[{
      data:value,
      label:'Sales',
      borderColor:'#3333ff',
      fill:false,
      backgroundColor:'#71B37C',

    }]
}
  return (
   
    <Line data={data} options={LineChartOptions}/>
  )
}

const DoughnutOptions={
  responsive:true,
  plugins:{
    
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
};
export const DoughnutChart = ({value=[],labels=[]}) => {
  const data={
    labels,
    datasets:[{
      data:value,
      label:'Total Chats vs Group Chats',
      borderColor:["#ba68c8","#d81b60"],
      fill:false,
      backgroundColor:["#d81b60","#ffe0b2"],
      offset:30

    }]
  }  
  return (
      <Doughnut style={{zIndex:10}}data={data} options={DoughnutOptions}/>
        )
  }
  