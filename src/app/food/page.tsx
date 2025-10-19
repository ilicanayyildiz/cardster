"use client";

import Image from "next/image";
import { COUNTRIES } from "@/lib/countries";
import { useMemo, useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";

type DbProduct = { slug: string; name: string };

export default function FoodGiftCardsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/products?category=food`, { next: { revalidate: 60 } });
      const json = await res.json();
      if (!ignore && Array.isArray(json)) setProducts(json as DbProduct[]);
      setLoading(false);
    }
    load();
    return () => { ignore = true; };
  }, []);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const imageBase = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/images/` : "/images/";

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ country?: string }>();
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const [country, setCountry] = useState<string>((params?.country as string) || searchParams.get("country") || COUNTRIES[0].code);
  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q));
  }, [countryQuery]);

  useEffect(() => {
    const qpCountry = searchParams.get("country");
    const segCountry = params?.country as string | undefined;
    if (qpCountry && !segCountry) {
      const sp = new URLSearchParams(searchParams);
      sp.delete("country");
      const suffix = sp.toString();
      router.replace(`/${qpCountry}/food${suffix ? `?${suffix}` : ""}`);
    }
  }, [searchParams, params, router]);

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Food Gift Cards: The Perfect Way to Satiate Taste Buds</h1>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">Instantly Accessible Online</span></span>
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">Trusted Provider</span></span>
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">Guaranteed Safe Transactions</span></span>
        </div>

        <CategoryNav className="mt-6" />

        {/* Country selector */}
        <div className="mt-8">
          <div className="text-sm font-medium text-gray-900">Step 1: Select which country this product will be used in</div>
          <div className="mt-2">
            <button
              onClick={() => setCountryModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 hover:border-gray-300"
            >
              <span className="relative h-5 w-7 overflow-hidden rounded shadow-sm ring-1 ring-gray-200">
                <Image src={`https://flagcdn.com/w40/${country}.png`} alt="flag" fill sizes="28px" className="object-cover" />
              </span>
              <span>{COUNTRIES.find(c => c.code === country)?.name}</span>
              <span className="ml-4 text-gray-400">→</span>
            </button>
          </div>
        </div>

        {countryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4">
            <div className="mt-10 w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    autoFocus
                    value={countryQuery}
                    onChange={(e) => setCountryQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400"
                  />
                </div>
                <button onClick={() => setCountryModalOpen(false)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex-1 overflow-y-auto pr-1 scrollbar-none">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountry(c.code);
                        setCountryModalOpen(false);
                        const sp = new URLSearchParams(searchParams);
                        sp.delete("country");
                        const suffix = sp.toString();
                        router.push(`/${c.code}/food${suffix ? `?${suffix}` : ""}`);
                        router.refresh();
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        <span className="relative h-5 w-7 overflow-hidden rounded ring-1 ring-gray-200">
                          <Image src={`https://flagcdn.com/w40/${c.code}.png`} alt={c.name} fill sizes="28px" className="object-cover" />
                        </span>
                        <span className="text-gray-900">{c.name}</span>
                      </span>
                      <span className={`h-4 w-4 rounded-full border ${country === c.code ? "bg-blue-600 border-blue-600" : "border-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {loading ? (
            <div className="col-span-full text-gray-500">Loading…</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-gray-500">No products</div>
          ) : (
            products.map((p) => (
              <a
                key={p.slug}
                href={`/${country}/food/${encodeURIComponent(p.slug)}`}
                className="block rounded-xl border border-gray-200 bg-white hover:shadow transition-shadow"
              >
                <div className="relative w-full h-28 sm:h-32">
                  <Image src={`${imageBase}${p.slug}.png`} alt={p.name} fill sizes="(max-width:768px) 100vw, 240px" className="object-contain p-4" />
                </div>
              </a>
            ))
          )}
        </div>

        {/* Text sections (from reference) */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What are Food Gift Cards?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Whether you're a foodie or just love convenience, food gift cards are perfect for you. Enjoy a meal at your
            preferred restaurant or a cozy café without worrying about the bill.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Where to Find Food Gift Cards Online?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Get a wide selection of food gift cards, from fine‑dining experiences to casual cafés. Whether you're gifting
            yourself or a friend, these cards make every meal more convenient and enjoyable.
          </p>
        </section>
      </div>
    </div>
  );
}


