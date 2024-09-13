export default function Input({ value, onChange, type, placeholder, min = 1 }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="rounded-lg bg-neutral-500 px-10 py-3 outline-none"
    />
  );
}
