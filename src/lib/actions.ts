"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/get-locale";
import { serviceSchema, vehicleSchema } from "@/lib/validations";

async function getMessages() {
  const locale = await getLocale();
  return getDictionary(locale);
}

export async function createVehicle(formData: FormData) {
  const dict = await getMessages();
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const raw = {
    type: formData.get("type"),
    name: formData.get("name"),
    make: formData.get("make") || undefined,
    model: formData.get("model") || undefined,
    year: formData.get("year") || undefined,
    odometer: formData.get("odometer") || 0,
    odometerUnit: formData.get("odometerUnit") || "km",
  };

  const parsed = vehicleSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: dict.service.invalidInput };
  }

  const { type, name, make, model, year, odometer, odometerUnit } = parsed.data;

  await prisma.vehicle.create({
    data: {
      userId: session.user.id,
      type,
      name,
      make: make || null,
      model: model || null,
      year: year || null,
      odometer,
      odometerUnit,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteVehicle(vehicleId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, userId: session.user.id },
  });

  if (!vehicle) {
    notFound();
  }

  await prisma.vehicle.delete({ where: { id: vehicleId } });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function createService(vehicleId: string, formData: FormData) {
  const dict = await getMessages();
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, userId: session.user.id },
  });

  if (!vehicle) {
    return { error: dict.service.notFound };
  }

  const serviceTypes = formData.getAll("serviceTypes") as string[];

  const raw = {
    date: formData.get("date"),
    odometer: formData.get("odometer") || undefined,
    serviceTypes,
    notes: formData.get("notes") || undefined,
    cost: formData.get("cost") || undefined,
  };

  const parsed = serviceSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: dict.service.selectAtLeastOne };
  }

  const { date, odometer, notes, cost } = parsed.data;

  await prisma.serviceRecord.create({
    data: {
      vehicleId,
      date: new Date(date),
      odometer: odometer ?? null,
      serviceTypes,
      notes: notes || null,
      cost: cost ?? null,
    },
  });

  if (odometer && odometer > vehicle.odometer) {
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { odometer },
    });
  }

  revalidatePath(`/vehicles/${vehicleId}`);
  redirect(`/vehicles/${vehicleId}`);
}

export async function deleteService(serviceId: string, vehicleId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, userId: session.user.id },
  });

  if (!vehicle) {
    notFound();
  }

  await prisma.serviceRecord.delete({ where: { id: serviceId } });
  revalidatePath(`/vehicles/${vehicleId}`);
}
