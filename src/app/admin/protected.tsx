"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      if (profile?.role !== 'admin') {
        router.replace('/');
        return;
      }
      setReady(true);
    });
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}


