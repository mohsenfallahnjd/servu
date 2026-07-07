"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { DateInput } from "@/components/date-input";
import {
  SERVICE_KEYS,
  encodeServiceEntry,
  type ServiceStatus,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createService } from "@/lib/actions";
import { cn, getServiceLabel } from "@/lib/utils";

type ServiceFormProps = {
  vehicleId: string;
  vehicleType: "CAR" | "MOTORCYCLE";
  defaultOdometer: number;
};

type SelectedServices = Record<string, ServiceStatus>;

export function ServiceForm({
  vehicleId,
  vehicleType,
  defaultOdometer,
}: ServiceFormProps) {
  const { dict } = useLocale();
  const [selected, setSelected] = useState<SelectedServices>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const options = SERVICE_KEYS[vehicleType];

  function handleStatusClick(key: string, status: ServiceStatus) {
    setSelected((prev) => {
      if (prev[key] === status) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: status };
    });
  }

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    for (const [key, status] of Object.entries(selected)) {
      formData.append("serviceTypes", encodeServiceEntry(key, status));
    }

    const result = await createService(vehicleId, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  const selectedCount = Object.keys(selected).length;

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <DateInput label={dict.service.date} required />

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
        <div className="space-y-2">
          {options.map((option) => {
            const currentStatus = selected[option];
            return (
              <div
                key={option}
                className={cn(
                  "flex flex-col gap-2 rounded-lg border px-3 py-2.5 transition-colors sm:flex-row sm:items-center sm:justify-between",
                  currentStatus
                    ? "border-zinc-300 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
                )}
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {getServiceLabel(option, dict)}
                </span>
                <div className="flex gap-2">
                  {(["replace", "inspect"] as const).map((status) => {
                    const isActive = currentStatus === status;
                    const label =
                      status === "replace"
                        ? dict.service.statusReplace
                        : dict.service.statusInspect;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusClick(option, status)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          isActive
                            ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {selectedCount === 0 && (
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
        disabled={loading || selectedCount === 0}
      >
        {loading ? dict.common.saving : dict.service.save}
      </Button>
    </form>
  );
}
