"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function ResetPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus(null);
    const email = String(formData.get("email"));
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
    if (error) setStatus(error.message);
    else setStatus("Check your email for the reset link.");
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="mx-auto max-w-sm px-4 py-10">
         <div className="bg-gray-900/50 backdrop-blur rounded-xl p-10 border border-purple-800/30">
           <h1 className="text-3xl font-semibold text-white mb-8">Reset Password</h1>
           <form action={onSubmit} className="space-y-6">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 hover:from-purple-700 hover:to-pink-700 transition-all">
              Send reset link
            </button>
          </form>
          {status && <p className="mt-4 text-sm text-gray-300">{status}</p>}
        </div>
      </div>
    </div>
  );
}


