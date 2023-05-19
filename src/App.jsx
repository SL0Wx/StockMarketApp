import { useState, useEffect } from 'react'
import Search from './Components/Search';
import { TWELVE_API_URL, twelveApiOptions } from './api';
import './App.css'

import CompanyInfo from './Components/CompanyInfo';
import Chart from './Components/Chart';

function App() {
  const [searchData, setSearchData] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [closeValue, setCloseValue] = useState(null);
  const [timeSeries, setTimeSeries] = useState(null);
  const [interval, setInterval] = useState("1day");
  const [outputSize, setOutputSize] = useState("22");
  const [loadData, setLoadData] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleOnSearchChange = (searchData) => {
    const symbol = searchData.value;
    fetch(`${TWELVE_API_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&format=json`, twelveApiOptions)
      .then(response => response.json())
      .then(response => {
        setCloseValue(response.values[0].close);
        setCompanyData({
          name: searchData.label,
          values: response.meta,
        });
        setTimeSeries({
          labels: response.values.reverse().map((data) => data.datetime),
          datasets: [
            {
              label: "Close Value in USD",
              data: response.values.map((data) => data.close),
              backgroundColor: "#09ad03",
              borderColor: "green",
              borderWidth: 2,
            },
          ],
        });
      })
  }

  useEffect(() => {
    if (loadData) handleOnSearchChange(searchData);
  }, [interval, outputSize])

  return (
    <div className="App">
      <Search favorites={favorites} onSearchChange={handleOnSearchChange} setSearchData={setSearchData} />
      {timeSeries && companyData && (
        <>
        <CompanyInfo data={companyData} favorites={favorites} setFavorites={setFavorites} />
        <div className="chartBox">
          <Chart data={timeSeries} closeValue={closeValue} setInterval={setInterval} setOutputSize={setOutputSize} setLoadData={setLoadData} />
        </div>
        </>
      )}
    </div>
  )
}

export default App
