import { useEffect, useState } from "react";
import CarImageCard from "./CarImageCard.jsx";

export default function CarImageGallery({ brand, model }) {
  const [images, setImages] = useState([]);

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
        if (data.hits) {
          setImages(data.hits); // 👉 contient déjà plusieurs images
        }
      });
  }, [brand, model]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {images.map((img, index) => (
        <CarImageCard
          key={index}
          brand={brand}
          model={model}
          imageUrl={img.webformatURL}
        />
      ))}
    </div>
  );
}
