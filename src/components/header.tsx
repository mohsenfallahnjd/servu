import Link from "next/link";
import { signOut } from "@/auth";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export async function Header({ userName }: { userName?: string | null }) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
        <Link
          href={userName ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <img
            src="/favicon-32.png"
            alt=""
            width={24}
            height={24}
            className="rounded-md"
          />
          {dict.app.name}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />
          {userName ? (
            <>
              <span className="hidden text-sm text-zinc-500 sm:inline dark:text-zinc-400">
                {userName}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <Button type="submit" variant="ghost" size="sm">
                  {dict.auth.signOut}
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {dict.auth.signIn}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{dict.auth.register}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
