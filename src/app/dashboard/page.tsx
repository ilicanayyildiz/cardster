"use client";
import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabase/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UserIcon, ShoppingBagIcon, CreditCardIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<{ slug: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = supabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: ordersData } = await supabase
          .from('orders')
          .select('id, product_slug, amount, created_at')
          .order('created_at', { ascending: false });
        setOrders(ordersData || []);
        const buckets: Record<string, number> = {};
        (ordersData || []).slice(0, 200).forEach((o: any) => {
          buckets[o.product_slug] = (buckets[o.product_slug] || 0) + 1;
        });
        const sorted = Object.entries(buckets)
          .map(([slug, count]) => ({ slug, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        setTopProducts(sorted);
      }
      
      setLoading(false);
    };
    getUser();
  }, []);

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
          <h1 className="text-2xl font-semibold text-white mb-4">Please login</h1>
          <p className="mt-4 text-gray-300 mb-6">Access your orders and account details.</p>
          <Link href="/login" className="inline-block rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 hover:from-purple-700 hover:to-pink-700 transition-all">
            Go to login
          </Link>
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
            <span className="text-purple-400">My account</span>
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
                <a href="/dashboard" className="block text-purple-400 font-medium py-2 border-l-2 border-purple-400 pl-4">
                  Dashboard
                </a>
                <a href="/profile" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">
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
            <h1 className="text-3xl font-bold text-white mb-8">Welcome, {user.email}</h1>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{orders.length}</p>
                  </div>
                  <ShoppingBagIcon className="w-8 h-8 text-purple-400" />
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-pink-900/30 to-gray-900/50 backdrop-blur rounded-xl p-6 border border-pink-800/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-white">
                      ${orders.reduce((sum, order) => sum + order.amount, 0)}
                    </p>
                  </div>
                  <CreditCardIcon className="w-8 h-8 text-pink-400" />
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-indigo-900/30 to-gray-900/50 backdrop-blur rounded-xl p-6 border border-indigo-800/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                  <UserIcon className="w-8 h-8 text-indigo-400" />
                </div>
              </motion.div>
            </div>

            {/* Top products + Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
                <h2 className="text-xl font-semibold text-white mb-4">Top products</h2>
                {topProducts.length === 0 ? (
                  <div className="text-gray-400">No data yet</div>
                ) : (
                  <ul className="divide-y divide-gray-800">
                    {topProducts.map((p) => (
                      <li key={p.slug} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-10 bg-white rounded ring-1 ring-gray-300 overflow-hidden relative">
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                              {p.slug.slice(0,1).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white">{p.slug}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{p.count} orders</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No orders yet</p>
                    <Link href="/topup" className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0,6).map((order, index) => (
                      <motion.div 
                        key={order.id}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{order.product_slug}</p>
                            <p className="text-gray-400 text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">${order.amount}</p>
                            <p className="text-green-400 text-sm">Completed</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


