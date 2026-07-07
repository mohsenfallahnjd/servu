"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const { dict } = useLocale();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? dict.auth.registerFailed);
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}
      <Input
        label={dict.common.name}
        name="name"
        autoComplete="name"
        required
      />
      <Input
        label={dict.common.email}
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label={dict.common.password}
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? dict.auth.creatingAccount : dict.auth.createAccount}
      </Button>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        {dict.auth.hasAccount}{" "}
        <Link
          href="/login"
          className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
        >
          {dict.auth.signIn}
        </Link>
      </p>
    </form>
  );
}
