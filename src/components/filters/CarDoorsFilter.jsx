export default function CarDoorsFilter({ trims, onSelect }) {
  const doors = Array.from(
    new Set(trims.map((t) => t.model_doors).filter(Boolean))
  ).sort();

  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: "8px" }}>
      <option value="">Doors (All)</option>
      {doors.map((d) => (
        <option key={d} value={d}>{d} doors</option>
      ))}
    </select>
  );
}
