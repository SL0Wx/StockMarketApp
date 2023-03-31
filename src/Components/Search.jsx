import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { TWELVE_API_URL, twelveApiOptions } from "../api";

function Search({ favorites, onSearchChange, setSearchData }) {
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

    function handleSearchFavorites(company) {
        setSearch(company);
        setSearchData(company);
        onSearchChange(company);
    }

    return (
    <>
        <AsyncPaginate placeholder="Find by company symbol" debounceTimeout={600} value={search} onChange={handleSearch} loadOptions={loadOptions} />
        {favorites.length > 0 && (
            <div className="favContainer">
                <div className="favorites">
                    <label className="title"><b>Favorites</b></label>
                    {favorites.map((company, i) => (
                        <div className="favoritesList">
                            <label className="favoritesListItem" key={i} onClick={() => handleSearchFavorites(company)}>{company.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </>
  )
}

export default Search