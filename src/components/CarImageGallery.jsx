import { useEffect, useState } from "react";
import CarImageCard from "./CarImageCard.jsx";

export default function CarImageGallery({ brand, model }) {
  const [image, setImage] = useState(null);

  const API_KEY = "43285716-9469bd68fd8d6d96222633db4";

  useEffect(() => {
    const query = `${brand} ${model} car`;

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=3`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          setImage(data.hits[0].webformatURL); // 👉 seule image
        } else {
          setImage(null);
        }
      });
  }, [brand, model]);

  return (
    <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
      {image && (
        <CarImageCard brand={brand} model={model} imageUrl={image} />
      )}
    </div>
  );
}
