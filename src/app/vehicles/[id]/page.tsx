import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";
import { deleteService, deleteVehicle } from "@/lib/actions";
import { prisma } from "@/lib/db";
import {
  formatCost,
  formatDate,
  formatOdometer,
  getServiceLabel,
} from "@/lib/utils";

export default async function VehiclePage({
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
    include: {
      services: { orderBy: { date: "desc" } },
    },
  });

  if (!vehicle) {
    notFound();
  }

  const vehicleTypeLabel = {
    CAR: dict.vehicle.car,
    MOTORCYCLE: dict.vehicle.motorcycle,
  };

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← {dict.vehicle.backToDashboard}
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {vehicleTypeLabel[vehicle.type]}
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {vehicle.name}
            </h1>
            {(vehicle.make || vehicle.model || vehicle.year) && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {[vehicle.make, vehicle.model, vehicle.year]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {formatOdometer(vehicle.odometer, vehicle.odometerUnit, locale)}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href={`/vehicles/${vehicle.id}/services/new`}>
              <Button>{dict.vehicle.logService}</Button>
            </Link>
            <form action={deleteVehicle.bind(null, vehicle.id)}>
              <Button type="submit" variant="danger" size="sm">
                {dict.common.delete}
              </Button>
            </form>
          </div>
        </div>

        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {dict.vehicle.serviceHistory}
        </h2>

        {vehicle.services.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              {dict.vehicle.noServices}
            </p>
            <Link
              href={`/vehicles/${vehicle.id}/services/new`}
              className="mt-4 inline-block"
            >
              <Button>{dict.vehicle.logFirst}</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicle.services.map((service) => (
              <Card key={service.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formatDate(service.date, locale)}
                      {service.odometer != null && (
                        <span className="ms-2 font-normal text-zinc-500 dark:text-zinc-400">
                          ·{" "}
                          {formatOdometer(
                            service.odometer,
                            vehicle.odometerUnit,
                            locale,
                          )}
                        </span>
                      )}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {service.serviceTypes.map((type) => (
                        <span
                          key={type}
                          className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {getServiceLabel(type, dict)}
                        </span>
                      ))}
                    </div>
                    {service.notes && (
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        {service.notes}
                      </p>
                    )}
                    {service.cost != null && (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {formatCost(service.cost, locale)}
                      </p>
                    )}
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await deleteService(service.id, vehicle.id);
                    }}
                  >
                    <Button type="submit" variant="ghost" size="sm">
                      {dict.common.remove}
                    </Button>
                  </form>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
