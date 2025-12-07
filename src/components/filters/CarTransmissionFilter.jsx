export default function CarTransmissionFilter({ trims, onSelect }) {
  const transmissions = Array.from(
    new Set(trims.map((t) => t.model_transmission_type).filter(Boolean))
  );

  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: "8px" }}>
      <option value="">Transmission (All)</option>
      {transmissions.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}
