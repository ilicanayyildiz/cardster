"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(formData: FormData) {
    setError(null);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setPassword(""); // Clear only password field on error
    } else {
      // ensure profile row exists
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').upsert({ id: user.id, email: user.email ?? '' });
      }
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="mx-auto max-w-sm px-4 py-10">
         <div className="bg-gray-900/50 backdrop-blur rounded-xl p-10 border border-purple-800/30">
           <h1 className="text-3xl font-semibold text-white mb-8">Login</h1>
           <form action={onSubmit} className="space-y-6">
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 hover:from-purple-700 hover:to-pink-700 transition-all">
              Login
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          <div className="mt-4 text-sm text-gray-300 flex justify-between">
            <Link href="/register" className="hover:text-purple-400 text-purple-400">Create account</Link>
            <Link href="/reset" className="hover:text-purple-400 text-purple-400">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


