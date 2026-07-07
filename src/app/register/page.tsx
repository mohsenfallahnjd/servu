import { Header } from "@/components/header";
import { RegisterForm } from "@/components/register-form";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function RegisterPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {dict.auth.registerTitle}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {dict.auth.registerSubtitle}
          </p>
        </div>
        <RegisterForm />
      </main>
    </>
  );
}
