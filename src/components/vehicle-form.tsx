"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { createVehicle } from "@/lib/actions";

export function VehicleForm() {
  const { dict } = useLocale();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    const result = await createVehicle(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <Select
        label={dict.vehicle.type}
        name="type"
        defaultValue="CAR"
        options={[
          { value: "CAR", label: dict.vehicle.car },
          { value: "MOTORCYCLE", label: dict.vehicle.motorcycle },
        ]}
      />

      <Input
        label={dict.vehicle.displayName}
        name="name"
        placeholder={dict.vehicle.displayNamePlaceholder}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label={dict.vehicle.make} name="make" placeholder="Honda" />
        <Input label={dict.vehicle.model} name="model" placeholder="Civic" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={dict.vehicle.year}
          name="year"
          type="number"
          min={1900}
          max={2100}
          placeholder="1403"
        />
        <Input
          label={dict.vehicle.currentOdometer}
          name="odometer"
          type="number"
          min={0}
          defaultValue={0}
        />
      </div>

      <Select
        label={dict.vehicle.odometerUnit}
        name="odometerUnit"
        defaultValue="km"
        options={[
          { value: "km", label: dict.vehicle.km },
          { value: "mi", label: dict.vehicle.mi },
        ]}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? dict.vehicle.adding : dict.vehicle.add}
      </Button>
    </form>
  );
}
