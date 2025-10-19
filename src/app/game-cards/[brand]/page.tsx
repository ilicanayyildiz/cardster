"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const BRAND_TITLES: Record<string, string> = {
  valorant: "Valorant",
  steam: "Steam",
  leagueoflegends: "League of Legends",
  runeterra: "Legends of Runeterra",
  mobilelegends: "Mobile Legends",
  pubg: "PUBG",
  fortnite: "Fortnite",
  roblox: "Roblox",
  apexlegends: "Apex Legends",
};

export default function GameBrandPage() {
  const { brand } = useParams<{ brand: string }>();
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const imageBase = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/images/` : "/images/";
  const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || "1";
  const versionQuery = `?v=${ASSET_VERSION}`;
  const fileKey = brand === "apexlegends" ? "eaapex"
    : brand === "leagueoflegends" ? "leagueoflegends"
    : brand === "runeterra" ? "legendsofruneterra"
    : brand;

  const title = BRAND_TITLES[brand] ?? brand;
  // Align to 10, 25, 50, 100 like Supabase
  const values = useMemo(() => [10, 25, 50, 100], []);

  function buy(value: number) {
    const params = new URLSearchParams({ id: brand, amount: String(value) });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-40 bg-white ring-1 ring-gray-200 rounded-md overflow-hidden">
            <Image src={`${imageBase}${fileKey}.png${versionQuery}`} alt={title} fill sizes="240px" className="object-contain p-2" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{title} Gift Card</h1>
            <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-800">
              <span>✔ Instant Codes</span>
              <span>✔ Authorized Seller</span>
              <span>✔ Secure Payments</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm font-medium text-gray-900">Select a value</div>
        <div className="mt-3 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v} className="border rounded-xl bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-14 ring-1 ring-gray-200 rounded bg-white overflow-hidden">
                  <Image src={`${imageBase}${fileKey}.png${versionQuery}`} alt={title} fill sizes="80px" className="object-contain p-1" />
                </div>
                <div className="text-sm text-gray-900 font-semibold">{title} Gift Card</div>
              </div>
              <div className="mt-3 text-gray-900 text-sm">
                Buy {title} Gift Card for use in your region. Buy now and receive your code instantly with no waiting or hassle.
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-gray-900 font-medium">EUR {v.toFixed(2)}</div>
                <button onClick={() => buy(v)} className="rounded-md bg-[#e5d64f] hover:bg-[#dccc3f] px-5 py-2 text-sm font-semibold text-gray-900">Buy now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


