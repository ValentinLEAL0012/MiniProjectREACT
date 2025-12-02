import { useState, useEffect } from "react";
import CarImageCard from "./CarImageCard.jsx";
import CarImageGallery from "./CarImageGallery.jsx";

export default function CarModel({ makeId, makeName }) {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeid/${makeId}?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const modelsList = data.Results.slice(0, 20);
        setModels(modelsList);
      });
  }, [makeId]);

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2>Models for {makeName}</h2>

      <div style={{ marginTop: "15px" }}>
        {models.map((model) => (
          <button
            key={model.Model_ID}
            onClick={() => setSelectedModel(model.Model_Name)}
            style={{
              margin: "5px",
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1px solid #555",
              background: "#f7f7f7",
              cursor: "pointer",
            }}
          >
            {model.Model_Name}
          </button>
        ))}
      </div>

      {/* Affichage de la carte image */}
      {selectedModel && (
       <CarImageGallery brand={makeName} model={selectedModel} />

      )}
    </div>
  );
}
