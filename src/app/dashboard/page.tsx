import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";
import { prisma } from "@/lib/db";
import { formatDate, formatOdometer, getServiceLabel } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = getDictionary(locale);

  const vehicles = await prisma.vehicle.findMany({
    where: { userId: session.user.id },
    include: {
      services: {
        orderBy: { date: "desc" },
        take: 1,
      },
      _count: { select: { services: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const vehicleTypeLabel = {
    CAR: dict.vehicle.car,
    MOTORCYCLE: dict.vehicle.motorcycle,
  };

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {dict.dashboard.title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {vehicles.length === 0
                ? dict.dashboard.emptyHint
                : dict.dashboard.vehicleCount(vehicles.length)}
            </p>
          </div>
          <Link href="/vehicles/new">
            <Button>{dict.dashboard.addVehicle}</Button>
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              {dict.dashboard.noVehicles}
            </p>
            <Link href="/vehicles/new" className="mt-4 inline-block">
              <Button>{dict.dashboard.addFirst}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {vehicles.map((vehicle) => {
              const lastService = vehicle.services[0];
              return (
                <Card key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {vehicleTypeLabel[vehicle.type]}
                      </div>
                      <CardTitle>{vehicle.name}</CardTitle>
                      {(vehicle.make || vehicle.model || vehicle.year) && (
                        <CardDescription>
                          {[vehicle.make, vehicle.model, vehicle.year]
                            .filter(Boolean)
                            .join(" · ")}
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-end text-sm text-zinc-500 dark:text-zinc-400">
                      <p>
                        {formatOdometer(
                          vehicle.odometer,
                          vehicle.odometerUnit,
                          locale,
                        )}
                      </p>
                      <p className="mt-1">
                        {dict.dashboard.serviceCount(vehicle._count.services)}
                      </p>
                    </div>
                  </div>
                  {lastService && (
                    <p className="mt-3 border-t border-zinc-100 pt-3 text-xs text-zinc-400 dark:border-zinc-800">
                      {dict.dashboard.lastService}:{" "}
                      {formatDate(lastService.date, locale)} —{" "}
                      {lastService.serviceTypes
                        .slice(0, 2)
                        .map((s) => getServiceLabel(s, dict))
                        .join("، ")}
                      {lastService.serviceTypes.length > 2 ? "..." : ""}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
