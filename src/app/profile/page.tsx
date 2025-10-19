"use client";
import { motion } from "framer-motion";
import { PencilIcon, UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import PhoneInput from "@/components/PhoneInput";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Array<{ id: string; created_at: string; product_slug: string; amount: number; status: string }>>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const supabase = supabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Ensure profile row exists and fetch details
        await supabase.from('profiles').upsert({ id: user.id, email: user.email ?? '' });
        const { data: profile } = await supabase.from('profiles').select('name, birthdate, phone').eq('id', user.id).single();
        setName(profile?.name || '');
        setBirthdate(profile?.birthdate || '');
        setPhone(profile?.phone || '');
      }
      setLoading(false);
      if (user) {
        setOrdersLoading(true);
        const { data } = await supabase
          .from('orders')
          .select('id, created_at, product_slug, amount, status')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        setOrders(data ?? []);
        setOrdersLoading(false);
      }
    };
    getUser();
  }, []);

  const [name, setName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  async function savePersonal() {
    if (!user) return;
    setSaving(true);
    const supabase = supabaseBrowser();
    await supabase.from('profiles').upsert({ id: user.id, email: user.email ?? '', name, birthdate: birthdate || null, phone });
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please login to view your profile</div>
          <a href="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
            <span>/</span>
            <a href="/dashboard" className="hover:text-purple-400 transition-colors">My account</a>
            <span>/</span>
            <span className="text-purple-400">Profile</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
              <h2 className="text-2xl font-bold text-white mb-6">My account</h2>
              <nav className="space-y-4">
                <a href="/dashboard" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">
                  Dashboard
                </a>
                <a href="/profile" className="block text-purple-400 font-medium py-2 border-l-2 border-purple-400 pl-4">
                  Profile
                </a>
                <a href="/orders" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">
                  Orders
                </a>
                <a href="/settings" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">
                  Settings
                </a>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
            
            <div className="space-y-6">
              {/* Personal Details */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Personal details - optional</h3>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Birthdate</label>
                    <input type="date" value={birthdate} onChange={(e)=>setBirthdate(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <button onClick={savePersonal} disabled={saving} className="rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent orders</h3>
                  <a href="/orders" className="text-purple-400 hover:text-purple-300 text-sm">View all</a>
                </div>
                {ordersLoading ? (
                  <div className="text-gray-300">Loading…</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between">
                        <div className="text-white">{o.product_slug}</div>
                        <div className="text-gray-300 text-sm">{new Date(o.created_at).toLocaleString()}</div>
                        <div className="text-gray-300 text-sm">{o.amount}</div>
                        <div className="text-gray-300 text-sm">{o.status}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-300">You have no orders yet.</div>
                )}
              </motion.div>

              {/* Email Address */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Email address</h3>
                  <EnvelopeIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-white">{user.email}</div>
              </motion.div>

              {/* Mobile Number */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Mobile number - optional</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative z-10">
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <div className="bg-white rounded-md"><PhoneInput defaultCountryCode="tr" onValueChange={(v)=>setPhone(v)} /></div>
                  </div>
                </div>
                <div className="mt-4">
                  <button onClick={savePersonal} disabled={saving} className="rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </motion.div>

              {/* Billing Details */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Billing details - optional</h3>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-white">-</div>
              </motion.div>

              {/* Security Settings */}
              <motion.div 
                className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Security settings</h3>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Two-factor authentication</span>
                    <span className="text-red-400 text-sm">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Login notifications</span>
                    <span className="text-green-400 text-sm">Enabled</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
