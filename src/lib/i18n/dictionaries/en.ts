export const en = {
  app: {
    name: "Servu",
    tagline: "Track every service",
    description:
      "Track periodic car and motorcycle services — oil changes, filters, and more.",
  },
  common: {
    optional: "Optional",
    back: "Back",
    delete: "Delete",
    remove: "Remove",
    saving: "Saving...",
    loading: "Loading...",
    cost: "Cost",
    notes: "Notes",
    email: "Email",
    password: "Password",
    name: "Name",
  },
  auth: {
    signIn: "Sign in",
    signOut: "Sign out",
    register: "Register",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    createAccount: "Create account",
    welcomeBack: "Welcome back",
    signInSubtitle: "Sign in to your account",
    registerTitle: "Create account",
    registerSubtitle: "Start tracking your vehicle services",
    noAccount: "No account?",
    hasAccount: "Already have an account?",
    accountCreated: "Account created! Please sign in.",
    invalidCredentials: "Invalid email or password",
    emailExists: "An account with this email already exists",
    registerFailed: "Registration failed",
    genericError: "Something went wrong. Please try again.",
  },
  home: {
    badge: "Car & motorcycle maintenance",
    title: "Never miss a service again",
    subtitle:
      "Log oil changes, filters, brakes, and every periodic service for your vehicles — simple, private, and always at hand.",
    getStarted: "Get started free",
    features: {
      track: {
        title: "Track services",
        desc: "Log date, mileage, and what was done",
      },
      vehicles: {
        title: "Cars & bikes",
        desc: "Tailored service options for each type",
      },
      history: {
        title: "Your history",
        desc: "Full maintenance log per vehicle",
      },
    },
  },
  dashboard: {
    title: "My vehicles",
    emptyHint: "Add your first car or motorcycle",
    vehicleCount: (count: number) =>
      count === 1 ? "1 vehicle" : `${count} vehicles`,
    addVehicle: "Add vehicle",
    noVehicles: "No vehicles yet. Add a car or motorcycle to start logging services.",
    addFirst: "Add your first vehicle",
    lastService: "Last service",
    serviceCount: (count: number) =>
      count === 1 ? "1 service" : `${count} services`,
  },
  vehicle: {
    addTitle: "Add vehicle",
    backToDashboard: "Back to dashboard",
    type: "Type",
    car: "Car",
    motorcycle: "Motorcycle",
    displayName: "Display name",
    displayNamePlaceholder: "e.g. My Civic, Daily Rider",
    make: "Make",
    model: "Model",
    year: "Year",
    currentOdometer: "Current odometer",
    odometerUnit: "Odometer unit",
    km: "Kilometers (km)",
    mi: "Miles (mi)",
    adding: "Adding...",
    add: "Add vehicle",
    logService: "Log service",
    serviceHistory: "Service history",
    noServices: "No services logged yet.",
    logFirst: "Log first service",
    backToVehicle: (name: string) => `Back to ${name}`,
    logServiceTitle: "Log service",
    logServiceSubtitle: "Record what was done and when",
    costLabel: (amount: number) => `Cost: $${amount.toFixed(2)}`,
  },
  service: {
    date: "Service date",
    odometer: "Odometer reading",
    performed: "Services performed",
    selectOne: "Select at least one service",
    notesPlaceholder: "Optional notes...",
    save: "Save service record",
    selectAtLeastOne: "Select at least one service",
    invalidInput: "Invalid input",
    notFound: "Vehicle not found",
  },
  validation: {
    nameMin: "Name must be at least 2 characters",
    invalidEmail: "Invalid email address",
    passwordMin: "Password must be at least 8 characters",
    passwordRequired: "Password is required",
    vehicleNameRequired: "Name is required",
    dateRequired: "Date is required",
  },
  notFound: {
    title: "Page not found",
    desc: "The page you are looking for does not exist.",
    goDashboard: "Go to dashboard",
  },
  services: {
    oil_change: "Oil change",
    oil_filter: "Oil filter",
    air_filter: "Air filter",
    cabin_filter: "Cabin filter",
    brake_pads: "Brake pads",
    brake_fluid: "Brake fluid",
    tire_rotation: "Tire rotation",
    wheel_alignment: "Wheel alignment",
    coolant_flush: "Coolant flush",
    spark_plugs: "Spark plugs",
    battery: "Battery",
    transmission_fluid: "Transmission fluid",
    general_inspection: "General inspection",
    chain_lube: "Chain lube",
    chain_adjustment: "Chain adjustment",
    tire_change: "Tire change",
    valve_adjustment: "Valve adjustment",
  },
  pwa: {
    install: "Install app",
    offline: "You are offline",
  },
};

export type Dictionary = {
  app: { name: string; tagline: string; description: string };
  common: Record<string, string>;
  auth: Record<string, string>;
  home: {
    badge: string;
    title: string;
    subtitle: string;
    getStarted: string;
    features: {
      track: { title: string; desc: string };
      vehicles: { title: string; desc: string };
      history: { title: string; desc: string };
    };
  };
  dashboard: {
    title: string;
    emptyHint: string;
    vehicleCount: (count: number) => string;
    addVehicle: string;
    noVehicles: string;
    addFirst: string;
    lastService: string;
    serviceCount: (count: number) => string;
  };
  vehicle: {
    addTitle: string;
    backToDashboard: string;
    type: string;
    car: string;
    motorcycle: string;
    displayName: string;
    displayNamePlaceholder: string;
    make: string;
    model: string;
    year: string;
    currentOdometer: string;
    odometerUnit: string;
    km: string;
    mi: string;
    adding: string;
    add: string;
    logService: string;
    serviceHistory: string;
    noServices: string;
    logFirst: string;
    backToVehicle: (name: string) => string;
    logServiceTitle: string;
    logServiceSubtitle: string;
    costLabel: (amount: number) => string;
  };
  service: Record<string, string>;
  validation: Record<string, string>;
  notFound: Record<string, string>;
  services: Record<string, string>;
  pwa: Record<string, string>;
};
