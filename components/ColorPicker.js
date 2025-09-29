// components/ColorPicker.js
export default function ColorPicker({ value, onChange }) {
  return (
    <input
      type="color"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: 40, height: 40, border: "none", cursor: "pointer" }}
      title="Choose your custom color"
    />
  );
}
