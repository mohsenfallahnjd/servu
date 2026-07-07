import { Header } from "@/components/header";
import { LoginForm } from "@/components/login-form";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {dict.auth.welcomeBack}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {dict.auth.signInSubtitle}
          </p>
        </div>
        {params.registered && (
          <div className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
            {dict.auth.accountCreated}
          </div>
        )}
        <LoginForm />
      </main>
    </>
  );
}
