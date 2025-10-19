"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div 
          className="col-span-2 md:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cardster
          </div>
          <p className="mt-3 leading-6 text-gray-300">
            Fast, secure and reliable top-ups. All your essential pages below.
          </p>
        </motion.div>

        {/* Buy on Cardster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="font-semibold text-lg text-white mb-4">Buy on Cardster</div>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link href="/topup" className="text-gray-300 hover:text-purple-400 transition-colors">Mobile top-up</Link></li>
            <li><Link href="/topup?category=esim" className="text-gray-300 hover:text-purple-400 transition-colors">eSim</Link></li>
            <li><Link href="/topup?category=entertainment" className="text-gray-300 hover:text-purple-400 transition-colors">Entertainment</Link></li>
            <li><Link href="/topup?category=shopping" className="text-gray-300 hover:text-purple-400 transition-colors">Shopping</Link></li>
            <li><Link href="/game-cards" className="text-gray-300 hover:text-purple-400 transition-colors">Game cards</Link></li>
            <li><Link href="/topup?category=food" className="text-gray-300 hover:text-purple-400 transition-colors">Food</Link></li>
            <li><Link href="/topup?category=travel" className="text-gray-300 hover:text-purple-400 transition-colors">Travel</Link></li>
            <li><Link href="/checkout" className="text-gray-300 hover:text-purple-400 transition-colors">Checkout</Link></li>
            <li><Link href="/how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">How It Works</Link></li>
          </ul>
        </motion.div>

        {/* My account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="font-semibold text-lg text-white mb-4">My account</div>
          <ul className="space-y-3">
            <li><Link href="/profile" className="text-gray-300 hover:text-purple-400 transition-colors">Profile</Link></li>
            <li><Link href="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors">Orders</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contacts</Link></li>
            <li><Link href="/login" className="text-gray-300 hover:text-purple-400 transition-colors">Login</Link></li>
            <li><Link href="/register" className="text-gray-300 hover:text-purple-400 transition-colors">Register</Link></li>
            <li><Link href="/reset" className="text-gray-300 hover:text-purple-400 transition-colors">Reset Password</Link></li>
          </ul>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="font-semibold text-lg text-white mb-4">Help &amp; Support</div>
          <ul className="space-y-3">
            <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Need help?</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About us</Link></li>
            <li><Link href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">Blog</Link></li>
            <li><Link href="/faq" className="text-gray-300 hover:text-purple-400 transition-colors">FAQ</Link></li>
            <li><Link href="/business" className="text-gray-300 hover:text-purple-400 transition-colors">Business</Link></li>
            <li><Link href="/legal/terms" className="text-gray-300 hover:text-purple-400 transition-colors">Terms and Conditions</Link></li>
            <li><Link href="/legal/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy Statement</Link></li>
            <li><Link href="/legal/cookies" className="text-gray-300 hover:text-purple-400 transition-colors">Cookie Statement</Link></li>
            <li><Link href="/legal/cancellation" className="text-gray-300 hover:text-purple-400 transition-colors">Cancellation Policy</Link></li>
            <li><Link href="/legal/refund" className="text-gray-300 hover:text-purple-400 transition-colors">Refund Policy</Link></li>
            <li><Link href="/legal/delivery" className="text-gray-300 hover:text-purple-400 transition-colors">Delivery Policy</Link></li>
          </ul>
        </motion.div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-2 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span>© {new Date().getFullYear()} Cardster. Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>for you</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gray-800 px-3 py-1 rounded-full">💳 Visa</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">💳 Mastercard</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">🔒 Secure</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}


