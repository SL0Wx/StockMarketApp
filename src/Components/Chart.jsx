import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import ButtonGroup from './ButtonGroup';

function Chart({ data, closeValue, setInterval, setOutputSize, setLoadData }) {
  const [bar, setBar] = useState(false);
  
  return (
    <div className="chart">
        <h2 className="closeVal">Close Value: {parseFloat(closeValue).toFixed(2)} USD</h2>
        <ButtonGroup
            setInterval={setInterval} setOutputSize={setOutputSize} 
            setLoadData={setLoadData} setBar={setBar}
            timeLineBtns={[
                {
                    label: "1M",
                    value: "1day",   
                    outputSize: "22",
                },
                {
                    label: "1Y",
                    value: "1month",
                    outputSize: "13",
                }]}
          chartTypeBtns={[
            {
              label: "Linear",
            },
            {
              label: "Bar",
            }
          ]} 
        />
        {bar ? (
          <Bar data={data} />
        ) : (
          <Line data={data} />
        )}
    </div>
  )
}

export default Chart