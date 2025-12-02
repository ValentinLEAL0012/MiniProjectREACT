export default function CarImageCard({ brand, model, imageUrl }) {
  const fallbackUrl = `https://placehold.co/600x400?text=${brand}+${model}`;

  return (
    <div
      style={{
        width: "300px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        margin: "15px auto",
        background: "#fff",
      }}
    >
      <img
        src={imageUrl || fallbackUrl}
        alt={model}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "15px", textAlign: "center" }}>
        <h3 style={{ margin: 0 }}>{brand}</h3>
        <p style={{ margin: "5px 0", fontWeight: "bold" }}>{model}</p>
      </div>
    </div>
  );
}
