import { useState, useEffect } from "react";

export default function SearchCar({ onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
      .then((res) => res.json())
      .then((data) => {
        const allBrands = data.Results;
        setBrands(allBrands);

        // On limite l'affichage initial à 10
        setFilteredBrands(allBrands.slice(0, 10));
      });
  }, []);

  const handleSearch = (value) => {
    const results = brands
      .filter((b) =>
        b.Make_Name.toLowerCase().startsWith(value.toLowerCase())
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
        style={{
          padding: "8px 12px",
          width: "250px",
          marginTop: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <div style={{ marginTop: "25px" }}>
        {filteredBrands.map((brand) => (
          <button
            key={brand.Make_ID}
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
            {brand.Make_Name}
          </button>
        ))}
      </div>
    </div>
  );
}
