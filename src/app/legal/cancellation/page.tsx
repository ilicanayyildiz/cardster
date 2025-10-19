export default function CancellationPolicyPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Cancellation policy</h1>

        {/* Effective Date */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Effective Date: 01.12.2024</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            This page explains when and how an order can be cancelled on <strong>Cardster</strong>, and the situations
            where cancellation is not possible due to the nature of digital goods.
          </p>
        </section>

        {/* 1. General Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">1. General policy</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Orders for digital products are generally non‑cancellable once the code has been generated, associated with
            your account, or delivered via email/on‑screen.
          </p>
        </section>

        {/* 2. When Cancellation Is Possible */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">2. When cancellation is possible</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>The order is still pending and processing has not started.</li>
            <li>There is a verified technical issue on our side preventing delivery.</li>
          </ul>
        </section>

        {/* 3. Non‑cancellable Cases */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. Non‑cancellable cases</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Codes already generated or delivered.</li>
            <li>Incorrect information entered during checkout (e.g., wrong email).</li>
            <li>Change of mind after delivery.</li>
            <li>Fraud, abuse, or suspected misuse of the service.</li>
          </ul>
        </section>

        {/* 4. How to Request Cancellation */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">4. How to request cancellation</h2>
          <ol className="mt-3 list-decimal pl-6 space-y-2 text-gray-700">
            <li>Contact us quickly via the form on the <a className="underline" href="/contact">Contact</a> page.</li>
            <li>Provide your order ID and a brief description of the reason.</li>
            <li>We will review and respond, typically within 1–2 business days.</li>
          </ol>
        </section>

        {/* 5. Relation to Refunds */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Relation to refunds</h2>
          <p className="mt-3 text-gray-700">For refund eligibility and timelines, please see our <a className="underline" href="/legal/refund">Refund policy</a>.</p>
        </section>

        {/* 6. Changes to this Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">6. Changes to this policy</h2>
          <p className="mt-3 text-gray-700">We may update this policy periodically; updates are effective upon posting.</p>
        </section>

        {/* 7. Contact */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Contact</h2>
          <p className="mt-3 text-gray-700">Need assistance? Reach us via the <a className="underline" href="/contact">Contact</a> page.</p>
        </section>
      </div>
    </div>
  );
}


