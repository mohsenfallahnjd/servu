"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { SERVICE_KEYS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createService } from "@/lib/actions";
import { getServiceLabel } from "@/lib/utils";

type ServiceFormProps = {
  vehicleId: string;
  vehicleType: "CAR" | "MOTORCYCLE";
  defaultOdometer: number;
};

export function ServiceForm({
  vehicleId,
  vehicleType,
  defaultOdometer,
}: ServiceFormProps) {
  const { dict } = useLocale();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const options = SERVICE_KEYS[vehicleType];
  const today = new Date().toISOString().split("T")[0];

  function toggleService(type: string) {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    for (const type of selected) {
      formData.append("serviceTypes", type);
    }

    const result = await createService(vehicleId, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <Input
        label={dict.service.date}
        name="date"
        type="date"
        defaultValue={today}
        required
      />

      <Input
        label={dict.service.odometer}
        name="odometer"
        type="number"
        min={0}
        defaultValue={defaultOdometer}
        placeholder={dict.common.optional}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {dict.service.performed}
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleService(option)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
                }`}
              >
                {getServiceLabel(option, dict)}
              </button>
            );
          })}
        </div>
        {selected.length === 0 && (
          <p className="text-xs text-zinc-400">{dict.service.selectOne}</p>
        )}
      </div>

      <Input
        label={dict.common.cost}
        name="cost"
        type="number"
        min={0}
        step="0.01"
        placeholder={dict.common.optional}
      />

      <Textarea
        label={dict.common.notes}
        name="notes"
        placeholder={dict.service.notesPlaceholder}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading || selected.length === 0}
      >
        {loading ? dict.common.saving : dict.service.save}
      </Button>
    </form>
  );
}
