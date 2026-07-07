import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { ConfirmButton } from "@/components/confirm-button";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";
import { deleteService, deleteVehicle } from "@/lib/actions";
import { prisma } from "@/lib/db";
import {
  cn,
  formatCost,
  formatDate,
  formatOdometer,
  formatServiceEntry,
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

  const vehicleEmoji = vehicle.type === "CAR" ? "🚗" : "🏍️";

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-6 sm:pb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← {dict.vehicle.backToDashboard}
        </Link>

        {/* Vehicle summary card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              {vehicleEmoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {vehicleTypeLabel[vehicle.type]}
              </div>
              <h1 className="truncate text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {vehicle.name}
              </h1>
              {(vehicle.make || vehicle.model || vehicle.year) && (
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {[vehicle.make, vehicle.model, vehicle.year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div className="rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/60">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {dict.vehicle.currentOdometer}
              </p>
              <p className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {formatOdometer(vehicle.odometer, vehicle.odometerUnit, locale)}
              </p>
            </div>
            <div className="rounded-xl bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/60">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {dict.vehicle.serviceHistory}
              </p>
              <p className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {dict.vehicle.entries(vehicle.services.length)}
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="mt-4 hidden gap-2 sm:flex">
            <Link href={`/vehicles/${vehicle.id}/services/new`} className="flex-1">
              <Button className="w-full">{dict.vehicle.logService}</Button>
            </Link>
            <ConfirmButton
              action={deleteVehicle.bind(null, vehicle.id)}
              confirmMessage={dict.vehicle.confirmDelete(vehicle.name)}
              variant="ghost"
              size="md"
            >
              {dict.common.delete}
            </ConfirmButton>
          </div>
        </div>

        {/* Delete vehicle — subdued, mobile */}
        <div className="mt-3 flex justify-center sm:hidden">
          <ConfirmButton
            action={deleteVehicle.bind(null, vehicle.id)}
            confirmMessage={dict.vehicle.confirmDelete(vehicle.name)}
            variant="ghost"
            size="sm"
            className="text-zinc-400 dark:text-zinc-500"
          >
            {dict.common.delete}
          </ConfirmButton>
        </div>

        <h2 className="mb-3 mt-8 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
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
          <ol className="relative space-y-4">
            {vehicle.services.map((service, index) => (
              <li key={service.id} className="relative ps-6">
                {index !== vehicle.services.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute start-[7px] top-5 h-[calc(100%+0.5rem)] w-px bg-zinc-200 dark:bg-zinc-800"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute start-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-400 dark:border-zinc-950 dark:bg-zinc-600"
                />

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {formatDate(service.date, locale)}
                      </p>
                      {service.odometer != null && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {formatOdometer(
                            service.odometer,
                            vehicle.odometerUnit,
                            locale,
                          )}
                        </p>
                      )}
                    </div>
                    <ConfirmButton
                      action={async () => {
                        "use server";
                        await deleteService(service.id, vehicle.id);
                      }}
                      confirmMessage={dict.service.confirmDelete}
                      variant="ghost"
                      size="sm"
                      className="shrink-0 !h-8 !w-8 !px-0 text-zinc-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
                    >
                      ✕
                    </ConfirmButton>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {service.serviceTypes.map((type) => (
                      <span
                        key={type}
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                        )}
                      >
                        {formatServiceEntry(type, dict)}
                      </span>
                    ))}
                  </div>

                  {service.notes && (
                    <p className="mt-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {service.notes}
                    </p>
                  )}

                  {service.cost != null && (
                    <p className="mt-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {formatCost(service.cost, locale)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>

      {/* Sticky mobile action bar */}
      <div
        className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur sm:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <Link href={`/vehicles/${vehicle.id}/services/new`}>
          <Button className="w-full" size="lg">
            {dict.vehicle.logService}
          </Button>
        </Link>
      </div>
    </>
  );
}
