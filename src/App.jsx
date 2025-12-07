import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CarSearch from "./components/CarSearch.jsx";
import CarModel from "./components/CarModel.jsx";
import { useState } from "react";

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <div>
      <Header />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <CarSearch onBrandSelect={setSelectedBrand} />
        {selectedBrand && <CarModel selectedBrand={selectedBrand} />}
      </div>
      <Footer />
    </div>
  );
}
