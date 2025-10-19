"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  function validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[.,\-*]/.test(password)) {
      return "Password must contain at least one special character (., -, *)";
    }
    return null;
  }

  function getPasswordRequirements() {
    return {
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[.,\-*]/.test(password)
    };
  }

  async function onSubmit(formData: FormData) {
    setError(null);
    setPasswordError(null);
    
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    
    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setPassword(""); // Clear only password field
      return;
    }
    
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: undefined
      }
    });
    if (error) {
      setError(error.message);
      setPassword(""); // Clear only password field on error
    } else {
      // Auto sign in after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setPassword(""); // Clear only password field on error
      } else {
        // ensure profile row exists after auto sign-in
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('profiles').upsert({ id: user.id, email: user.email ?? '' });
        }
        window.location.href = "/dashboard";
      }
    }
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="mx-auto max-w-sm px-4 py-10">
         <div className="bg-gray-900/50 backdrop-blur rounded-xl p-10 border border-purple-800/30">
           <h1 className="text-3xl font-semibold text-white mb-8">Create Account</h1>
           <form action={onSubmit} className="space-y-6">
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all" 
              required 
            />
            {/* Password Requirements */}
            <div className="text-xs text-gray-400 space-y-1">
              <div className={`flex items-center gap-2 ${getPasswordRequirements().length ? 'text-green-400' : 'text-red-400'}`}>
                <span>{getPasswordRequirements().length ? '✓' : '✗'}</span>
                <span>At least 8 characters</span>
              </div>
              <div className={`flex items-center gap-2 ${getPasswordRequirements().number ? 'text-green-400' : 'text-red-400'}`}>
                <span>{getPasswordRequirements().number ? '✓' : '✗'}</span>
                <span>Contains at least one number</span>
              </div>
              <div className={`flex items-center gap-2 ${getPasswordRequirements().special ? 'text-green-400' : 'text-red-400'}`}>
                <span>{getPasswordRequirements().special ? '✓' : '✗'}</span>
                <span>Contains special character (., -, *)</span>
              </div>
            </div>
            <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-4 hover:from-purple-700 hover:to-pink-700 transition-all">
              Sign up
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          {passwordError && <p className="mt-4 text-sm text-red-400">{passwordError}</p>}
          <div className="mt-4 text-sm text-gray-300">
            Already have an account? <Link href="/login" className="hover:text-purple-400 text-purple-400">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


