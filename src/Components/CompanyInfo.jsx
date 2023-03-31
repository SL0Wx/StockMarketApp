import React, { useState, useEffect } from 'react'

function CompanyInfo({ data, favorites, setFavorites }) {
  const [favorite, setFavorite] = useState(false);

  function handleSetFavorite() {
    if (favorite) {
      setFavorite(false);
      setFavorites(favorites.filter(item => item.label !== data.name))
    } else {
      setFavorite(true);
      setFavorites([...favorites, { value: data.values.symbol, label: data.name }])
    }
  }

  useEffect(() => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].label.includes(data.name)) {
        setFavorite(true);
        break;
      } else {
        setFavorite(false);
      }
    }
  }, [data])

  return (
    <div className="container" style={favorites.length > 0 ? { width: "40%" } : { width: "90%" }}>
      <div className="companyInfo">
        <div className="header">
          <h2 className="name">{data.name}</h2>
          <img src={`icons/${favorite ? "favoriteSolid.svg" : "favorite.svg"}`} alt="favorite" className="favorite" onClick={handleSetFavorite} />
        </div>
        <div className="content">
          <div className="details">
            <div className="parameterRow">
              <span className="parameterLabel"><b className="detailsLabel">Details</b></span>
            </div>
            <div className="parameterRow">
              <span className="parameterLabel">Currency:</span>
              <span className="parameterValue">{data.values.currency}</span>
            </div>
            <div className="parameterRow">
              <span className="parameterLabel">Exchange:</span>
              <span className="parameterValue">{data.values.exchange}</span>
            </div>
            <div className="parameterRow">
              <span className="parameterLabel">Exchange Timezone:</span>
              <span className="parameterValue">{data.values.exchange_timezone}</span>
            </div>
            <div className="parameterRow">
              <span className="parameterLabel">Type:</span>
              <span className="parameterValue">{data.values.type}</span>
            </div>
          </div>   
        </div>
      </div>
    </div>
    
  )
}

export default CompanyInfo