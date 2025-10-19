"use client";
import Link from "next/link";
import { useState } from "react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "Can I cancel my order?",
    a: (
      <>
        Once an order is placed and processed, it cannot be cancelled or refunded. Codes are generated digitally, are unique, and are shared once. Exchanges, cancellations, or resales are not possible. You also cannot withdraw money against a code.
      </>
    ),
  },
  {
    q: "What happens if I get the wrong code?",
    a: (
      <>
        The chance of a wrong code is minimal because codes are generated automatically at the time of purchase. Before paying, double‑check all details and the redemption terms. Ensure the code is entered correctly and the platform you use has no issues. If you are unsure, we will seek official confirmation from the service provider and, if appropriate, provide a replacement.
      </>
    ),
  },
  {
    q: "I didn’t receive my digital code. What happened?",
    a: (
      <>
        You will receive a confirmation email with the unique code as soon as payment is received. It should arrive within seconds. Please also check your <strong>spam</strong> or <strong>promotions</strong> folder. If not received, one of the following may have happened:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>The email address may be incorrect; we can help track and resend.</li>
          <li>There may be a technical delay; please wait 24 hours and then contact us.</li>
        </ul>
      </>
    ),
  },
  {
    q: "Why was my payment blocked for security reasons?",
    a: (
      <>
        Cardster uses advanced security measures. Payments must meet certain criteria; otherwise, they may be declined automatically to keep your account safe. Unauthorized charges will not be made.
      </>
    ),
  },
  {
    q: "What happens next?",
    a: (
      <>
        Please wait 24 hours and try another method. Do not repeat attempts in quick succession, as this can trigger more declines.
      </>
    ),
  },
  {
    q: "Will customer service be able to help?",
    a: (
      <>
        We cannot bypass automated security checks. Please wait 24 hours and try a different payment method.
      </>
    ),
  },
  {
    q: "It looks like I’ve been charged. Why?",
    a: (
      <>
        If your account was debited but we did not receive the payment, the provider may have temporarily reserved the funds. They will release them back to your account within a few days. For urgent cases, contact your provider directly.
      </>
    ),
  },
  {
    q: "What if I buy an incorrect voucher?",
    a: (
      <>
        Unfortunately, once a code is generated, it cannot be exchanged or cancelled. Some suppliers may permit an exchange; contact support and we will try to help.
      </>
    ),
  },
  {
    q: "Can I get a refund?",
    a: (
      <>
        Refunds are not available after the code has been generated and sent. Please ensure all details are accurate before completing your order.
      </>
    ),
  },
  {
    q: "Could there be a problem with the digital code?",
    a: (
      <>
        Digital codes rarely have issues. Before checkout, please check:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Redemption terms</li>
          <li>Whether the code is entered correctly</li>
          <li>Whether the redemption platform has issues</li>
        </ul>
        If you still believe there is an issue, get confirmation from the service provider (e.g., PlayStation, Spotify) and let us know; we will consider a replacement if suitable.
      </>
    ),
  },
  {
    q: "Can I get an invoice for my order?",
    a: (
      <>
        We do not issue separate invoices. The order confirmation email can serve as an invoice. If you did not receive it, contact us and we will resend.
      </>
    ),
  },
  {
    q: "Do I need to pay tax on the purchase?",
    a: (
      <>
        These transactions are generally exempt from VAT. Businesses can purchase cards and vouchers without extra charges. Local regulations may vary.
      </>
    ),
  },
  {
    q: "I paid by credit card. Why didn’t it go through?",
    a: (
      <>
        Common reasons include:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Insufficient credit limit</li>
          <li>Bank flagged the transaction as suspicious</li>
          <li>Incorrect card details (number, expiry, CVC, address)</li>
          <li>Overdue credit card payments causing temporary restrictions</li>
        </ul>
      </>
    ),
  },
  {
    q: "What should I do in such cases?",
    a: (
      <>
        Contact your bank and review your statement. If it shows “Reserved,” the cancellation has not been processed yet; the money has not been transferred to us and remains in your account. It usually clears within five business days. If not, speak with your card provider or bank.
      </>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">How can we help you?</h1>

      <div className="mt-6 space-y-4">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="rounded-xl border bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-lg text-gray-900">{f.q}</span>
                <span className="ml-4 text-gray-500">
                  {isOpen ? (
                    <MinusSmallIcon className="h-5 w-5" />
                  ) : (
                    <PlusSmallIcon className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div className={`${isOpen ? "block" : "hidden"} px-5 pb-5 text-gray-900 leading-relaxed`}>{f.a}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border rounded-xl bg-white p-6">
        <div className="font-semibold text-lg text-gray-900">Want to get in touch?</div>
        <p className="mt-2 text-gray-600">
          We’re here to help. Send us a message and we’ll get back within 24 hours.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/contact" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 hover:from-purple-700 hover:to-pink-700 transition-all">Contact</Link>
          <Link href="/legal/privacy" className="rounded-lg border px-4 py-2 hover:bg-gray-50">Privacy Policy</Link>
        </div>
      </div>
      </div>
    </div>
  );
}
