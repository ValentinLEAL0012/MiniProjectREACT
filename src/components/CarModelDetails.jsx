import { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";

import CarImageGallery from "./CarImageGallery.jsx";
import CarPowerFilter from "./filters/CarPowerFilter";
import CarDoorsFilter from "./filters/CarDoorsFilter";
import CarTransmissionFilter from "./filters/CarTransmissionFilter";
import useCarFilters from "../hooks/useCarFilters";

export default function CarModelDetails({ brand, model, year }) {
  const [trims, setTrims] = useState([]);

  const { updateFilter, filteredTrims, resetFilters } = useCarFilters(trims);

  useEffect(() => {
    setTrims([]); // reset trims quand brand/model/year change
    if (!brand || !model || !year) return;

    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}&model=${model}`;

    fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        const allTrims = data.Trims || [];

        // Filtrage immédiat par année sélectionnée
        const filteredByYear = allTrims.filter((t) => t.model_year == year);

        setTrims(filteredByYear);
      })
      .catch(() => setTrims([]));
  }, [brand, model, year]);

  if (!trims.length)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        No data available for this model & year.
      </p>
    );

  const keysToShow = [
    { key: "model_trim", label: "Trim" },
    { key: "model_year", label: "Year" },
    { key: "model_body", label: "Body" },
    { key: "model_engine_cc", label: "Engine (cc)" },
    { key: "model_engine_power_ps", label: "Power (PS)" },
    { key: "model_transmission_type", label: "Transmission" },
    { key: "model_doors", label: "Doors" },
    { key: "model_seats", label: "Seats" },
    { key: "make_country", label: "Country" },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Filtres */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <CarPowerFilter trims={trims} onSelect={(v) => updateFilter("power", v)} />
        <CarDoorsFilter trims={trims} onSelect={(v) => updateFilter("doors", v)} />
        <CarTransmissionFilter
          trims={trims}
          onSelect={(v) => updateFilter("transmission", v)}
        />
      </div>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Model Details</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 320px)", // 2 cartes par ligne
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* Première case : image du modèle */}
        <div
          style={{ gridColumn: "span 2", display: "flex", justifyContent: "center" }}
        >
          <CarImageGallery brand={brand} model={model} />
        </div>

        {/* Trims filtrés */}
        {filteredTrims.map((trim) => (
          <div
            key={trim.model_id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fafafa",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {keysToShow.map(({ key, label }) => (
              <p key={key}>
                <strong>{label}:</strong> {trim[key] || "N/A"}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}