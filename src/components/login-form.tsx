"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const { dict } = useLocale();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(dict.auth.invalidCredentials);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}
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
        autoComplete="current-password"
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? dict.auth.signingIn : dict.auth.signIn}
      </Button>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        {dict.auth.noAccount}{" "}
        <Link
          href="/register"
          className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
        >
          {dict.auth.register}
        </Link>
      </p>
    </form>
  );
}
