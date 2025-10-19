import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  // Also accept a bearer token in case cookies aren’t flowing (fallback)
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7)
    : undefined;
  const { data: { user }, error: userErr } = await supabase.auth.getUser(token);
  if (userErr) {
    return NextResponse.json({ error: userErr.message }, { status: 401 });
  }
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { product_slug, amount, code, category } = await req.json();
  if (!product_slug || !amount) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  let admin;
  try {
    admin = supabaseAdmin();
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Service role not configured" }, { status: 500 });
  }

  // Ensure referenced product exists to satisfy FK constraint (use service role for write)
  const { data: existingProduct, error: checkErr } = await admin
    .from("products")
    .select("slug")
    .eq("slug", String(product_slug))
    .maybeSingle();
  if (checkErr) return NextResponse.json({ error: checkErr.message }, { status: 500 });

  if (!existingProduct) {
    // Create a minimal product entry so the order insert does not violate FK
    const defaultName = String(product_slug).replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const defaultAmounts = [Number(amount) || 10];
    const { error: upsertError } = await admin
      .from("products")
      .insert({ slug: String(product_slug), name: defaultName, category: "misc", amounts: defaultAmounts, active: true });
    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }
  }

  const { error } = await admin
    .from("orders")
    .insert({ user_id: user.id, product_slug: String(product_slug), amount: Number(amount) || 0, status: "paid", code: code ? String(code) : null, category: category ? String(category) : null });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


