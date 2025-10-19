"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

const nav = [
  { href: "/", label: "Home" },
  { href: "/topup", label: "Top-Ups" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(async ({ data }) => {
      setIsAuthed(!!data.user);
      if (data.user) {
        // Ensure server has the session on first load
        try {
          const { data: sess } = await supabase.auth.getSession();
          if (sess.session) {
            await fetch('/auth/callback', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ event: 'SIGNED_IN', session: sess.session }),
            });
          }
        } catch {}
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        await fetch('/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event, session }),
        });
      } catch {}
      setIsAuthed(!!session?.user);
      if (session?.user) {
        supabase.from('profiles').select('role').eq('id', session.user.id).single().then(({ data }) => {
          setIsAdmin(data?.role === 'admin');
        });
      } else {
        setIsAdmin(false);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function onLogout() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = "/";
  }
  return (
    <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20 shadow-lg">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cardster
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <motion.div
              key={n.href}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={n.href}
                className={`text-sm font-medium transition-all duration-200 ${
                  pathname === n.href 
                    ? "text-purple-400 border-b-2 border-purple-400 pb-1" 
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isAuthed === null ? null : isAuthed ? (
            <>
              {isAdmin && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/admin" className="text-sm rounded-lg border border-purple-600 text-gray-200 px-4 py-2 hover:bg-purple-600/20 transition-colors">
                    Admin
                  </Link>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/profile" className="text-sm text-gray-300 hover:text-purple-400 font-medium transition-colors">
                  Profile
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="text-sm rounded-lg border border-purple-600 text-gray-200 px-4 py-2 hover:bg-purple-600/20 transition-colors"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="text-sm text-gray-300 hover:text-purple-400 font-medium transition-colors">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


