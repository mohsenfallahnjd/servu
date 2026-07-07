import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { VehicleForm } from "@/components/vehicle-form";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function NewVehiclePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← {dict.vehicle.backToDashboard}
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {dict.vehicle.addTitle}
        </h1>

        <VehicleForm />
      </main>
    </>
  );
}
