"use client";

import { useMemo, useState } from "react";
import { COUNTRIES } from "@/lib/countries";

type Props = {
  selectedCode?: string; // ISO 3166-1 alpha-2
  onChange: (code: string) => void;
};

export default function CountrySelect({ selectedCode, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(() => COUNTRIES, []);
  const selected = items.find((c) => c.code === selectedCode);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, items]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-12 border rounded-md bg-white px-3 flex items-center justify-between text-gray-900"
      >
        <div className="flex items-center gap-2">
          {selected ? (
            <>
              <img src={`https://flagcdn.com/24x18/${selected.code}.png`} alt={selected.name} width={24} height={18} />
              <span>{selected.name}</span>
            </>
          ) : (
            <span className="text-gray-500">Select country</span>
          )}
        </div>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-md border bg-white shadow-lg max-h-80 overflow-auto">
          <div className="p-2 border-b">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500"
            />
          </div>
          <ul className="py-2 text-sm">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 text-left"
                >
                  <img src={`https://flagcdn.com/24x18/${c.code}.png`} alt={c.name} width={24} height={18} />
                  <span className="text-gray-900">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


