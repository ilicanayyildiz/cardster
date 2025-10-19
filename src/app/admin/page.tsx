export const dynamic = "force-dynamic";
import AdminGate from "@/app/admin/protected";

export default async function AdminPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Admin</h1>
            <p className="mt-2 text-gray-300">Manage products and view orders.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="/admin/products" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm">New product</a>
            <a href="/admin/orders" className="rounded-lg bg-gray-800 text-white px-4 py-2 text-sm">View orders</a>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <a href="/admin/products" className="group relative overflow-hidden rounded-xl border border-purple-800/30 bg-gradient-to-br from-gray-900/70 to-gray-900/30 p-6 hover:from-gray-900 hover:to-gray-900">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-700/20 blur-2xl group-hover:bg-purple-700/30 transition-colors" />
            <div className="relative">
              <div className="text-white text-lg font-semibold">Products</div>
              <p className="mt-2 text-gray-300">Create, update, search and import products.</p>
              <div className="mt-4 inline-flex items-center text-purple-300 group-hover:text-purple-200">Go to products →</div>
            </div>
          </a>
          <a href="/admin/orders" className="group relative overflow-hidden rounded-xl border border-purple-800/30 bg-gradient-to-br from-gray-900/70 to-gray-900/30 p-6 hover:from-gray-900 hover:to-gray-900">
            <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-pink-700/20 blur-2xl group-hover:bg-pink-700/30 transition-colors" />
            <div className="relative">
              <div className="text-white text-lg font-semibold">Orders</div>
              <p className="mt-2 text-gray-300">Filter and review latest orders and statuses.</p>
              <div className="mt-4 inline-flex items-center text-pink-300 group-hover:text-pink-200">Go to orders →</div>
            </div>
          </a>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-purple-800/30 bg-gray-900/50 p-4 text-gray-300">
            <div className="text-sm text-gray-400">Shortcuts</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/admin/products" className="hover:text-white">Add product</a></li>
              <li><a href="/admin/products" className="hover:text-white">Bulk import</a></li>
              <li><a href="/admin/orders" className="hover:text-white">Latest orders</a></li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-800/30 bg-gray-900/50 p-4 text-gray-300">
            <div className="text-sm text-gray-400">Tips</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>Use CSV import for many products.</li>
              <li>Images should be named by slug in /images.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-800/30 bg-gray-900/50 p-4 text-gray-300">
            <div className="text-sm text-gray-400">Status</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>Products: dynamic via Supabase</li>
              <li>Orders: filterable list</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}


