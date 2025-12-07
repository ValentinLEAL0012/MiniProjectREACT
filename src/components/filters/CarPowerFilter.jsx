import { useState } from "react";

export default function CarPowerFilter({ trims, onSelect }) {
  const powers = Array.from(
    new Set(trims.map((t) => t.model_engine_power_ps).filter(Boolean))
  ).sort((a, b) => a - b);

  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: "8px" }}>
      <option value="">Power (All)</option>
      {powers.map((p) => (
        <option key={p} value={p}>{p} PS</option>
      ))}
    </select>
  );
}
