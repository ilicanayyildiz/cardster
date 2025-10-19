export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Refund policy</h1>

        {/* Effective Date */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Effective Date: 01.12.2024</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Thank you for choosing <strong>Cardster</strong> for your digital purchases. Please review our refund policy
            carefully before completing your transaction.
          </p>
        </section>

        {/* 1. General Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">1. General policy</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            All purchases made on Cardster are final and non‑refundable once the digital product has been successfully
            associated with your user account and delivered to the email address provided at the time of purchase. By
            completing your transaction, you acknowledge and agree to this policy.
          </p>
        </section>

        {/* 2. Eligibility for Refunds */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">2. Eligibility for refunds</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Failed delivery:</strong> The product was not delivered due to a technical issue on our side.</li>
            <li><strong>Duplicate transactions:</strong> You were mistakenly charged multiple times for the same product due to a technical error.</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
            To request a refund under these circumstances, please contact support within 14 days of the purchase date.
          </p>
        </section>

        {/* 3. Exceptions */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. Exceptions</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Incorrect information (e.g., wrong email) was entered during checkout.</li>
            <li>You no longer want or need the product after delivery.</li>
            <li>The digital product has been successfully associated with your user account.</li>
          </ul>
        </section>

        {/* 4. How to Request a Refund */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">4. How to request a refund</h2>
          <ol className="mt-3 list-decimal pl-6 space-y-2 text-gray-700">
            <li>Contact our support team via the form on the <a className="underline" href="/contact">Contact</a> page.</li>
            <li>Provide your order ID, proof of purchase, and a detailed explanation of the issue.</li>
            <li>Allow up to 7 business days for investigation and a response.</li>
          </ol>
          <p className="mt-3 text-gray-700">Incomplete or inaccurate information may delay processing.</p>
        </section>

        {/* 5. Chargebacks and Disputes */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Chargebacks and disputes</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Please contact us first to resolve issues before initiating a chargeback or dispute with your bank or
            payment provider. Unauthorized chargebacks may result in suspension or termination of your Cardster account.
          </p>
        </section>

        {/* 6. Contact Information */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">6. Contact information</h2>
          <p className="mt-3 text-gray-700">Need help? Reach us via the <a className="underline" href="/contact">Contact</a> page.</p>
        </section>

        {/* 7. Changes to this Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Changes to this policy</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may update or modify this refund policy at any time without prior notice. Changes are effective
            immediately upon posting on our website.
          </p>
        </section>

        <p className="mt-6 text-gray-700">
          By completing a purchase on Cardster, you confirm that you have read, understood, and agreed to this refund
          policy.
        </p>
      </div>
    </div>
  );
}


