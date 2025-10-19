import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  // Placeholder: In real app, send to ticketing/email provider
  return NextResponse.json({ ok: true });
}


