import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import '../../components/login/login.css'

const printChart = () => {
  window.print();
}

const BarChart = (props) => {
  const data = {
    labels: props.BarTitles,
    datasets: [
      {
        label: "Horas Contadas",
        backgroundColor: "#3b6bb9",
        borderColor: "#3F3DA0",
        borderWidth: 1.5,
        //stack: 1,
        hoverBackgroundColor: "#3F3DA0",
        hoverBorderColor: "#3F3DA0",
        data: props.data
      }
    ]
  };

  const options = {
    responsive: true,
    legend: {
      display: false
    },
    type: "bar"
  }

  return (
    <div className="container">
      <button type="button" className="btn" id="btnSubmit" onClick={() => printChart()}>Imprimir</button>
      <div>
        <Bar data={data} width={null} height={null} options={options}/>
      </div>
    </div>
  );
}

export default BarChart;