import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ensureAdmin } from "@/lib/auth/ensureAdmin";

export async function GET(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("orders")
    .select("id, user_id, product_slug, amount, status, category, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}


