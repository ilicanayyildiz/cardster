"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Product = {
  slug: string;
  name: string;
  category: string;
  amounts: number[];
  active: boolean;
  created_at?: string;
};

type CategoryOption = { label: string; value: string };
// Categories to be stored in DB as enum product_category
const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: "Mobile top-up", value: "topup" },
  { label: "eSIM", value: "esim" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Shopping", value: "shopping" },
  { label: "Game cards", value: "gamecards" },
  { label: "Food", value: "food" },
  { label: "Travel", value: "travel" },
];

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Product>>({ active: true, category: 'entertainment' });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Product>>({});

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.replace('/');
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      if (profile?.role !== 'admin') return router.replace('/');
      fetchProducts();
    });
  }, [router]);

  async function fetchProducts() {
    setLoading(true);
    const supabase = supabaseBrowser();
    const { data: session } = await supabase.auth.getSession();
    const bearer = session.session?.access_token;
    const res = await fetch('/api/admin/products', {
      cache: 'no-store',
      headers: bearer ? { authorization: `Bearer ${bearer}` } as any : undefined,
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json?.error || 'Failed to load products');
    } else {
      const list = json as Product[];
      setProducts(list);
    }
    setLoading(false);
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      slug: String(form.slug || '').trim(),
      name: String(form.name || '').trim(),
      category: String(form.category || '').trim(),
      amounts: String(form.amounts || '')
        .split(',')
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isFinite(n) && n > 0),
      active: !!form.active,
    };
    const supabase = supabaseBrowser();
    const { data: session } = await supabase.auth.getSession();
    const bearer = session.session?.access_token;
    let res: Response;
    if (imageFile) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, Array.isArray(v) ? (v as number[]).join(',') : String(v)));
      fd.append('image', imageFile);
      res = await fetch('/api/admin/products', { method: 'POST', headers: bearer ? { authorization: `Bearer ${bearer}` } as any : undefined, body: fd });
    } else {
      res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(bearer ? { authorization: `Bearer ${bearer}` } : {}) },
        body: JSON.stringify(payload),
      });
    }
    const json = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(json?.error || 'Failed to create');
      return;
    }
    setForm({ active: true });
    setImageFile(null);
    fetchProducts();
  }

  async function onDelete(slug: string) {
    if (!confirm(`Delete ${slug}?`)) return;
    const supabase = supabaseBrowser();
    const { data: session } = await supabase.auth.getSession();
    const bearer = session.session?.access_token;
    const res = await fetch(`/api/admin/products?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
      headers: bearer ? { authorization: `Bearer ${bearer}` } as any : undefined,
    });
    const json = await res.json();
    if (!res.ok) {
      alert(json?.error || 'Delete failed');
      return;
    }
    fetchProducts();
  }

  async function onSaveEdit() {
    if (!editingSlug) return;
    const payload: any = { slug: editingSlug };
    if (editDraft.name !== undefined) payload.name = editDraft.name;
    if (editDraft.category !== undefined) payload.category = editDraft.category;
    if (editDraft.amounts !== undefined) payload.amounts = String(editDraft.amounts)
      .split(',').map((s: string) => Number(s.trim())).filter((n: number) => Number.isFinite(n));
    if (editDraft.active !== undefined) payload.active = !!editDraft.active;

    const supabase = supabaseBrowser();
    const { data: session } = await supabase.auth.getSession();
    const bearer = session.session?.access_token;
    const res = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(bearer ? { authorization: `Bearer ${bearer}` } : {}) },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      alert(json?.error || 'Update failed');
      return;
    }
    setEditingSlug(null);
    setEditDraft({});
    fetchProducts();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-white">Products</h1>
      <p className="mt-2 text-gray-300">Create, update, and archive products.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl bg-white p-6 text-black">
          <div className="font-semibold mb-4 text-black">Create product</div>
          <form onSubmit={onCreate} className="space-y-3">
            <input placeholder="slug" className="w-full border px-3 py-2 rounded text-black" value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            <input placeholder="name" className="w-full border px-3 py-2 rounded text-black" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <select
              className="w-full border px-3 py-2 rounded text-black"
              value={form.category || ''}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="" disabled>Select category</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <input placeholder="amounts (comma separated)" className="w-full border px-3 py-2 rounded text-black" value={(form.amounts as any) || ''} onChange={(e) => setForm({ ...form, amounts: e.target.value as any })} required />
            <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files?.[0] || null)} className="w-full border px-3 py-2 rounded text-black" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> active</label>
            <button disabled={saving} className="rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">{saving ? 'Saving...' : 'Create'}</button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>
        </div>

        <div className="border rounded-xl bg-white p-6 text-black">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-black">All products</div>
            <div className="flex items-center gap-2">
              <input
                placeholder="Search by slug or name"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="border rounded px-2 py-1 text-black"
              />
              <label className="text-sm text-black">Category</label>
              <select
                className="border rounded px-2 py-1 text-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full text-sm text-black">
                <thead>
                  <tr className="text-left border-b text-black">
                    <th className="py-2 pr-4 text-black">Slug</th>
                    <th className="py-2 pr-4 text-black">Name</th>
                    <th className="py-2 pr-4 text-black">Category</th>
                    <th className="py-2 pr-4 text-black">Amounts</th>
                    <th className="py-2 pr-4 text-black">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
                    .filter((p) => !search || p.slug.includes(search) || p.name.toLowerCase().includes(search.toLowerCase()))
                    .map((p) => (
                    <tr key={p.slug} className="border-b last:border-0 text-black">
                      <td className="py-2 pr-4 text-black">{p.slug}</td>
                      <td className="py-2 pr-4 text-black">
                        {editingSlug === p.slug ? (
                          <input value={editDraft.name ?? p.name} onChange={(e)=>setEditDraft((d)=>({ ...d, name: e.target.value }))} className="border rounded px-2 py-1" />
                        ) : p.name}
                      </td>
                      <td className="py-2 pr-4 text-black">
                        {editingSlug === p.slug ? (
                          <select value={editDraft.category ?? p.category} onChange={(e)=>setEditDraft((d)=>({ ...d, category: e.target.value }))} className="border rounded px-2 py-1">
                            {CATEGORY_OPTIONS.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                          </select>
                        ) : p.category}
                      </td>
                      <td className="py-2 pr-4 text-black">
                        {editingSlug === p.slug ? (
                          <input value={(editDraft.amounts as any) ?? p.amounts?.join(', ')} onChange={(e)=>setEditDraft((d)=>({ ...d, amounts: e.target.value as any }))} className="border rounded px-2 py-1" />
                        ) : p.amounts?.join(', ')}
                      </td>
                      <td className="py-2 pr-4 text-black">
                        {editingSlug === p.slug ? (
                          <input type="checkbox" checked={(editDraft.active as any) ?? p.active} onChange={(e)=>setEditDraft((d)=>({ ...d, active: e.target.checked }))} />
                        ) : (p.active ? 'Yes' : 'No')}
                      </td>
                      <td className="py-2 pr-4 text-black">
                        {editingSlug === p.slug ? (
                          <div className="flex items-center gap-2">
                            <button onClick={onSaveEdit} className="text-xs px-2 py-1 rounded bg-green-600 text-white">Save</button>
                            <button onClick={()=>{ setEditingSlug(null); setEditDraft({}); }} className="text-xs px-2 py-1 rounded bg-gray-300 text-black">Cancel</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={()=>{ setEditingSlug(p.slug); setEditDraft({}); }} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Edit</button>
                            <button onClick={()=>onDelete(p.slug)} className="text-xs px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


