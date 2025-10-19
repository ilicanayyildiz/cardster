"use client";

import Image from "next/image";
import { COUNTRIES } from "@/lib/countries";
import { Suspense, useMemo, useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";

function EsimInner() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const esimImageUrl = supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/images/esim2.jpg`
    : "/images/esim.png"; // optional local fallback
  const searchParams = useSearchParams();
  const params = useParams<{ country?: string }>();
  const router = useRouter();
  const [country, setCountry] = useState<string>((params?.country as string) || searchParams.get("country") || COUNTRIES[0].code);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q));
  }, [countryQuery]);

  // If URL is /esim?country=xx, normalize to /xx/esim
  useEffect(() => {
    const qpCountry = searchParams.get("country");
    const segCountry = params?.country as string | undefined;
    if (qpCountry && !segCountry) {
      const sp = new URLSearchParams(searchParams);
      // keep other params if any, but remove country from query as it becomes segment
      sp.delete("country");
      const suffix = sp.toString();
      router.replace(`/${qpCountry}/esim${suffix ? `?${suffix}` : ""}`);
    }
  }, [searchParams, params, router]);

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">eSIMs for Seamless Connectivity Within & Beyond Your Country</h1>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">Rapid Digital Activation</span></span>
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">Certified reseller</span></span>
          <span className="inline-flex items-center gap-2"><span className="text-yellow-500">✔</span> <span className="text-gray-900">100% Risk‑free Payments</span></span>
        </div>

        {/* Categories navigation */}
        <CategoryNav className="mt-6" />

        {/* Step 1 - Select country */}
        <div className="mt-10">
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
              <span>{COUNTRIES.find(c => c.code === country)?.name}</span>
              <span className="ml-4 text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Country modal (same behavior as Topup page) */}
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
                        const params = new URLSearchParams(searchParams);
                        params.set("country", c.code);
                        router.push(`/esim?${params.toString()}`);
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

        {/* Visual card */}
        <div className="mt-8">
          <div className="w-[240px] h-[140px] rounded-lg" style={{ backgroundColor: "#e84a59" }}>
            <button
              type="button"
              onClick={() => setCountryModalOpen(true)}
              aria-label="Choose country for eSIM"
              className="relative w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg"
            >
              <Image src={esimImageUrl} alt="eSIM" fill sizes="240px" className="object-contain p-4" />
            </button>
          </div>
        </div>

        {/* Sections */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What is an eSIM?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            An eSIM is a virtual SIM that powers your mobile plan directly on your device. No physical card is required.
            It automatically connects to your network. For frequent travellers, eSIMs are a game‑changer, letting you
            switch between carriers on the go without swapping SIM cards.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Why Choose eSIMs?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Compared to physical SIM cards, eSIMs offer several benefits: convenient network switching, strong device‑
            level security, and seamless connectivity while travelling. Above all, it’s simple to connect to different
            networks without changing physical cards.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How to Buy an eSIM?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Select the eSIM and its value from the available options and complete the purchase using a secure payment
            method. You’ll receive the activation code in your inbox within 30 seconds of payment processing. Gift it or
            use it on your own device!
          </p>
          <div className="mt-4">
            <a href={`/${country}/topup?category=esim`} className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 hover:from-purple-700 hover:to-pink-700">Buy a eSIM top up online</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function EsimPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white flex items-center justify-center text-gray-700">Loading…</div>}>
      <EsimInner />
    </Suspense>
  );
}


