import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    const { event, session } = await req.json();
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      // Persist session cookies on the server so middleware/SSR can read them
      await supabase.auth.setSession({
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
      });
    } else if (event === "SIGNED_OUT") {
      await supabase.auth.signOut();
    }
  } catch (_) {
    // no-op; return OK to avoid noisy errors on unexpected payloads
  }
  return NextResponse.json({ ok: true });
}


