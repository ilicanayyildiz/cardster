"use client";

import { useParams, usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const CATEGORY_ITEMS = [
  { key: "topup", label: "Mobile top-up", buildHref: (country?: string) => country ? `/${country}/topup` : "/topup" },
  { key: "esim", label: "eSIM", buildHref: (country?: string) => country ? `/${country}/esim` : "/esim" },
  { key: "entertainment", label: "Entertainment", buildHref: (country?: string) => country ? `/${country}/entertainment-gift-cards` : "/entertainment-gift-cards" },
  { key: "shopping", label: "Shopping", buildHref: (country?: string) => country ? `/${country}/shopping-gift-cards` : "/shopping-gift-cards" },
  { key: "gamecards", label: "Game cards", buildHref: (country?: string) => country ? `/${country}/game-cards` : "/game-cards" },
  { key: "food", label: "Food", buildHref: (country?: string) => country ? `/${country}/food` : "/food" },
  { key: "travel", label: "Travel", buildHref: (country?: string) => country ? `/${country}/travel` : "/travel" },
];

export default function CategoryNav({ className }: Props) {
  const params = useParams<{ country?: string }>();
  const pathname = usePathname();
  const country = params?.country as string | undefined;

  const isActive = (itemKey: string) => {
    if (!pathname) return false;
    if (itemKey === "topup") return /\/topup(\/?|\?|$)/.test(pathname);
    if (itemKey === "esim") return /\/esim(\/?|\?|$)/.test(pathname);
    if (itemKey === "entertainment") return /\/entertainment-gift-cards(\/?|\?|$)/.test(pathname);
    if (itemKey === "shopping") return /\/shopping-gift-cards(\/?|\?|$)/.test(pathname);
    if (itemKey === "gamecards") return /\/game-cards(\/?|\?|$)/.test(pathname);
    if (itemKey === "food") return /\/food(\/?|\?|$)/.test(pathname);
    if (itemKey === "travel") return /\/travel(\/?|\?|$)/.test(pathname);
    return false;
  };

  return (
    <nav className={`text-[15px] text-gray-900 flex flex-wrap gap-6 ${className ?? ""}`} aria-label="Product categories">
      {CATEGORY_ITEMS.map((item) => {
        const href = item.buildHref(country);
        const active = isActive(item.key);
        if (href === "#") {
          return (
            <span key={item.key} className={`${active ? "underline underline-offset-4" : "text-gray-500"}`}>{item.label}</span>
          );
        }
        return (
          <a key={item.key} href={href} className={`${active ? "underline underline-offset-4" : "hover:underline underline-offset-4"}`}>{item.label}</a>
        );
      })}
    </nav>
  );
}


