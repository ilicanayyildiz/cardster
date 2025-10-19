"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function generateCode(): string {
  const digits = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("");
  return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function SuccessInner() {
  const params = useSearchParams();
  const order = params.get("order");
  const brand = params.get("id") || params.get("product") || "giftcard";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const imageBase = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/images/` : "/images/";
  const [code, setCode] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate code only on the client after first mount to avoid hydration mismatch
  useEffect(() => {
    const qpCode = params.get("code");
    if (qpCode) {
      setCode(qpCode);
    } else {
      setCode(generateCode());
    }
  }, [params]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-white">Congratulations! Purchase successful</h1>
      <p className="mt-2 text-gray-700">Your order {order ?? "#"} is confirmed. Your code is ready below.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product image */}
        <div className="relative w-full h-48 md:h-60 rounded-xl ring-1 ring-gray-200 overflow-hidden bg-white">
          <Image src={`${imageBase}${brand}.png`} alt="Product" fill sizes="(max-width:768px) 100vw, 480px" className="object-contain p-4" />
        </div>

        {/* Code card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="text-sm text-gray-600">Your code</div>
          <div className="mt-2 flex items-center gap-3">
            <div className={`text-2xl font-mono tracking-wider ${revealed ? "text-gray-900" : "text-transparent"} relative`}>
              {code ?? "0000-0000-0000-0000"}
              {!revealed && (
                <span className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded" aria-hidden />
              )}
            </div>
            <button
              onClick={() => setRevealed((v) => !v)}
              className="shrink-0 rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800"
            >
              {revealed ? "Hide" : "Reveal"}
            </button>
            {revealed && (
              <div className="relative inline-flex items-center">
                <button
                  onClick={() => {
                    if (code) {
                      navigator.clipboard.writeText(code);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    }
                  }}
                  className="shrink-0 rounded-md bg-gray-200 text-gray-900 px-4 py-2 text-sm hover:bg-gray-300"
                >
                  Copy
                </button>
                {copied && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            )}
            <a href="/orders" className="ml-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm hover:from-purple-700 hover:to-pink-700">Go to Orders</a>
          </div>
          <p className="mt-3 text-xs text-gray-500">Click Reveal to display the full code. Keep it secret.</p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-transparent flex items-center justify-center text-white">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}


