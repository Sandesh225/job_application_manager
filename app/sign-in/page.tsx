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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, Sparkles } from "lucide-react";

export default function SignIn() {
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
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to sign in");
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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-50 dark:bg-stone-950 p-4 relative overflow-hidden">
      {/* Organic background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 organic-blob blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 organic-blob-2 blur-3xl"></div>

      <Card className="w-full max-w-md glass-1 shadow-2xl relative z-10 overflow-hidden rounded-[2rem] border-stone-200/50 dark:border-stone-800/50">
        <CardHeader className="space-y-3 relative pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
              <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-stone-900 dark:text-stone-50">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-stone-600 dark:text-stone-400 font-light">
            Sign in to continue your job search journey
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 relative">
            {error && (
              <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-12 h-12 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-50 placeholder:text-stone-400 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  className="pl-12 h-12 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-50 placeholder:text-stone-400 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 relative pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium shadow-lg shadow-teal-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-center text-sm text-stone-500 dark:text-stone-400 annotation">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}