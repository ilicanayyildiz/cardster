import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Only guard /admin - other paths pass through
  if (req.nextUrl.pathname.startsWith("/admin")) {
    let { data: { user } } = await supabase.auth.getUser();
    // Try to derive userId from cookie JWT if needed
    let userId = user?.id as string | undefined;
    let accessTokenFromCookie: string | undefined;
    if (!userId) {
      const authCookie = req.cookies.getAll().find((c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));
      if (authCookie?.value) {
        try {
          const parsed = JSON.parse(authCookie.value as string);
          accessTokenFromCookie = parsed?.access_token as string | undefined;
          if (accessTokenFromCookie) {
            const part = accessTokenFromCookie.split('.')[1];
            if (part) {
              const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
              const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
              const json = JSON.parse(atob(padded));
              userId = json?.sub as string | undefined;
            }
          }
        } catch {}
      }
    }
    // If still no user id, fall back to redirect
    if (!userId) return NextResponse.redirect(new URL('/', req.url));
    // Check role with service role (authoritative) if available; otherwise allow and let client gate handle
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
    if (url && service) {
      const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
      const { data: svcProfile } = await admin.from('profiles').select('role').eq('id', userId).single();
      if (svcProfile?.role === 'admin') return res;
      return NextResponse.redirect(new URL('/', req.url));
    }
    // If no service role, pass through; client gate will enforce
    return res;
  }
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};


