export default function AboutPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">About us</h1>

      {/* About Us */}
      <section className="mt-6 border rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">About Cardster</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Welcome to <strong>Cardster</strong> – your go‑to platform for fast and secure digital voucher solutions.
          Whether you’re topping up, sending credit as a gift, or staying connected across borders, we make digital
          transactions simple and seamless.
        </p>
      </section>

      {/* Who Are We */}
      <section className="mt-6 border rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">Who are we?</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          At <strong>Cardster</strong>, we’re a team of tech‑savvy people who care deeply about innovation and
          customer satisfaction. With years of experience in digital payments and voucher services, we build tools
          that help individuals and businesses manage top‑ups reliably and efficiently.
        </p>
      </section>

      {/* Our Values */}
      <section className="mt-6 border rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">Our values</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Innovation:</strong> We stay ahead of the curve, using modern technologies to deliver optimized
            experiences.
          </li>
          <li>
            <strong>Security:</strong> Every transaction matters. Your personal and payment information is protected
            with industry best practices.
          </li>
          <li>
            <strong>Simplicity:</strong> Clear flows and an intuitive interface—whether you’re topping up or gifting
            credit.
          </li>
          <li>
            <strong>Community:</strong> We support individuals and businesses to stay in control and connected.
          </li>
        </ul>
      </section>

      {/* Our Mission */}
      <section className="mt-6 border rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">Our mission</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          We aim to transform your experience with vouchers and gift cards—making it easier, faster, and more
          accessible for everyone. Whether you’re gifting credit, topping up, or seeking business solutions, Cardster
          is here to create seamless, valuable experiences.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mt-6 border rounded-xl bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">Why choose us?</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Cardster isn’t just about selling vouchers and top‑ups—it’s about building reliable, secure, and trustworthy
          experiences. We make sure every transaction is smooth and your credit stays safe. Join us.
        </p>
      </section>
      </div>
    </div>
  );
}


