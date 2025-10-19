"use client";
import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";

export default function BusinessPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus(null);
    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const email = String(formData.get("email") || "");
    const country = String(formData.get("country") || "");
    const brand = String(formData.get("brand") || "");
    const value = String(formData.get("value") || "");
    const purpose = String(formData.get("purpose") || "");
    const quantity = String(formData.get("quantity") || "");
    const comments = String(formData.get("comments") || "");

    const composed = `Bulk card request\n\nAbout you and your company\n- Name: ${name}\n- Company: ${company}\n- Email: ${email}\n- Country: ${country}\n\nAbout your order\n- Brand: ${brand}\n- Value: ${value}\n- Purpose: ${purpose}\n- Quantity: ${quantity}\n- Comments: ${comments}`;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message: composed }),
    });
    if (res.ok) setStatus("Request sent. We'll contact you shortly.");
    else setStatus("Something went wrong. Please try again.");
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Purchase Bulk Gift Cards to Fuel Your Business Success</h1>
        <p className="mt-3 text-gray-700 max-w-3xl">
          Elevate your sales strategies or reward employees with bespoke gift cards for promotions and incentives.
          Place your bulk order and enjoy instant delivery of a wide selection of digital gift cards.
        </p>

        {/* How does it work? */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">How does it work?</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl bg-white p-6">
              <div className="font-semibold text-gray-900">1 — How to place your order?</div>
              <p className="mt-2 text-gray-600">Fill out the form with details about the gift cards your business requires.</p>
            </div>
            <div className="border rounded-xl bg-white p-6">
              <div className="font-semibold text-gray-900">2 — Review and confirm</div>
              <p className="mt-2 text-gray-600">We will review your request, send a proposal, and issue an invoice.</p>
            </div>
            <div className="border rounded-xl bg-white p-6">
              <div className="font-semibold text-gray-900">3 — Swift delivery</div>
              <p className="mt-2 text-gray-600">Codes are delivered instantly and securely once payment is processed.</p>
            </div>
          </div>
        </section>

        {/* Provide Your Order Details */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Provide Your Order Details</h2>

          <div className="mt-6 border rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">About you and your company</h3>
            <form action={onSubmit} className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" placeholder="Your name" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" required />
                <input name="company" placeholder="Company name" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" />
              </div>
              <input name="email" type="email" placeholder="Email address" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" required />
              <select name="country" className="w-full border rounded-md px-3 py-2 text-gray-900" defaultValue="">
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">About your order</h3>
              <input name="brand" placeholder="Brand" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" />
              <input name="value" placeholder="Select value" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" />
              <select name="purpose" className="w-full border rounded-md px-3 py-2 text-gray-900" defaultValue="Marketing incentives">
                <option>Marketing incentives</option>
                <option>Employee rewards</option>
                <option>Reselling</option>
                <option>Other</option>
              </select>
              <input name="quantity" type="number" min={1} placeholder="Quantity" className="w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-400" />
              <textarea name="comments" placeholder="Additional comments" className="w-full border rounded-md px-3 py-2 min-h-32 text-gray-900 placeholder-gray-400" />

              <button className="rounded-md bg-black text-white px-4 py-2 hover:bg-gray-900">Send the request</button>
            </form>
            {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}


