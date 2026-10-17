"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "@/actions/admin-actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAdminAction(formData);
      if (res?.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res?.error || "Login failed. Please check credentials.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-walnut-950 px-4 py-12 select-none">
      {/* Background radial gold glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,110,0.15)_0%,rgba(38,31,26,0.98)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-lg border border-champagne-400/40 bg-walnut-900/95 p-8 shadow-2xl backdrop-blur-xl">
        {/* Emblem */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-champagne-400 shadow-[0_0_20px_rgba(212,175,110,0.4)]">
          <Image
            src="/images/ganesh-royal-red.jpg"
            alt="Lord Ganesha"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        <div className="mt-6 text-center">
          <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] text-champagne-400">
            Administrative Suite
          </span>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight text-ivory-50">
            Wedding Portal
          </h1>
          <p className="mt-2 font-body text-xs text-champagne-200/75">
            Sign in to manage guest RSVPs, hotel bookings, and wedding schedules.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-sm border border-rose-500/50 bg-rose-950/60 p-3.5 text-center text-xs font-medium text-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5"
            >
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="admin@wedding.com"
                placeholder="admin@wedding.com"
                className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 pl-10 pr-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-500 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5"
            >
              Master Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
              <input
                id="password"
                name="password"
                type="password"
                required
                defaultValue="RoyalWedding2026!"
                placeholder="Enter admin password"
                className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 pl-10 pr-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-500 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-champagne-400 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 py-3 font-sans text-xs font-bold uppercase tracking-widest text-walnut-950 shadow-md transition-all hover:brightness-105 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-walnut-950 border-t-transparent" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-champagne/15 pt-4 text-center">
          <p className="flex items-center justify-center gap-1.5 font-sans text-[0.68rem] text-champagne-300/60">
            <ShieldCheck className="h-3.5 w-3.5 text-champagne-400" />
            <span>End-to-End Encrypted Session</span>
          </p>
        </div>
      </div>
    </div>
  );
}
