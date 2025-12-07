import { useState, useMemo } from "react";

export default function useCarFilters(trims) {
  const [filters, setFilters] = useState({
    power: "",
    doors: "",
    transmission: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      power: "",
      doors: "",
      transmission: "",
    });
  };

  const filteredTrims = useMemo(() => {
    return trims
      .filter((t) => !filters.power || t.model_engine_power_ps === filters.power)
      .filter((t) => !filters.doors || t.model_doors === filters.doors)
      .filter(
        (t) =>
          !filters.transmission ||
          t.model_transmission_type === filters.transmission
      );
  }, [trims, filters]);

  return { filters, updateFilter, filteredTrims, resetFilters };
}
