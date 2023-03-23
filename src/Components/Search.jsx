import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import api from "../api";

function Search({ data, setData }) {
    const [search, setSearch] = useState(null);
  
    const loadOptions = (inputValue) => {
        api.stockTimeSeries(search)
        .then((response) => {
            setData(response.data);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleSearch = (searchData) => {
        setSearch(searchData);
    }

    return (
    <>
        <AsyncPaginate placeholder="Find by company symbol" debounceTimeout={600} onChange={handleSearch} loadOptions={loadOptions} />
    </>
  )
}

export default Search