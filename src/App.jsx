import { useState } from 'react'
import api from "./api";
import Search from './Components/Search';
import './App.css'

function App() {
  const [data, setData] = useState(null);

 

  return (
    <div className="App">
      <Search data={data} setData={setData} />
    </div>
  )
}

export default App
