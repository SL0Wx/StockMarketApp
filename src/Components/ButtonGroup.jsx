import React, { useState } from 'react'

function ButtonGroup({ timeLineBtns, chartTypeBtns, setInterval, setOutputSize, setLoadData, setBar }) {
    const [clickedTimeLineId, setClickedTimeLineId] = useState(0);
    const [clickedChartId, setClickedChartId] = useState(0);

  return (
    <div className="btnGroup">
        <div className="timeLineBtnGroup">
            {timeLineBtns.map((btn, i) => (
                <button key={i}
                    name={btn.label} 
                    onClick={() => {
                        setClickedTimeLineId(i);
                        setInterval(btn.value);
                        setOutputSize(btn.outputSize);
                        setLoadData(true);
                    }}
                    className={i === clickedTimeLineId ? "btn active" : "btn"}
                    value={btn.value}
                >
                    {btn.label}
                </button>
            ))}
        </div>
        <div className="chartTypeBtnGroup">
            {chartTypeBtns.map((btn, i) => (
                <button key={i}
                    name={btn.label}
                    onClick={() => {
                        setClickedChartId(i);
                        if (i === 0) {
                            setBar(false);
                        } else {
                            setBar(true);
                        }
                        setLoadData(true);
                    }}
                    className={i === clickedChartId ? "btn active" : "btn"}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    </div>
    
  )
}

export default ButtonGroup