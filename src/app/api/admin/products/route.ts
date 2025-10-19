import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ensureAdmin } from "@/lib/auth/ensureAdmin";

export async function GET(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const admin = supabaseAdmin();
  const { data, error } = await admin.from("products").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const slug = String(form.get('slug') || '').trim();
    const name = String(form.get('name') || '').trim();
    const category = String(form.get('category') || '').trim();
    const amounts = String(form.get('amounts') || '').split(',').map((s)=> Number(s.trim())).filter((n)=> Number.isFinite(n));
    const active = String(form.get('active') || 'true') !== 'false';
    const file = form.get('image') as File | null;
    if (!slug || !name || !category || !amounts.length) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    const admin = supabaseAdmin();
    const { error: upsertErr } = await admin.from('products').insert({ slug, name, category, amounts, active });
    if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const ext = (file.name.split('.').pop() || 'png').toLowerCase();
      const path = `images/${slug}.${ext}`;
      const { error: uploadErr } = await admin.storage.from('public').upload(path, new Uint8Array(arrayBuffer), { upsert: true, contentType: file.type });
      if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }
  const body = await req.json();
  const { slug, name, category, amounts, active = true } = body || {};
  if (!slug || !name || !category || !Array.isArray(amounts)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const admin = supabaseAdmin();
  const { error } = await admin
    .from("products")
    .insert({ slug: String(slug), name: String(name), category: String(category), amounts: amounts.map((n: any) => Number(n)), active: !!active });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const body = await req.json();
  const { slug, name, category, amounts, active } = body || {};
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const admin = supabaseAdmin();
  const { error } = await admin
    .from("products")
    .update({
      ...(name !== undefined ? { name: String(name) } : {}),
      ...(category !== undefined ? { category: String(category) } : {}),
      ...(amounts !== undefined ? { amounts: (amounts as any[]).map((n) => Number(n)) } : {}),
      ...(active !== undefined ? { active: !!active } : {}),
    })
    .eq("slug", String(slug));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const guard = await ensureAdmin(req);
  if (!guard.ok) return guard.res;
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const admin = supabaseAdmin();
  const { error } = await admin.from("products").delete().eq("slug", String(slug));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


