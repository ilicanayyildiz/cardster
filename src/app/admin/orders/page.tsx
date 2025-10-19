"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  user_id: string;
  product_slug: string;
  amount: number;
  status: string;
  category: string | null;
  created_at: string;
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.replace('/');
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      if (profile?.role !== 'admin') return router.replace('/');
      fetchOrders();
    });
  }, [router]);

  async function fetchOrders() {
    setLoading(true);
    const supabase = supabaseBrowser();
    const { data: session } = await supabase.auth.getSession();
    const bearer = session.session?.access_token;
    const res = await fetch('/api/admin/orders', {
      cache: 'no-store',
      headers: bearer ? { authorization: `Bearer ${bearer}` } as any : undefined,
    });
    const json = await res.json();
    if (!res.ok) setError(json?.error || 'Failed to load');
    else setOrders(json as Order[]);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-white">Orders</h1>
      <p className="mt-2 text-gray-300">Recent orders</p>
      <div className="mt-6 border rounded-xl bg-white p-6 text-black">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-black">
              <thead>
                <tr className="text-left border-b text-black">
                  <th className="py-2 pr-4 text-black">ID</th>
                  <th className="py-2 pr-4 text-black">User</th>
                  <th className="py-2 pr-4 text-black">Product</th>
                  <th className="py-2 pr-4 text-black">Amount</th>
                  <th className="py-2 pr-4 text-black">Status</th>
                  <th className="py-2 pr-4 text-black">Category</th>
                  <th className="py-2 pr-4 text-black">Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 text-black">
                    <td className="py-2 pr-4 text-black">{o.id.slice(0, 8)}…</td>
                    <td className="py-2 pr-4 text-black">{o.user_id.slice(0, 8)}…</td>
                    <td className="py-2 pr-4 text-black">{o.product_slug}</td>
                    <td className="py-2 pr-4 text-black">{o.amount}</td>
                    <td className="py-2 pr-4 text-black">{o.status}</td>
                    <td className="py-2 pr-4 text-black">{o.category || '-'}</td>
                    <td className="py-2 pr-4 text-black">{new Date(o.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


