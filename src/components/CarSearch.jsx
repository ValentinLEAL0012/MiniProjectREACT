import { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

export default function CarSearch({ onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    fetchJsonp("https://www.carqueryapi.com/api/0.3/?cmd=getMakes")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.Makes) {
          const allBrands = data.Makes;
          setBrands(allBrands);
          setFilteredBrands(allBrands.slice(0, 10));
        } else {
          setBrands([]);
          setFilteredBrands([]);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch marques:", err);
        setBrands([]);
        setFilteredBrands([]);
      });
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredBrands(brands.slice(0, 10));
      return;
    }
    const results = brands
      .filter((b) =>
        b.make_display.toLowerCase().startsWith(value.toLowerCase())
      )
      .slice(0, 10);
    setFilteredBrands(results);
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>Search a Car Brand</h1>
      <input
        type="text"
        placeholder="Search a brand..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{ padding: "8px 12px", width: "250px", marginTop: "15px" }}
      />
      <div style={{ marginTop: "25px" }}>
        {filteredBrands.map((brand) => (
          <button
            key={brand.make_id}
            onClick={() => onBrandSelect(brand)}
            style={{
              margin: "5px",
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "white",
              cursor: "pointer",
            }}
          >
            {brand.make_display}
          </button>
        ))}
        {filteredBrands.length === 0 && <p>No brands found.</p>}
      </div>
    </div>
  );
}
