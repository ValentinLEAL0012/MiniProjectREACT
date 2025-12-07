import { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import CarYearSelect from "./filters/CarYearSelect.jsx";
import CarModelDetails from "./CarModelDetails.jsx";
import CarImageGallery from "./CarImageGallery.jsx";

export default function CarModel({ selectedBrand }) {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!selectedBrand) return;

    const make = encodeURIComponent(selectedBrand.make_display);
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}`;

    fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Models && data.Models.length > 0) {
          const modelsList = data.Models.slice(0, 100);
          setModels(modelsList);
          setSelectedModel("");
          setSelectedYear("");
        } else {
          setModels([]);
          setSelectedModel("");
          setSelectedYear("");
        }
      })
      .catch((err) => {
        console.error("Erreur fetch JSONP modèles:", err);
        setModels([]);
        setSelectedModel("");
        setSelectedYear("");
      });
  }, [selectedBrand]);

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      {selectedBrand && <h2>Models for {selectedBrand.make_display}</h2>}

      {models.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px" }}>
          {/* Liste des modèles */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              padding: "8px 12px",
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <option value="">Select a model...</option>
            {models.map((model) => (
              <option key={model.model_id} value={model.model_name}>
                {model.model_name}
              </option>
            ))}
          </select>

          {/* Liste des années */}
          {selectedModel && (
            <CarYearSelect
              brand={selectedBrand.make_display}
              model={selectedModel}
              onYearSelect={(setSelectedYear)}
            />
          )}
        </div>
      ) : (
        <p>No models found for this brand.</p>
      )}

      {/* {selectedModel && (
        <CarImageGallery brand={selectedBrand.make_display} model={selectedModel} />
      )} */}
      

      {/* Détails du modèle */}
      {selectedModel && selectedYear && (
        <CarModelDetails
          brand={selectedBrand.make_display}
          model={selectedModel}
          year={selectedYear}
        />
      )}
    </div>
  );
}
