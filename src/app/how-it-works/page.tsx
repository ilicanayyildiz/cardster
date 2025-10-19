export default function HowItWorks() {
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">How It Works</h1>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          <li className="border rounded-xl bg-white p-6">
            <div className="font-semibold text-gray-900">Choose a product</div>
            <p className="mt-2 text-gray-600">Pick from popular brands and carriers.</p>
          </li>
          <li className="border rounded-xl bg-white p-6">
            <div className="font-semibold text-gray-900">Pay securely</div>
            <p className="mt-2 text-gray-600">Secure, fast checkout with multiple options.</p>
          </li>
          <li className="border rounded-xl bg-white p-6">
            <div className="font-semibold text-gray-900">Receive instantly</div>
            <p className="mt-2 text-gray-600">Get your code on-screen and via email.</p>
          </li>
        </ol>
      </div>
    </div>
  );
}


