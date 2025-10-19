"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/client";

type Order = {
  id: string;
  created_at: string;
  product_slug: string;
  amount: number;
  status: string;
  code: string | null;
  category: string | null;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;

  const SERVICE_FEE_RATE = 0.277;
  const formatEUR = (n: number) => `EUR ${n.toFixed(2)}`;

  function imageKey(slug: string): string {
    if (slug === "apexlegends") return "eaapex"; // bucket key
    if (slug === "runeterra") return "legendsofruneterra";
    return slug;
  }
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});
  const [brokenImage, setBrokenImage] = useState<Record<string, boolean>>({});

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const uniqueCategories = Array.from(new Set((orders ?? []).map(o => o.category ?? ""))).filter(Boolean);
  const uniqueStatuses = Array.from(new Set((orders ?? []).map(o => o.status)));

  const filteredOrders = (orders ?? []).filter((o) => {
    if (categoryFilter !== "all" && (o.category ?? "") !== categoryFilter) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (fromDate) {
      const from = new Date(fromDate + "T00:00:00");
      if (new Date(o.created_at) < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate + "T23:59:59");
      if (new Date(o.created_at) > to) return false;
    }
    return true;
  });

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(async ({ data }) => {
      const isLoggedIn = !!data.user;
      setAuthed(isLoggedIn);
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }
      const userId = data.user!.id;
      const { data: rows } = await supabase
        .from("orders")
        .select("id, created_at, product_slug, amount, status, code, category")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      setOrders(rows ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-white">Orders</h1>

        {loading ? (
          <div className="mt-6 text-gray-300">Loading…</div>
        ) : authed === false ? (
          <div className="mt-6">
            <a href="/login" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">Login to view orders</a>
          </div>
        ) : orders && orders.length > 0 ? (
          <>
            {/* Filters */}
            <div className="mt-6 bg-gray-900/50 backdrop-blur rounded-xl p-4 border border-purple-800/30">
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-white mb-1">Category</label>
                  <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
                    <option value="all">All</option>
                    {uniqueCategories.map(c => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white mb-1">Status</label>
                  <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
                    <option value="all">All</option>
                    {uniqueStatuses.map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white mb-1">From</label>
                  <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs text-white mb-1">To</label>
                  <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <button onClick={()=>{setCategoryFilter("all"); setStatusFilter("all"); setFromDate(""); setToDate("");}}
                  className="rounded bg-gray-800 border border-gray-700 px-3 py-1 text-gray-200 hover:bg-gray-700">Clear</button>
                <span className="text-gray-200">{filteredOrders.length} result(s)</span>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
            {filteredOrders.map((o) => (
              <div key={o.id} className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-14 ring-1 ring-gray-300 rounded bg-white overflow-hidden">
                      {brokenImage[o.id] ? (
                        <div className="flex h-full w-full items-center justify-center text-xs text-white bg-gray-800">{o.product_slug.slice(0,1).toUpperCase()}</div>
                      ) : (
                        <Image
                          src={supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/images/${imageKey(o.product_slug)}.png` : `/images/${imageKey(o.product_slug)}.png`}
                          alt={o.product_slug}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                          onError={()=>setBrokenImage((m)=>({ ...m, [o.id]: true }))}
                        />
                      )}
                    </div>
                    <div className="text-white font-medium">{o.product_slug}</div>
                  </div>
                  <div className="text-sm text-gray-400">{new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-gray-300">Amount: {formatEUR(o.amount)}</div>
                <div className="text-gray-300">Status: {o.status}</div>
                <div className="mt-2 text-gray-300">TOTAL: {formatEUR(o.amount + o.amount * SERVICE_FEE_RATE)}</div>
                {o.code && (
                  <div className="mt-3">
                    <div className="text-sm text-gray-400">Code</div>
                    <div className="mt-1 inline-flex items-center gap-3 relative">
                      <span className={`relative text-lg font-mono select-all ${revealedMap[o.id] ? 'text-white' : 'text-transparent'}`}>
                        {o.code}
                        {!revealedMap[o.id] && (
                          <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></span>
                        )}
                      </span>
                      <button
                        onClick={() => setRevealedMap((m) => ({ ...m, [o.id]: !m[o.id] }))}
                        className="rounded-md bg-gray-900 text-white px-3 py-1 text-xs hover:bg-gray-800"
                      >
                        {revealedMap[o.id] ? 'Hide' : 'Reveal'}
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(o.code!);
                          setCopiedId(o.id);
                          setTimeout(() => setCopiedId(null), 3000);
                        }}
                        className="rounded-md bg-gray-200 text-gray-900 px-3 py-1 text-xs hover:bg-gray-300"
                      >
                        Copy
                      </button>
                      {copiedId === o.id && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
          </>
        ) : (
          <div className="mt-6 bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30 text-gray-300">You have no orders yet.</div>
        )}
      </div>
    </div>
  );
}


