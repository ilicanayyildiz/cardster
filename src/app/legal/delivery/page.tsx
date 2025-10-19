export default function DeliveryPolicyPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Delivery policy</h1>

        {/* Effective Date */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Effective Date: 01.12.2024</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Thank you for choosing <strong>Cardster</strong> for your digital purchases. This delivery policy outlines
            how products are delivered and what to do if you encounter any delivery issues.
          </p>
        </section>

        {/* 1. Delivery Method */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">1. Delivery method</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            All products purchased on Cardster are delivered digitally. Once your payment has been successfully
            processed, the digital product will be associated with your user account and sent to the email address
            provided during checkout. No physical products are shipped.
          </p>
        </section>

        {/* 2. Delivery Timeline */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">2. Delivery timeline</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Digital products are typically delivered instantly after the transaction is completed and approved.</li>
            <li>In rare cases, delivery may take up to 15 minutes due to technical delays or verification checks.</li>
            <li>If you do not receive your product within this timeframe, please contact our support team.</li>
          </ul>
        </section>

        {/* 3. Accurate Information */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. Accurate information</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            To ensure successful delivery, please verify that your email address and other checkout details are correct.
            Cardster is not responsible for delivery failures caused by incorrect or incomplete information entered by
            the user.
          </p>
        </section>

        {/* 4. Delivery Confirmation */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">4. Delivery confirmation</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            A confirmation email will be sent to your registered email address once the product has been delivered.
            This email serves as proof of delivery. If you do not receive the email, please check your spam or junk
            folder before contacting support.
          </p>
        </section>

        {/* 5. Delivery Issues */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Delivery issues</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">Contact support immediately if you experience any of the following:</p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Non‑receipt of the product within the expected timeframe.</li>
            <li>Issues accessing or using the digital product after delivery.</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
            When contacting us, please include your order ID or proof of purchase and a short description of the issue.
            Our team will investigate and typically resolve the matter within 1–2 business days.
          </p>
        </section>

        {/* 6. Important Notes */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">6. Important notes</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Products are considered delivered once sent to your email and associated with your account.</li>
            <li>Cardster is not responsible for delays caused by your email provider or internet service.</li>
          </ul>
        </section>

        {/* 7. Contact Information */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Contact information</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Need help with delivery? Reach us via the contact form on our <a className="underline" href="/contact">Contact</a> page.
          </p>
        </section>

        {/* 8. Changes to this Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">8. Changes to this policy</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may update this delivery policy from time to time. Changes take effect immediately upon posting on our
            website. Please review this page periodically to stay informed.
          </p>
        </section>

        <p className="mt-6 text-gray-700">
          By completing a purchase on Cardster, you confirm that you have read, understood, and agreed to this delivery
          policy.
        </p>
      </div>
    </div>
  );
}


