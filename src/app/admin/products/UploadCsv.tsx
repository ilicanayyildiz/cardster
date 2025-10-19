"use client";
import { useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function UploadCsv({ onImported }: { onImported: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function downloadTemplate() {
    const csv = [
      'slug,name,category,amounts,active',
      'vodafone-topup,Vodafone Top-up,topup,"10,20,50",true',
      'ikea-card,IKEA Gift Card,shopping,"25,50,100",true',
      'xbox-card,Xbox Gift Card,gamecards,"10,25,50,100",true',
      'starbucks-card,Starbucks Gift Card,food,"10,25,50",true',
      'uber-card,Uber Gift Card,travel,"25,50,100",true',
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const text = await file.text();
      const rows = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (!rows.length) throw new Error("Empty file");
      // Expect header: slug,name,category,amounts,active
      const [header, ...lines] = rows;
      const cols = header.split(',').map((h) => h.trim().toLowerCase());
      const idx = {
        slug: cols.indexOf('slug'),
        name: cols.indexOf('name'),
        category: cols.indexOf('category'),
        amounts: cols.indexOf('amounts'),
        active: cols.indexOf('active'),
      };
      if (idx.slug < 0 || idx.name < 0 || idx.category < 0 || idx.amounts < 0) {
        throw new Error("Header must include slug,name,category,amounts[,active]");
      }
      const payload = lines.map((line) => {
        const parts = line.split(',');
        // amounts alanı virgüllü olduğundan, active sütunu varsa ona kadar olan tüm parçaları birleştir
        const amountsJoined = idx.active >= 0
          ? parts.slice(idx.amounts, idx.active).join(',')
          : parts.slice(idx.amounts).join(',');
        return {
          slug: parts[idx.slug]?.trim(),
          name: parts[idx.name]?.trim(),
          category: parts[idx.category]?.trim(),
          amounts: amountsJoined.trim(),
          active: idx.active >= 0 ? /^true|1|yes$/i.test((parts[idx.active] || '').trim()) : true,
        };
      }).filter((r) => r.slug && r.name && r.category && r.amounts);
      const supabase = supabaseBrowser();
      const { data: session } = await supabase.auth.getSession();
      const bearer = session.session?.access_token;
      const res = await fetch('/api/admin/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(bearer ? { authorization: `Bearer ${bearer}` } : {}) },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Import failed');
      onImported();
      if (inputRef.current) inputRef.current.value = '';
    } catch (e: any) {
      setErr(e?.message || 'Import failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={downloadTemplate} className="text-xs underline text-blue-600">Download template</button>
      <input ref={inputRef} type="file" accept=".csv" onChange={handleFile} className="text-xs" />
      {busy && <span className="text-xs text-gray-500">Importing…</span>}
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}


