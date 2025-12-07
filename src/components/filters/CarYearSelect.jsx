import { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

export default function CarYearSelect({ brand, model, onYearSelect }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!brand || !model) return;

    // On récupère tous les trims pour extraire les années disponibles
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}&model=${model}`;

    fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.Trims) return;

        const uniqueYears = Array.from(
          new Set(data.Trims.map((t) => t.model_year))
        )
          .filter(Boolean)
          .sort((a, b) => b - a);

        setYears(uniqueYears);
      });
  }, [brand, model]);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    onYearSelect(e.target.value); // remonte la valeur sélectionnée au parent
  };

  return (
    <select value={selectedYear} onChange={handleChange} style={{ padding: "8px" }}>
      <option value="">Select Year</option>
      {years.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
}
