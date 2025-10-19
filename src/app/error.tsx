"use client";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="min-h-[80vh] bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-red-800/30 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-12 text-center">
          <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-red-700/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-orange-700/20 blur-2xl" />

          <div className="relative">
            <div className="mb-4 text-7xl font-extrabold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              500
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Bir şeyler ters gitti</h1>
            <p className="mt-3 text-gray-300">Beklenmeyen bir hata oluştu. Birazdan tekrar dene veya ana sayfaya dön.</p>
            {process.env.NODE_ENV !== 'production' && (
              <p className="mt-2 text-xs text-gray-500">{error?.message}</p>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              <button onClick={() => reset()} className="rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-5 py-2 text-white hover:from-red-700 hover:to-orange-700 transition-colors">
                Tekrar dene
              </button>
              <Link href="/" className="rounded-lg border border-red-700/50 px-5 py-2 text-gray-200 hover:bg-gray-900/50">
                Ana sayfa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


