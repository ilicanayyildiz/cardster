import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function ensureAdmin(req: Request): Promise<{ ok: true; userId: string } | { ok: false; res: NextResponse }> {
  const supabase = await supabaseServer();
  const authHeader = req.headers.get("authorization");
  const bearer = authHeader?.toLowerCase().startsWith("bearer ") ? authHeader.slice(7) : undefined;
  const { data: { user }, error } = await supabase.auth.getUser(bearer);
  if (error || !user) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  try {
    const adminClient = supabaseAdmin();
    const { data: profile } = await adminClient.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role === "admin") {
      return { ok: true, userId: user.id };
    }
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  } catch (e: any) {
    return { ok: false, res: NextResponse.json({ error: e?.message || "Forbidden" }, { status: 403 }) };
  }
}


