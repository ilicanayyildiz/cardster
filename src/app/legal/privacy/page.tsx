export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Privacy Statement</h1>

        {/* Effective Date */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Effective Date: 01.12.2024</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong>Cardster</strong> ("we", "our", "us") is committed to protecting your privacy and handling your
            personal data securely and transparently. This policy explains how we collect, use, and protect your
            information in compliance with applicable data protection laws (including GDPR where relevant).
          </p>
        </section>

        {/* 1. Who We Are */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">1. Who we are</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Cardster is the data controller for personal data collected through our website.
          </p>
        </section>

        {/* 2. What Information We Collect */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">2. What information we collect</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Contact information:</strong> name, email address, phone number.</li>
            <li><strong>Transaction information:</strong> payment details and purchase history.</li>
            <li><strong>Technical data:</strong> IP address, browser type, device and usage data.</li>
            <li><strong>Customer support:</strong> details you share when contacting us.</li>
          </ul>
        </section>

        {/* 3. How We Use Your Data */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. How we use your data</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>To process and fulfill your orders.</li>
            <li>To provide customer support and communicate with you.</li>
            <li>To improve our services and website experience.</li>
            <li>To comply with legal and regulatory obligations.</li>
          </ul>
        </section>

        {/* 4. Legal Basis */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">4. Legal basis for processing</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Performance of a contract:</strong> to provide requested services.</li>
            <li><strong>Legal obligation:</strong> to comply with applicable laws.</li>
            <li><strong>Legitimate interests:</strong> to enhance services and ensure security.</li>
          </ul>
        </section>

        {/* 5. Sharing Your Data */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Sharing your data</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Payment processors and financial institutions.</li>
            <li>Service providers supporting our operations (e.g., IT, customer support).</li>
            <li>Authorities when required by law or regulation.</li>
          </ul>
        </section>

        {/* 6. Your Rights */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">6. Your rights</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Access</strong> to your data.</li>
            <li><strong>Rectification</strong> of inaccurate data.</li>
            <li><strong>Erasure</strong> of your data, subject to legal requirements.</li>
            <li><strong>Restriction</strong> of processing in certain circumstances.</li>
            <li><strong>Portability</strong> of your data in a machine‑readable format.</li>
            <li><strong>Objection</strong> to processing based on legitimate interests.</li>
          </ul>
          <p className="mt-3 text-gray-700">To exercise your rights, contact us via the form on our <a className="underline" href="/contact">Contact</a> page.</p>
        </section>

        {/* 7. Data Retention */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Data retention</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We retain personal data only as long as necessary for the purposes described or as required by law.
          </p>
        </section>

        {/* 8. Security */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">8. Security</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We implement technical and organizational measures designed to protect your data from unauthorized access,
            loss, or misuse.
          </p>
        </section>

        {/* 9. International Transfers */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">9. International transfers</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Your data is primarily processed within your region. If transfers occur outside the EEA or your jurisdiction,
            appropriate safeguards will be applied (such as standard contractual clauses).
          </p>
        </section>

        {/* 10. Cookies */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">10. Cookies</h2>
          <p className="mt-3 text-gray-700">We use cookies to enhance your experience. See our <a className="underline" href="/legal/cookies">Cookie Policy</a> for details.</p>
        </section>

        {/* 11. Changes to This Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">11. Changes to this policy</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may update this policy periodically. Any changes will be posted on this page with an updated effective
            date.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">12. Contact us</h2>
          <p className="mt-3 text-gray-700">If you have questions about this policy, please reach us via the <a className="underline" href="/contact">Contact</a> page.</p>
        </section>
      </div>
    </div>
  );
}


