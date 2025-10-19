"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { COUNTRIES } from "@/lib/countries";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CARRIERS } from "@/lib/carriers";
type DbProduct = { slug: string; name: string };
import { useRouter, useSearchParams, useParams } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";

export default function TopUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ country?: string }>();
  const [query, setQuery] = useState("");

  const countries = COUNTRIES;
  const initialCountry = (params?.country as string) || searchParams.get("country") || COUNTRIES[0].code;
  const [country, setCountry] = useState<string>(initialCountry);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(c => c.name.toLowerCase().includes(q));
  }, [countryQuery, countries]);

  // Normalize /topup?country=xx -> /xx/topup
  useEffect(() => {
    const qpCountry = searchParams.get("country");
    const segCountry = params?.country as string | undefined;
    if (qpCountry && !segCountry) {
      const sp = new URLSearchParams(searchParams);
      sp.delete("country");
      const suffix = sp.toString();
      router.replace(`/${qpCountry}/topup${suffix ? `?${suffix}` : ""}`);
    }
    if (segCountry && searchParams.get("country")) {
      const sp = new URLSearchParams(searchParams);
      sp.delete("country");
      const suffix = sp.toString();
      router.replace(`/${segCountry}/topup${suffix ? `?${suffix}` : ""}`);
    }
  }, [searchParams, params, router]);

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/products?category=topup`, { next: { revalidate: 60 } });
      const json = await res.json();
      if (!ignore && Array.isArray(json)) setProducts(json as DbProduct[]);
      setLoading(false);
    }
    load();
    return () => { ignore = true; };
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Hero - professional style */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f4c5c]">
            Instant Mobile Top‑Up
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-800">
            <span className="inline-flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-yellow-500" />
              <span><span className="font-semibold">Immediate</span> Credits</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-yellow-500" />
              <span><span className="font-semibold">Authorized</span> Seller</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-yellow-500" />
              <span><span className="font-semibold">Thoroughly</span> Protected Transactions</span>
            </span>
          </div>
        </motion.div>

        {/* Kategori sekmeleri */}
        <CategoryNav className="mt-6" />

        {/* Step 1 */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-sm font-medium text-gray-900">Step 1: Select which country this product will be used in</div>
          <div className="mt-2">
            <button
              onClick={() => setCountryModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 hover:border-gray-300"
            >
              <span className="relative h-5 w-7 overflow-hidden rounded shadow-sm ring-1 ring-gray-200">
                <Image
                  src={`https://flagcdn.com/w40/${country}.png`}
                  alt="flag"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </span>
              <span>{countries.find(c => c.code === country)?.name}</span>
              <span className="ml-4 text-gray-400">→</span>
            </button>
          </div>
        </motion.div>

        {/* Country modal */}
        {countryModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="mt-10 w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl max-h-[80vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.98, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
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
                <button
                  onClick={() => setCountryModalOpen(false)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
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
                        router.push(`/${c.code}/topup${suffix ? `?${suffix}` : ""}`);
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
            </motion.div>
          </motion.div>
        )}
        
        {/* Arama alanı kaldırıldı (referans uyumu için) */}

        {/* Step 2 */}
        <div className="mt-8 text-sm font-medium text-gray-900">Step 2: Choose your provider</div>

        <motion.div
          className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? (
            <div className="col-span-full text-gray-600">Loading…</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-gray-600">No products</div>
          ) : (
          products.map((p, index) => (
            <motion.a
              key={p.slug}
              href={`/topup/${p.slug}`}
              className="group relative rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="relative p-4 sm:p-5">
                <div className="relative w-full h-24 sm:h-28">
                  <Image src={`/images/${p.slug}.png`} alt={p.name} fill sizes="(max-width:768px) 100vw, 240px" className="object-contain" />
                </div>
              </div>
            </motion.a>
          ))
          )}
        </motion.div>

        {/* Info section from reference */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Top-Up Your Mobile With TopupSpot</h2>
          <p className="mt-2 text-gray-900">
            The process is easy. Just enter the mobile number that has to be recharged. Alternatively, enter the email address. From the drop-down menu, choose the provider and the recharge value. Pay with your preferred method. Within minutes, your number is recharged. Staying connected was never this easy!
          </p>
          <h3 className="mt-6 text-lg font-semibold text-gray-900">Self-Recharge or Gift to a Loved One</h3>
          <p className="mt-2 text-gray-900">
            TopupSpot can be used to top up your mobile and that of a close one. Enter the number or the email ID, select the right amount, and follow the instructions to complete the process.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-gray-900">Topping Up Your Mobile, Internationally</h3>
          <p className="mt-2 text-gray-900">
            You don't have to lose touch with near and dear ones when traveling abroad. TopupSpot helps you stay connected from everywhere. Follow the same steps for international top-ups as within your own country. Choose the country, select the provider, pay and top-up within minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

