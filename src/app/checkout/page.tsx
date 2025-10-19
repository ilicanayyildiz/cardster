"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import PhoneInput from "@/components/PhoneInput";
import CountrySelect from "@/components/CountrySelect";
import { supabaseBrowser } from "@/lib/supabase/client";

type PaymentMethod = "card" | "bank_transfer" | "wallet" | null;

const BRAND_TITLES: Record<string, string> = {
  bigolive: "Bigo Live",
  eaapex: "EA Apex",
  honorofkings: "Honor of Kings",
  discordnitro: "Discord Nitro",
  eaplay: "EA Play",
  playstationstore: "PlayStation Store",
  xboxgamepass: "Xbox Game Pass",
  gamestop: "GameStop",
  twitch: "Twitch",
  netflix: "Netflix",
  amazon: "Amazon",
  googleplay: "Google Play",
  xbox: "Xbox",
  roblox: "Roblox",
  nintendo: "Nintendo",
  genshinimpact: "Genshin Impact",
  spotify: "Spotify",
  blizzard: "Blizzard",
};

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const id = params.get("id");
  const amount = Number(params.get("amount"));
  const productTitle = BRAND_TITLES[String(id || "")] ? `${BRAND_TITLES[String(id || "")] } Gift Card` : String(id || "-");
  const serviceFee = useMemo(() => {
    if (isNaN(amount)) return 0;
    const fee = amount * 0.277; // tuned to resemble reference
    return Number(fee.toFixed(2));
  }, [amount]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const productImageUrl = id
    ? (supabaseUrl
        ? `${supabaseUrl}/storage/v1/object/public/images/${id}.png`
        : `/images/${id}.png`)
    : undefined;

  const formatEUR = (n: number) => `EUR ${n.toFixed(2)}`;
  const total = isNaN(amount) ? 0 : amount + serviceFee;

  // Card payment form state
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  function generateCode(): string {
    const digits = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("");
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}-${digits.slice(12)}`;
  }

  async function pay() {
    setLoading(true);
    // Create order (mock paid)
    const purchaseCode = generateCode();
    try {
      const supabase = supabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      const res = await fetch('/api/orders', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) }, 
        body: JSON.stringify({ product_slug: id, amount, code: purchaseCode, category: params.get('category') || null }) 
      });
      // Optional: surface error for debugging
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        console.error('orders api error', res.status, j);
      }
    } catch (e) {
      console.error('orders api exception', e);
    }
    setTimeout(() => {
      setLoading(false);
      const orderId = Date.now();
      router.push(`/checkout/success?order=${orderId}${id ? `&id=${encodeURIComponent(String(id))}` : ""}&code=${encodeURIComponent(purchaseCode)}`);
    }, 500);
  }

  function stripDigits(value: string) {
    return value.replace(/\d+/g, "");
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-semibold text-gray-900">Check out</h1>

      <div className="mt-6 grid md:grid-cols-3 gap-6 items-start">
        {/* Left column */}
        <div className="md:col-span-2 border rounded-xl bg-white p-6 space-y-4">
          {step === 1 && <FormPayer onContinue={() => setStep(2)} />}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-900">
                <div className="text-xl font-semibold">Payment Page</div>
                <div className="text-lg font-semibold">Cardster</div>
              </div>
              <div className="rounded-lg border bg-white p-4 w-full md:w-[520px] text-gray-900">
                <div className="text-xs">Value of</div>
                <div className="text-4xl font-bold">{formatEUR(total)} <span className="text-2xl align-middle">EUR</span></div>
              </div>

              <div className="rounded-lg border bg-white p-4 w-full md:w-[520px] text-gray-900">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl font-semibold">Pay with your card</div>
                  <div className="text-sm">VISA • MasterCard</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm">Cardholder Name</label>
                    <input value={cardholder} onChange={(e)=>setCardholder(e.target.value.replace(/\d+/g, ''))} placeholder="Cardholder Name" className="mt-1 w-full border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="text-sm">Card Number</label>
                    <input
                      value={cardNumber}
                      onChange={(e)=>{
                        const digits = e.target.value.replace(/\D/g, '');
                        const groups = digits.match(/.{1,4}/g) || [];
                        setCardNumber(groups.join(' ').slice(0, 19));
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="mt-1 w-full border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Exp Date</label>
                      <input
                        value={exp}
                        onChange={(e)=>{
                          const digits = e.target.value.replace(/\D/g, '');
                          let m = digits.slice(0,2);
                          let y = digits.slice(2,4);
                          // clamp month between 01 and 12
                          if (m.length === 2) {
                            const im = Math.max(1, Math.min(12, parseInt(m,10) || 0));
                            m = String(im).padStart(2,'0');
                          }
                          // enforce year >= 25 (i.e., > 24)
                          if (y.length === 2) {
                            const iy = Math.max(25, parseInt(y,10) || 0);
                            y = String(iy).padStart(2,'0').slice(-2);
                          }
                          const formatted = [m, y].filter(Boolean).join('/');
                          setExp(formatted);
                        }}
                        placeholder="MM/YY"
                        className="mt-1 w-full border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm">CVV</label>
                      <input
                        value={cvv}
                        onChange={(e)=>{
                          const v = e.target.value.replace(/\D/g, '').slice(0,3);
                          setCvv(v);
                        }}
                        placeholder="000"
                        className="mt-1 w-full border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-sm">
                    <input type="checkbox" checked={agreeTerms} onChange={(e)=>setAgreeTerms(e.target.checked)} />
                    <span>I have read and agree with the <a className="underline" href="/legal/terms" target="_blank">Terms & Conditions</a>.</span>
                  </label>
                  <label className="flex items-start gap-2 text-sm">
                    <input type="checkbox" checked={agreePrivacy} onChange={(e)=>setAgreePrivacy(e.target.checked)} />
                    <span>I have read and agree with the <a className="underline" href="/legal/privacy" target="_blank">Privacy Policy</a>.</span>
                  </label>

                  <button
                    onClick={pay}
                    disabled={loading || !agreeTerms || !agreePrivacy || !cardholder || !cardNumber || !exp || !cvv}
                    className="mt-1 w-full rounded-md bg-[#e5d64f] hover:bg-[#dccc3f] px-5 py-3 font-semibold text-gray-900 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Pay for Order'}
                  </button>
                  <div className="text-center text-sm mt-2"><a className="underline" href="#" onClick={(e)=>{e.preventDefault(); setStep(1);}}>Cancel</a></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right column - summary */}
        <div className="border rounded-xl bg-white p-4 self-start justify-self-start w-full md:w-[520px]">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="relative h-8 w-14 ring-1 ring-gray-200 rounded bg-white overflow-hidden">
              {productImageUrl && (
                <Image src={productImageUrl} alt={productTitle} fill sizes="56px" className="object-contain p-1" />
              )}
            </div>
            <div className="text-lg font-semibold text-gray-900">{productTitle}</div>
          </div>
          <div className="pt-3 text-gray-900 space-y-2">
            <div className="flex items-center justify-between">
              <span>{productTitle}</span>
              <span>{isNaN(amount) ? '-' : formatEUR(amount)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-900">
              <span className="inline-flex items-center gap-2">Service fee
                <span className="relative inline-flex">
                  <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full bg-blue-600 text-white cursor-pointer group">i
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-64 rounded-lg bg-gray-900 text-white text-sm p-3 shadow-lg">
                      <div className="font-semibold mb-1">Why do you pay service fee?</div>
                      <div className="mb-1">Best service guaranteed</div>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Quick & easy online shopping</li>
                        <li>Receive your code on screen & email</li>
                        <li>24/7 customer support</li>
                        <li>Safe & secure payment</li>
                      </ul>
                    </span>
                  </span>
                </span>
              </span>
              <span>{formatEUR(serviceFee)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>TOTAL</span>
              <span>{isNaN(amount) ? '-' : formatEUR(amount + serviceFee)}</span>
            </div>
          </div>

          
        </div>
      </div>
      </div>
    </div>
  );
}

function FormPayer({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const emailInvalid = email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const stripDigits = (v: string) => v.replace(/\d+/g, "");

  const requiredMissing = [email, firstName, lastName, dob, country, city, address, phone].some((v) => v.trim() === "");

  return (
    <>
      <div className="text-lg font-semibold text-gray-900">1. Payer Information</div>
      <div className="text-sm text-gray-600">That's where we'll send your code.</div>
      <div className="grid gap-3">
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={`border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500 w-full ${emailInvalid ? 'border-red-500' : ''}`}
          />
          {emailInvalid && <div className="text-xs text-red-600 mt-1">Enter a valid email address.</div>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={firstName}
            onChange={(e) => setFirstName(stripDigits(e.target.value))}
            placeholder="First name"
            inputMode="text"
            className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(stripDigits(e.target.value))}
            placeholder="Last name"
            inputMode="text"
            className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
          />
        </div>
        <input
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          type="date"
          placeholder="Date of birth"
          className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <CountrySelect selectedCode={country} onChange={setCountry} />
          <input
            value={state}
            onChange={(e) => setState(stripDigits(e.target.value))}
            placeholder="State or Province"
            inputMode="text"
            className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={city}
            onChange={(e) => setCity(stripDigits(e.target.value))}
            placeholder="City"
            inputMode="text"
            className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500"
          />
          <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip code" className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500" />
        </div>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border rounded-md px-3 h-12 text-gray-900 placeholder-gray-500" />
        <PhoneInput onValueChange={setPhone} />

        {requiredMissing && (
          <div className="text-xs text-red-600">Please fill in all required fields.</div>
        )}

        <button
          onClick={() => {
            if (!emailInvalid && !requiredMissing) onContinue();
          }}
          className="mt-2 w-full sm:w-auto rounded-md bg-[#e5d64f] hover:bg-[#dccc3f] px-5 py-3 font-semibold text-gray-900"
        >
          Continue to payment
        </button>
      </div>
    </>
  );
}


