import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {dict.home.badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            {dict.home.title}
          </h1>
          <p className="mx-auto max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            {dict.home.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/register">
              <Button size="lg">{dict.home.getStarted}</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                {dict.auth.signIn}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            dict.home.features.track,
            dict.home.features.vehicles,
            dict.home.features.history,
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
