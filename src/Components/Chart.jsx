import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import ButtonGroup from './ButtonGroup';

function Chart({ data, setInterval, setOutputSize }) {
  return (
    <div className="chart">
        <ButtonGroup
            setInterval={setInterval} setOutputSize={setOutputSize}
            buttons={[
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
        />
        <Line data={data} />
    </div>
  )
}

export default Chart