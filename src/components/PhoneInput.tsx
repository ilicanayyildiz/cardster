"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { COUNTRIES } from "@/lib/countries";
import { DIAL_CODES } from "@/lib/dialCodes";

type Props = {
  defaultCountryCode?: string; // ISO 3166-1 alpha-2
  onValueChange?: (value: string) => void; // +<dial><local>
};

export default function PhoneInput({ defaultCountryCode = "us", onValueChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(defaultCountryCode);
  const [number, setNumber] = useState(""); // raw local digits (no +, spaces)
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number; width: number }>({ left: 0, top: 0, width: 0 });

  const items = useMemo(() => {
    return COUNTRIES.filter((c) => !!(DIAL_CODES as any)[c.code])
      .map((c) => ({ code: c.code, name: c.name, dial: (DIAL_CODES as any)[c.code] as string }));
  }, []);

  const dialList = useMemo(() => {
    // list of [code, dialDigits] sorted by length desc for longest-prefix match
    return Object.entries(DIAL_CODES)
      .map(([code, dial]) => [code, (dial as string).replace("+", "")] as [string, string])
      .sort((a, b) => b[1].length - a[1].length);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.name.toLowerCase().includes(q) || i.dial.includes(q));
  }, [search, items]);

  const selectedDial = (DIAL_CODES as any)[country] || "+";

  function formatLocal(c: string, local: string) {
    if (c === "tr") {
      // 10 digits => 3-3-2-2
      const p = [3, 3, 2, 2];
      let idx = 0;
      const parts: string[] = [];
      for (const n of p) {
        if (idx >= local.length) break;
        parts.push(local.slice(idx, idx + n));
        idx += n;
      }
      return parts.filter(Boolean).join(" ");
    }
    if (c === "us") {
      // 10 digits => 3-3-4
      const p = [3, 3, 4];
      let idx = 0;
      const parts: string[] = [];
      for (const n of p) {
        if (idx >= local.length) break;
        parts.push(local.slice(idx, idx + n));
        idx += n;
      }
      return parts.filter(Boolean).join(" ");
    }
    // default: group by 3s
    const chunks = local.match(/.{1,3}/g) || [];
    return chunks.join(" ");
  }

  function displayValue(c: string, rawDigits: string) {
    const dial = (DIAL_CODES as any)[c] || "+";
    const dialDigits = dial.replace("+", "");
    let local = rawDigits;
    if (local.length === 0) return "";
    if (local.startsWith(dialDigits)) local = local.slice(dialDigits.length);
    // if user is still typing a dial code (rawDigits is a prefix of some known dial),
    // don't show current country's +code; show raw digits only.
    if (!rawDigits.startsWith(dialDigits)) {
      const isDialPrefix = dialList.some(([, d]) => d.startsWith(rawDigits));
      if (isDialPrefix) return rawDigits;
    }
    const formattedLocal = formatLocal(c, local);
    return `+${dialDigits}${formattedLocal ? ` ${formattedLocal}` : ""}`;
  }

  function updateMenuPosition() {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Use page coords for absolute portal under body
    setMenuPos({ left: r.left + window.scrollX, top: r.bottom + 4 + window.scrollY, width: r.width });
  }

  useEffect(() => {
    if (!open) return;
    updateMenuPosition();
    const onWin = () => updateMenuPosition();
    window.addEventListener('scroll', onWin, true);
    window.addEventListener('resize', onWin);
    return () => {
      window.removeEventListener('scroll', onWin, true);
      window.removeEventListener('resize', onWin);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Input/button */}
      <div className="flex h-12 items-center rounded-md border bg-white">
        <button
          type="button"
          onClick={() => { if (!open) updateMenuPosition(); setOpen((o) => !o); }}
          className="flex items-center gap-2 h-full px-3 border-r"
        >
          <img src={`https://flagcdn.com/24x18/${country}.png`} alt={country} width={24} height={18} />
          {/* Dial is shown only as prefix; input shows local, country code implied */}
          <span className="text-gray-900">{selectedDial}</span>
        </button>
        <input
          className="flex-1 px-3 outline-none text-gray-900 placeholder-gray-500"
          placeholder="Phone"
          value={displayValue(country, number)}
          onChange={(e) => {
            // Simplify: no auto-country detection; user picks from dropdown
            const digits = e.target.value.replace(/\D/g, "");
            const currentDial = ((DIAL_CODES as any)[country] as string).replace("+", "");
            const local = digits.startsWith(currentDial) ? digits.slice(currentDial.length) : digits;
            setNumber(local);
            // emit pretty formatted value e.g. +1 548 848 6528
            const pretty = displayValue(country, digits);
            onValueChange && onValueChange(pretty);
          }}
        />
      </div>

      {open && createPortal(
        <div className="absolute z-[9999] rounded-md border bg-white shadow-lg max-h-80 overflow-auto" style={{ left: menuPos.left, top: menuPos.top, width: menuPos.width }}>
          <div className="p-2 border-b">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
              className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500"
            />
          </div>
          <ul className="py-2 text-sm">
            {filtered.map((i) => (
              <li key={i.code}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(i.code);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 text-left"
                >
                  <img src={`https://flagcdn.com/24x18/${i.code}.png`} alt={i.name} width={24} height={18} />
                  <span className="flex-1 text-gray-900">{i.name}</span>
                  <span className="text-gray-700">{i.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>, document.body)
      }
    </div>
  );
}


