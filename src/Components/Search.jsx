import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { TWELVE_API_URL, twelveApiOptions } from "../api";

function Search({ onSearchChange, setSearchData }) {
    const [search, setSearch] = useState(null);
  
    const loadOptions = (inputValue) => {
        return fetch(`${TWELVE_API_URL}/symbol_search?symbol=${inputValue}&outputsize=5`, twelveApiOptions)
            .then(response => response.json())
            .then(response => {
                const data = response?.data.filter(company => company.exchange === "NASDAQ");
                return {
                    options: data.map(company => {
                            return {
                                value: company.symbol,
                                label: `${company.symbol}, ${company.instrument_name} (${company.country})`,
                        }
                    })
                }
            })
            .catch(err => console.log(err));
    };

    const handleSearch = (searchData) => {
        setSearch(searchData);
        setSearchData(searchData);
        onSearchChange(searchData);
    }

    return (
    <>
        <AsyncPaginate placeholder="Find by company symbol" debounceTimeout={600} value={search} onChange={handleSearch} loadOptions={loadOptions} />
    </>
  )
}

export default Search