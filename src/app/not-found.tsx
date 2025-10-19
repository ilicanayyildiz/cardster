import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-purple-800/30 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-12 text-center">
          <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-purple-700/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-pink-700/20 blur-2xl" />

          <div className="relative">
            <div className="mb-4 text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              404
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Sayfa bulunamadı</h1>
            <p className="mt-3 text-gray-300">Aradığın sayfayı bulamadık ya da taşınmış olabilir.</p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 text-white hover:from-purple-700 hover:to-pink-700 transition-colors">
                Ana sayfaya dön
              </Link>
              <Link href="/contact" className="rounded-lg border border-purple-700/50 px-5 py-2 text-gray-200 hover:bg-gray-900/50">
                İletişime geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


