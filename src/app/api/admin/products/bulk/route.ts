import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ensureAdmin } from "@/lib/auth/ensureAdmin";

type Incoming = {
  slug: string;
  name: string;
  category: string;
  amounts: number[] | string;
  active?: boolean;
}[];

export async function POST(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const items = (await req.json()) as Incoming;
  if (!Array.isArray(items)) return NextResponse.json({ error: "Expected array" }, { status: 400 });
  const normalized = items.map((it) => ({
    slug: String(it.slug).trim(),
    name: String(it.name).trim(),
    category: String(it.category).trim(),
    amounts: Array.isArray(it.amounts)
      ? it.amounts.map((n) => Number(n))
      : String(it.amounts)
          .split(',')
          .map((s) => Number(s.trim()))
          .filter((n) => Number.isFinite(n) && n > 0),
    active: it.active === undefined ? true : !!it.active,
  }));
  if (normalized.some((i) => !i.slug || !i.name || !i.category || !i.amounts.length)) {
    return NextResponse.json({ error: "Invalid rows present" }, { status: 400 });
  }
  const admin = supabaseAdmin();
  const { error } = await admin.from("products").upsert(normalized, { onConflict: 'slug' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, count: normalized.length });
}


