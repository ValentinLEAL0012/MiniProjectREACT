import { useState } from "react";
import SearchCar from "./components/CarSearch.jsx";
import CarModel from "./components/CarModel.jsx";

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <div>
      <SearchCar onBrandSelect={setSelectedBrand} />

      {selectedBrand && (
        <CarModel
          makeId={selectedBrand.Make_ID}
          makeName={selectedBrand.Make_Name}
        />
      )}
    </div>
  );
}
