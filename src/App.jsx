import { useState, useEffect } from 'react'
import Search from './Components/Search';
import { TWELVE_API_URL, twelveApiOptions } from './api';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [timeSeries, setTimeSeries] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const symbol = searchData.value;
    fetch(`${TWELVE_API_URL}/time_series?symbol=${symbol}&interval=1day&outputsize=30&format=json`, twelveApiOptions)
      .then(response => response.json())
      .then(response => {
        setTimeSeries(response.values);
      })
  }

  useEffect(() => {
    console.log(timeSeries);
  }, [timeSeries])

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  )
}

export default App
