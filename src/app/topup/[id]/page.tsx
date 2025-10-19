"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type DbProduct = { slug: string; name: string; amounts: number[] };

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DbProduct | null>(null);
  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!id) return;
      const res = await fetch(`/api/products`);
      const json = await res.json();
      if (!ignore && Array.isArray(json)) {
        const p = (json as DbProduct[]).find((x) => x.slug === id);
        if (p) setProduct(p);
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);
  const [amount, setAmount] = useState<number | null>(null);
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const paymentLogosUrl = supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/images/payment.png`
    : "/images/payment.png"; // optional local fallback
  const imageBase = supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/images/`
    : "/images/";

  if (!product) return <div className="mx-auto max-w-6xl px-4 py-10">Ürün bulunamadı.</div>;

  function checkout() {
    if (!amount) return;
    const params = new URLSearchParams({ id: String(id), amount: String(amount) });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Brand header row */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative h-28 w-48 bg-white ring-1 ring-gray-200 rounded-md overflow-hidden">
            <Image src={`${imageBase}${product.slug}.png`} alt={product.name} fill sizes="240px" className="object-contain p-2" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-8 text-sm text-gray-900">
              <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> Immediate Credits</span>
              <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> Authorized Seller</span>
              <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> Thoroughly Protected Transactions</span>
            </div>
          </div>
        </div>
        {/* Payment logos */}
        <div className="hidden md:flex items-center">
          <div className="relative h-8 w-[360px]">
            <Image src={paymentLogosUrl} alt="Payment methods" fill sizes="360px" className="object-contain" />
          </div>
        </div>
      </div>

      {/* Tabs */}
        <div className="mt-8 border-b">
        <div className="flex gap-6 text-sm">
          <span className="-mb-[1px] border-b-2 border-black pb-2 font-medium text-gray-900">Call credit</span>
        </div>
      </div>

      {/* Select a value */}
      <div className="mt-6">
        <div className="text-lg font-semibold text-gray-900">Select a value</div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {product.amounts.map((a) => (
            <div key={a} className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-14 ring-1 ring-gray-200 rounded bg-white overflow-hidden">
                  <Image src={`${imageBase}${product.slug}.png`} alt={product.name} fill sizes="80px" className="object-contain p-1" />
                </div>
                <div className="text-sm text-gray-900 font-semibold">{product.name}</div>
              </div>
              <div className="mt-3 text-gray-900 text-sm">
                Buy {product.name} for use in Germany. Buy now and receive your code instantly with no waiting or hassle.
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-gray-900 font-medium">EUR {a.toFixed(2)}</div>
                <button
                  onClick={() => { setAmount(a); checkout(); }}
                  className="rounded-md bg-[#e5d64f] hover:bg-[#dccc3f] px-5 py-2 text-sm font-semibold text-gray-900"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}


