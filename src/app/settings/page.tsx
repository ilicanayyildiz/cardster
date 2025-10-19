"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        {authed === false ? (
          <div className="mt-6">
            <a href="/login" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">Login to manage settings</a>
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
              <div className="font-semibold text-white">Email notifications</div>
              <p className="mt-1 text-gray-300">Receive updates about orders and account activity.</p>
              <div className="mt-3">
                <button className="rounded-md border border-purple-800/30 px-3 py-2 hover:bg-purple-900/20">Toggle</button>
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-800/30">
              <div className="font-semibold text-white">Two‑factor authentication</div>
              <p className="mt-1 text-gray-300">Add an extra layer of security to your account.</p>
              <div className="mt-3">
                <button className="rounded-md border border-purple-800/30 px-3 py-2 hover:bg-purple-900/20">Enable</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


