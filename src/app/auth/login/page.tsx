"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { siteLoginAction } from "./actions";

export default function SiteLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await siteLoginAction(fd);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#064E3B] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/10 p-8 backdrop-blur-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">RistoInTour</h1>
          <p className="mt-2 text-sm text-white/70">
            Accesso temporaneo &mdash; Il sito sar&agrave; pubblico a breve
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/80">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-[#F86D16] focus:ring-1 focus:ring-[#F86D16]"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-[#F86D16] focus:ring-1 focus:ring-[#F86D16]"
              placeholder="Password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/20 px-3 py-2 text-center text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[#F86D16] py-2.5 font-semibold text-white transition hover:bg-[#e05e0d] disabled:opacity-50"
          >
            {pending ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
