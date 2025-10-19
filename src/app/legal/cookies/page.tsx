export default function CookiesPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Cookie statement</h1>

        {/* Effective Date */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Effective Date: 01.12.2024</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            This Cookie Policy explains how <strong>Cardster</strong> ("we", "our", "us") uses cookies and similar
            technologies to enhance your browsing experience and provide personalized content, including remarketing.
            By continuing to use our website, you agree to the use of cookies as described in this policy.
          </p>
        </section>

        {/* 1. What Are Cookies? */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">1. What are cookies?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help us improve
            functionality, analyze usage, and tailor content to your preferences.
          </p>
        </section>

        {/* 2. Types of Cookies We Use */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">2. Types of cookies we use</h2>
          <div className="mt-3 space-y-3 text-gray-700">
            <div>
              <div className="font-semibold text-gray-900">Essential cookies</div>
              <p className="mt-1">Necessary for core functionality, such as secure logins and session continuity.</p>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Performance and analytics cookies</div>
              <p className="mt-1">Help us analyze traffic and user behavior to improve performance (aggregated and anonymized).</p>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Marketing and remarketing cookies</div>
              <p className="mt-1">Track browsing behavior to display personalized ads and measure campaign effectiveness.</p>
            </div>
          </div>
        </section>

        {/* 3. How We Use Cookies */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. How we use cookies</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li>Ensure a functional and secure website experience.</li>
            <li>Analyze site usage to improve performance and features.</li>
            <li>Provide targeted advertising and remarketing content.</li>
          </ul>
        </section>

        {/* 4. Managing Cookies */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">4. Managing cookies</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            You can manage or disable cookies through your browser settings. Disabling essential cookies may impact
            website functionality.
          </p>
        </section>

        {/* 5. Third-Party Cookies */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Third‑party cookies</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Google Analytics</strong> — to analyze website usage and performance.</li>
            <li><strong>Google Ads / Facebook Pixel</strong> — for personalized advertising and remarketing.</li>
          </ul>
          <p className="mt-3 text-gray-700">These providers may place their own cookies. Please review their privacy policies for details.</p>
        </section>

        {/* 6. Updates to This Policy */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">6. Updates to this policy</h2>
          <p className="mt-3 text-gray-700">We may update this Cookie Policy. Changes will be posted here with an updated effective date.</p>
        </section>

        {/* 7. Contact Us */}
        <section className="mt-6 border rounded-xl bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Contact us</h2>
          <p className="mt-3 text-gray-700">Questions about cookies? Reach us via the <a className="underline" href="/contact">Contact</a> page.</p>
        </section>
      </div>
    </div>
  );
}


