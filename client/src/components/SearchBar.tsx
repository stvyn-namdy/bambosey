// client/src/components/SearchBar.tsx
"use client";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Search products…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}
