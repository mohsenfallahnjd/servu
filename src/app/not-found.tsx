import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {dict.notFound.title}
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        {dict.notFound.desc}
      </p>
      <Link
        href="/dashboard"
        className="mt-6 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
      >
        {dict.notFound.goDashboard}
      </Link>
    </main>
  );
}
