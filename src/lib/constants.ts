export const SERVICE_KEYS = {
  CAR: [
    "oil_change",
    "oil_filter",
    "air_filter",
    "cabin_filter",
    "brake_pads",
    "brake_fluid",
    "tire_rotation",
    "wheel_alignment",
    "coolant_flush",
    "spark_plugs",
    "battery",
    "transmission_fluid",
    "general_inspection",
  ],
  MOTORCYCLE: [
    "oil_change",
    "oil_filter",
    "air_filter",
    "chain_lube",
    "chain_adjustment",
    "brake_pads",
    "brake_fluid",
    "tire_change",
    "spark_plugs",
    "battery",
    "valve_adjustment",
    "coolant_flush",
    "general_inspection",
  ],
} as const;

export type ServiceKey =
  | (typeof SERVICE_KEYS.CAR)[number]
  | (typeof SERVICE_KEYS.MOTORCYCLE)[number];

/** Maps legacy English labels stored before i18n keys */
export const LEGACY_SERVICE_LABELS: Record<string, ServiceKey> = {
  "Oil change": "oil_change",
  "Oil filter": "oil_filter",
  "Air filter": "air_filter",
  "Cabin filter": "cabin_filter",
  "Brake pads": "brake_pads",
  "Brake fluid": "brake_fluid",
  "Tire rotation": "tire_rotation",
  "Wheel alignment": "wheel_alignment",
  "Coolant flush": "coolant_flush",
  "Spark plugs": "spark_plugs",
  Battery: "battery",
  "Transmission fluid": "transmission_fluid",
  "General inspection": "general_inspection",
  "Chain lube": "chain_lube",
  "Chain adjustment": "chain_adjustment",
  "Tire change": "tire_change",
  "Valve adjustment": "valve_adjustment",
};

export function normalizeServiceKey(value: string): ServiceKey | string {
  if (value in LEGACY_SERVICE_LABELS) {
    return LEGACY_SERVICE_LABELS[value];
  }
  return value;
}
