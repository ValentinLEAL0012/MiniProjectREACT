// Header.jsx
export default function Header() {
  return (
    <header style={{
      backgroundColor: "#1E3A8A", // bleu foncé
      color: "white",
      padding: "20px",
      textAlign: "center",
      borderBottom: "2px solid #2563EB",
    }}>
      <h1 style={{ margin: 0, fontSize: "2rem" }}>Car Explorer</h1>
      <p style={{ margin: 0, fontSize: "1rem", color: "#BBDEFB" }}>
        Browse and filter car models easily
      </p>
    </header>
  );
}
