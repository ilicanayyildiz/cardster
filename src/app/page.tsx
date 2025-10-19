"use client";
import { motion } from "framer-motion";
import { 
  BoltIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-16">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Top up your favorite services in seconds
          </h1>
          <p className="mt-4 text-gray-300">
            Cardster is the fastest way to buy game cards, gift cards, and mobile top-ups. Secure, instant, and trusted by thousands.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <motion.a 
              href="/topup" 
              className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Top-Up
            </motion.a>
            <motion.a 
              href="/how-it-works" 
              className="rounded-md border-2 border-purple-400 px-6 py-3 hover:bg-purple-900/20 transition-colors text-purple-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How it works
            </motion.a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
            <CheckCircleIcon className="w-4 h-4 text-purple-400" />
            <span>Fast</span>
            <CheckCircleIcon className="w-4 h-4 text-purple-400" />
            <span>Secure</span>
            <CheckCircleIcon className="w-4 h-4 text-purple-400" />
            <span>24/7</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="rounded-xl border-2 border-purple-800/30 bg-gradient-to-br from-purple-900/20 to-gray-900/40 p-6 shadow-lg hover:shadow-xl backdrop-blur" 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BoltIcon className="w-8 h-8 text-purple-400 mb-3" />
            <div className="font-semibold text-lg text-white">Instant delivery</div>
            <p className="mt-2 text-gray-300">Receive codes and credits immediately after purchase.</p>
          </motion.div>
          <motion.div 
            className="rounded-xl border-2 border-pink-800/30 bg-gradient-to-br from-pink-900/20 to-gray-900/40 p-6 shadow-lg hover:shadow-xl backdrop-blur" 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShieldCheckIcon className="w-8 h-8 text-pink-400 mb-3" />
            <div className="font-semibold text-lg text-white">Secure payments</div>
            <p className="mt-2 text-gray-300">Industry-standard security and fraud protection.</p>
          </motion.div>
          <motion.div 
            className="rounded-xl border-2 border-indigo-800/30 bg-gradient-to-br from-indigo-900/20 to-gray-900/40 p-6 shadow-lg hover:shadow-xl backdrop-blur" 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GlobeAltIcon className="w-8 h-8 text-indigo-400 mb-3" />
            <div className="font-semibold text-lg text-white">Global coverage</div>
            <p className="mt-2 text-gray-300">Popular brands and carriers in multiple regions.</p>
          </motion.div>
        </div>

        <div>
          <motion.h2 
            className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How it works
          </motion.h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="rounded-xl border-2 border-purple-800/30 bg-gradient-to-br from-purple-900/20 to-gray-900/40 p-6 shadow-lg backdrop-blur"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-400 font-bold text-lg">1</span>
              </div>
              <div className="font-semibold text-lg text-white">Choose a product</div>
              <p className="mt-2 text-gray-300">Select a game card, gift card, or mobile top-up.</p>
            </motion.div>
            <motion.div 
              className="rounded-xl border-2 border-pink-800/30 bg-gradient-to-br from-pink-900/20 to-gray-900/40 p-6 shadow-lg backdrop-blur"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-pink-900/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-pink-400 font-bold text-lg">2</span>
              </div>
              <div className="font-semibold text-lg text-white">Pay securely</div>
              <p className="mt-2 text-gray-300">Checkout with your preferred payment method.</p>
            </motion.div>
            <motion.div 
              className="rounded-xl border-2 border-indigo-800/30 bg-gradient-to-br from-indigo-900/20 to-gray-900/40 p-6 shadow-lg backdrop-blur"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-400 font-bold text-lg">3</span>
              </div>
              <div className="font-semibold text-lg text-white">Get your code</div>
              <p className="mt-2 text-gray-300">Receive instantly on-screen and by email.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
