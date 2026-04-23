"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KyrgyzLogo, DecorativeBorder } from "@/components/kyrgyz-pattern";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // First, ensure the users table exists
      await fetch("/api/migrate", { method: "POST" });

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Success - redirect to home
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <KyrgyzLogo className="mx-auto mb-4" size={100} />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join Kyrgyz Memory today</p>
        </div>

        <DecorativeBorder className="text-primary mb-8" />

        {/* Register Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Username
              </label>
              <Input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-base"
                required
                autoFocus
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground mt-1">3-20 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">At least 4 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-base"
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full font-bold text-base py-5"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
