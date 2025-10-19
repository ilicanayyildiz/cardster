import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Cache API responses for 60s (ISR-like) to improve category page load times
export const revalidate = 60;

export async function GET(req: Request) {
  const supabase = supabaseAdmin();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  let query = supabase.from("products").select("*").eq("active", true);
  if (category) {
    query = query.eq("category", category);
  }
  const { data, error } = await query.order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}


