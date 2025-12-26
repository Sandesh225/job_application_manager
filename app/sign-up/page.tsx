"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to sign up");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 via-stone-50 to-teal-50/30 dark:from-stone-950 dark:via-stone-950 dark:to-teal-950/20 p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-teal-400/15 via-cyan-400/10 to-transparent dark:from-teal-500/8 dark:via-cyan-500/5 organic-blob blur-[120px]" />
      <div className="absolute bottom-1/4 -right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/12 via-pink-400/8 to-transparent dark:from-purple-500/6 dark:via-pink-500/4 organic-blob-2 blur-[100px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 shadow-glow-md mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-stone-900 dark:text-white mb-2">
              Job <span className="text-gradient">Hunt.</span>
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
              Your career command center awaits
            </p>
          </div>
        </div>

        {/* Card */}
        <Card className="glass-2 border border-stone-200/60 dark:border-white/10 shadow-2xl shadow-stone-900/10 dark:shadow-primary/5 rounded-[2rem] overflow-hidden">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-black tracking-tight text-stone-900 dark:text-white">
              Sign Up
            </CardTitle>
            <CardDescription className="text-stone-600 dark:text-stone-400 font-medium">
              Create an account to start tracking your job applications
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 p-4 animate-in">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2.5">
                <Label 
                  htmlFor="name" 
                  className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-stone-100/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60 focus:border-primary/60 dark:focus:border-primary/60 focus:bg-white dark:focus:bg-stone-900/80 rounded-xl backdrop-blur-sm transition-all duration-300 font-semibold"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2.5">
                <Label 
                  htmlFor="email" 
                  className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-stone-100/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60 focus:border-primary/60 dark:focus:border-primary/60 focus:bg-white dark:focus:bg-stone-900/80 rounded-xl backdrop-blur-sm transition-all duration-300 font-semibold"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <Label 
                  htmlFor="password" 
                  className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12 bg-stone-100/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60 focus:border-primary/60 dark:focus:border-primary/60 focus:bg-white dark:focus:bg-stone-900/80 rounded-xl backdrop-blur-sm transition-all duration-300 font-semibold"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Must be at least 8 characters long
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 dark:from-primary dark:to-cyan-500 dark:hover:from-primary/90 dark:hover:to-cyan-400 text-white rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-bold text-primary hover:text-primary/80 dark:hover:text-primary/90 transition-colors inline-flex items-center gap-1 group/link"
                  >
                    Sign in
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-stone-500 dark:text-stone-400 px-4">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Footer Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-1 border border-stone-200/60 dark:border-white/10 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse shadow-sm shadow-primary/30"></div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
              Secure • Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}