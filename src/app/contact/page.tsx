"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setStatus("Message sent. We'll get back to you.");
    else setStatus("Something went wrong. Please try again.");
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Contact Us</h1>
        <form action={onSubmit} className="mt-6 space-y-4">
          <input name="name" placeholder="Name" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" required />
          <input name="email" type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" required />
          <textarea name="message" placeholder="Message" className="w-full border rounded-md px-3 py-2 min-h-32 text-gray-900 placeholder-gray-400" required />
        <button className="rounded-md bg-black text-white px-4 py-2 hover:bg-gray-900">Send</button>
      </form>
        {status && <p className="mt-4 text-sm text-gray-900">{status}</p>}
      </div>
    </div>
  );
}


