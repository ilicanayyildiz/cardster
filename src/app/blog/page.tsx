"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  image: string; // from public assets for now
};

const ALL_POSTS: BlogPost[] = [
  {
    slug: "launch-announcement",
    title: "We’re live: Cardster launch announcement",
    excerpt: "Fast digital vouchers, simple checkout, and instant delivery — available now.",
    category: "Announcements",
    date: "2025-10-10",
    image: "/globe.svg",
  },
  {
    slug: "gift-card-safety-tips",
    title: "5 tips to keep your gift cards safe",
    excerpt: "Best practices for securing your digital codes and avoiding scams.",
    category: "Tips",
    date: "2025-10-12",
    image: "/file.svg",
  },
  {
    slug: "instant-topups-explained",
    title: "How instant top‑ups work",
    excerpt: "Behind the scenes of our delivery pipeline and what to expect.",
    category: "Guides",
    date: "2025-10-14",
    image: "/window.svg",
  },
];

const CATEGORIES = ["All", "Announcements", "Tips", "Guides"] as const;

export default function BlogIndexPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_POSTS.filter((p) =>
      (selected === "All" || p.category === selected) &&
      (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    );
  }, [query, selected]);

  return (
    <div className="bg-white min-h-[70vh]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Insights from Cardster
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-white/90 max-w-2xl"
          >
            News, tips and guides on digital vouchers, gift cards and seamless checkout.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected === c ? "bg-white text-gray-900" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {c}
              </button>
            ))}
            <div className="relative ml-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles"
                className="h-10 w-64 rounded-full border border-white/30 bg-white/10 px-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-gray-900">No articles found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="relative h-40 bg-white">
                  <Image src={p.image} alt={p.title} fill sizes="360px" className="object-contain p-6" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
                  <h2 className="mt-1 text-lg font-semibold text-gray-900">{p.title}</h2>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{p.category}</span>
                    <span className="text-sm text-purple-700 group-hover:underline">Read more</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


