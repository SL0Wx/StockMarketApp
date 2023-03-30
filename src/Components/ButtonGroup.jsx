import React, { useState } from 'react'

function ButtonGroup({ buttons, setInterval, setOutputSize }) {
    const [clickedId, setClickedId] = useState(1);

  return (
    <div className="btnGroup">
        {buttons.map((btn, i) => (
            <button key={i}
                name={btn.label} 
                onClick={() => {
                    setClickedId(i);
                    setInterval(btn.value);
                    setOutputSize(btn.outputSize);
                }}
                className={i === clickedId ? "btn active" : "btn"}
                value={btn.value}
            >
                {btn.label}
            </button>
        ))}
    </div>
  )
}

export default ButtonGroup