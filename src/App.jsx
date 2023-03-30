import { useState, useEffect } from 'react'
import Search from './Components/Search';
import { TWELVE_API_URL, twelveApiOptions } from './api';
import './App.css'

import CompanyInfo from './Components/CompanyInfo';
import Chart from './Components/Chart';

function App() {
  const [searchData, setSearchData] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [timeSeries, setTimeSeries] = useState(null);
  const [interval, setInterval] = useState("1day");
  const [outputSize, setOutputSize] = useState("22");

  const handleOnSearchChange = (searchData) => {
    const symbol = searchData.value;
    fetch(`${TWELVE_API_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&format=json`, twelveApiOptions)
      .then(response => response.json())
      .then(response => {
        setCompanyData(response.meta);
        setTimeSeries({
          labels: response.values.reverse().map((data) => data.datetime),
          datasets: [
            {
              label: "Average Value in USD",
              data: response.values.reverse().map((data) => data.close),
              backgroundColor: ["rgba(75,192,192,1)"],
              borderColor: "green",
              borderWidth: 2,
            },
          ],
        });
      })
  }

  useEffect(() => {
    handleOnSearchChange(searchData);
  }, [interval, outputSize])

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} setSearchData={setSearchData} />
      {timeSeries && companyData && (
        <>
        <CompanyInfo data={companyData} />
        <Chart data={timeSeries} setInterval={setInterval} setOutputSize={setOutputSize} />
        </>
      )}
    </div>
  )
}

export default App
