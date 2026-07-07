export const SERVICE_STATUS = ["replace", "inspect"] as const;
export type ServiceStatus = (typeof SERVICE_STATUS)[number];

export const SERVICE_KEYS = {
  CAR: [
    "oil_change",
    "oil_filter",
    "air_filter",
    "cabin_filter",
    "fuel_filter",
    "brake_pads",
    "brake_fluid",
    "tire_rotation",
    "wheel_alignment",
    "coolant_flush",
    "spark_plugs",
    "battery",
    "transmission_fluid",
    "power_steering_fluid",
    "clutch_service",
    "bolt_tightening",
    "engine_belt",
    "timing_belt",
    "alternator_belt",
    "general_inspection",
  ],
  MOTORCYCLE: [
    "oil_change",
    "oil_filter",
    "air_filter",
    "fuel_filter",
    "chain_lube",
    "chain_adjustment",
    "brake_pads",
    "brake_fluid",
    "tire_change",
    "spark_plugs",
    "battery",
    "valve_adjustment",
    "clutch_service",
    "coolant_flush",
    "general_inspection",
  ],
} as const;

export type ServiceKey =
  | (typeof SERVICE_KEYS.CAR)[number]
  | (typeof SERVICE_KEYS.MOTORCYCLE)[number];

export function encodeServiceEntry(key: string, status: ServiceStatus): string {
  return `${key}:${status}`;
}

export function parseServiceEntry(value: string): {
  key: string;
  status?: ServiceStatus;
} {
  const colon = value.indexOf(":");
  if (colon === -1) {
    return { key: value };
  }

  const key = value.slice(0, colon);
  const status = value.slice(colon + 1);
  if (status === "replace" || status === "inspect") {
    return { key, status };
  }

  return { key: value };
}

/** Maps legacy English labels stored before i18n keys */
export const LEGACY_SERVICE_LABELS: Record<string, ServiceKey> = {
  "Oil change": "oil_change",
  "Oil filter": "oil_filter",
  "Air filter": "air_filter",
  "Cabin filter": "cabin_filter",
  "Fuel filter": "fuel_filter",
  "Brake pads": "brake_pads",
  "Brake fluid": "brake_fluid",
  "Tire rotation": "tire_rotation",
  "Wheel alignment": "wheel_alignment",
  "Coolant flush": "coolant_flush",
  "Spark plugs": "spark_plugs",
  Battery: "battery",
  "Transmission fluid": "transmission_fluid",
  "Power steering fluid": "power_steering_fluid",
  "Clutch service": "clutch_service",
  "Bolt tightening": "bolt_tightening",
  "Engine belt": "engine_belt",
  "Timing belt": "timing_belt",
  "Alternator belt": "alternator_belt",
  "General inspection": "general_inspection",
  "Chain lube": "chain_lube",
  "Chain adjustment": "chain_adjustment",
  "Tire change": "tire_change",
  "Valve adjustment": "valve_adjustment",
};

export function normalizeServiceKey(value: string): ServiceKey | string {
  const { key } = parseServiceEntry(value);
  if (key in LEGACY_SERVICE_LABELS) {
    return LEGACY_SERVICE_LABELS[key];
  }
  return key;
}
