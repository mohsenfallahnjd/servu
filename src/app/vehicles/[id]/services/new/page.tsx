import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { ServiceForm } from "@/components/service-form";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";
import { prisma } from "@/lib/db";

export default async function NewServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { id } = await params;

  const vehicle = await prisma.vehicle.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="mb-6 inline-flex text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← {dict.vehicle.backToVehicle(vehicle.name)}
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {dict.vehicle.logServiceTitle}
        </h1>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          {dict.vehicle.logServiceSubtitle}
        </p>

        <ServiceForm
          vehicleId={vehicle.id}
          vehicleType={vehicle.type}
          defaultOdometer={vehicle.odometer}
        />
      </main>
    </>
  );
}
