/**
 * Sample trip data — clearly fictional placeholders ("Friend 01", etc).
 * This is the shape every feature reads from. Replace values here (or via
 * the app's own forms/Settings) with a real trip; no component should ever
 * hardcode trip content directly.
 */

let idCounter = 0;
const uid = (prefix) =>
  `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;

export const FRIEND_ROLES = ["Organizer", "Driver", "Passenger"];
export const EXPENSE_CATEGORIES = [
  "Fuel",
  "Hotels",
  "Food",
  "Tolls",
  "Activities",
  "Parking",
  "Miscellaneous",
];
export const PACKING_CATEGORIES = [
  "Essentials",
  "Vehicle",
  "Food",
  "Clothing",
  "Camping",
  "Electronics",
];
export const PLACE_CATEGORIES = [
  "Food",
  "Nature",
  "Adventure",
  "Photography",
  "Shopping",
  "Accommodation",
];
export const PLACE_PRIORITIES = ["low", "medium", "high"];
export const STOP_TYPES = [
  "departure",
  "arrival",
  "meal",
  "hotel",
  "activity",
  "fuel",
  "sightseeing",
  "note",
];

const friends = [
  {
    id: "friend_01",
    name: "Friend 01",
    role: "Organizer",
    phone: "",
    avatarColor: "#ff6b35",
    rsvp: "confirmed",
  },
  {
    id: "friend_02",
    name: "Friend 02",
    role: "Driver",
    phone: "",
    avatarColor: "#60a5fa",
    rsvp: "confirmed",
  },
  {
    id: "friend_03",
    name: "Friend 03",
    role: "Passenger",
    phone: "",
    avatarColor: "#4ade80",
    rsvp: "confirmed",
  },
  {
    id: "friend_04",
    name: "Friend 04",
    role: "Passenger",
    phone: "",
    avatarColor: "#ffb84d",
    rsvp: "pending",
  },
];

const routeStops = [
  {
    id: "stop_islamabad",
    name: "Islamabad",
    date: "2026-08-23",
    arrivalTime: null,
    departureTime: "07:00",
    distanceFromPrevKm: 0,
    notes: "Starting point — meet at Ali's place by 6:30 AM.",
    placesToVisit: ["Faisal Mosque", "Daman-e-Koh"],
  },
  {
    id: "stop_naran",
    name: "Naran",
    date: "2026-08-23",
    arrivalTime: "15:00",
    departureTime: "2026-08-25 08:00",
    distanceFromPrevKm: 240,
    notes: "Two-night stop. Day trip to Saif-ul-Malook on the second day.",
    placesToVisit: ["Saif-ul-Malook Lake", "Lulusar Lake"],
  },
  {
    id: "stop_hunza",
    name: "Hunza",
    date: "2026-08-25",
    arrivalTime: "18:00",
    departureTime: null,
    distanceFromPrevKm: 390,
    notes: "Final destination — 4 nights.",
    placesToVisit: [
      "Attabad Lake",
      "Khunjerab Pass",
      "Passu Cones",
      "Eagle's Nest",
    ],
  },
];

const itinerary = [
  {
    id: "day_1",
    dayNumber: 1,
    date: "2026-08-23",
    title: "Islamabad → Naran",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "07:00",
        title: "Departure from Islamabad",
        type: "departure",
        notes: "Fuel up before leaving the city.",
      },
      {
        id: uid("stop"),
        time: "12:30",
        title: "Lunch stop in Balakot",
        type: "meal",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "15:00",
        title: "Arrive Naran, hotel check-in",
        type: "hotel",
        notes: "",
      },
    ],
  },
  {
    id: "day_2",
    dayNumber: 2,
    date: "2026-08-24",
    title: "Naran — Saif-ul-Malook day trip",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "08:00",
        title: "Jeep to Saif-ul-Malook Lake",
        type: "activity",
        notes: "Shared jeep from the hotel.",
      },
      {
        id: uid("stop"),
        time: "13:00",
        title: "Lakeside lunch",
        type: "meal",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "19:00",
        title: "Back to hotel, early night",
        type: "hotel",
        notes: "Early start tomorrow for Babusar Top.",
      },
    ],
  },
  {
    id: "day_3",
    dayNumber: 3,
    date: "2026-08-25",
    title: "Naran → Hunza via Babusar Top",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "06:00",
        title: "Departure from Naran",
        type: "departure",
        notes: "Leave early — long mountain drive.",
      },
      {
        id: uid("stop"),
        time: "09:00",
        title: "Babusar Top photo stop",
        type: "sightseeing",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "18:00",
        title: "Arrive Hunza, hotel check-in",
        type: "hotel",
        notes: "",
      },
    ],
  },
  {
    id: "day_4",
    dayNumber: 4,
    date: "2026-08-26",
    title: "Hunza — Attabad & Khunjerab",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "09:00",
        title: "Attabad Lake boating",
        type: "activity",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "13:00",
        title: "Lunch in Gulmit",
        type: "meal",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "16:00",
        title: "Drive up to Khunjerab Pass",
        type: "sightseeing",
        notes: "Highest paved border crossing.",
      },
    ],
  },
  {
    id: "day_5",
    dayNumber: 5,
    date: "2026-08-27",
    title: "Hunza — Passu & Eagle's Nest",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "09:00",
        title: "Passu Cones viewpoint",
        type: "sightseeing",
        notes: "",
      },
      {
        id: uid("stop"),
        time: "17:00",
        title: "Sunset at Eagle's Nest",
        type: "sightseeing",
        notes: "Best light just before sunset.",
      },
    ],
  },
  {
    id: "day_6",
    dayNumber: 6,
    date: "2026-08-28",
    title: "Hunza → return journey begins",
    notes: "",
    stops: [
      {
        id: uid("stop"),
        time: "08:00",
        title: "Departure from Hunza",
        type: "departure",
        notes: "Start of the drive home.",
      },
    ],
  },
];

const expenses = [
  {
    id: uid("exp"),
    title: "Fuel — Islamabad to Naran",
    category: "Fuel",
    amount: 12000,
    paidBy: "friend_02",
    participants: ["friend_01", "friend_02", "friend_03", "friend_04"],
    splitType: "equal",
    customSplits: {},
    date: "2026-08-23",
    notes: "",
  },
  {
    id: uid("exp"),
    title: "Naran hotel (2 nights)",
    category: "Hotels",
    amount: 24000,
    paidBy: "friend_01",
    participants: ["friend_01", "friend_02", "friend_03", "friend_04"],
    splitType: "equal",
    customSplits: {},
    date: "2026-08-23",
    notes: "",
  },
  {
    id: uid("exp"),
    title: "Saif-ul-Malook jeep hire",
    category: "Activities",
    amount: 8000,
    paidBy: "friend_03",
    participants: ["friend_01", "friend_02", "friend_03", "friend_04"],
    splitType: "equal",
    customSplits: {},
    date: "2026-08-24",
    notes: "",
  },
  {
    id: uid("exp"),
    title: "Group lunch, Balakot",
    category: "Food",
    amount: 4500,
    paidBy: "friend_01",
    participants: ["friend_01", "friend_02", "friend_03", "friend_04"],
    splitType: "equal",
    customSplits: {},
    date: "2026-08-23",
    notes: "",
  },
];

const packingItems = [
  {
    id: uid("pack"),
    name: "Power bank",
    category: "Electronics",
    assignedTo: "friend_01",
    checked: true,
  },
  {
    id: uid("pack"),
    name: "First aid kit",
    category: "Essentials",
    assignedTo: "friend_02",
    checked: true,
  },
  {
    id: uid("pack"),
    name: "Car charger",
    category: "Vehicle",
    assignedTo: "friend_03",
    checked: false,
  },
  {
    id: uid("pack"),
    name: "Jumper cables",
    category: "Vehicle",
    assignedTo: "friend_02",
    checked: false,
  },
  {
    id: uid("pack"),
    name: "Snacks & water bottles",
    category: "Food",
    assignedTo: "friend_04",
    checked: false,
  },
  {
    id: uid("pack"),
    name: "Warm jacket",
    category: "Clothing",
    assignedTo: null,
    checked: false,
  },
  {
    id: uid("pack"),
    name: "Portable speaker",
    category: "Electronics",
    assignedTo: "friend_01",
    checked: false,
  },
];

const places = [
  {
    id: uid("place"),
    name: "Saif-ul-Malook Lake",
    location: "Naran",
    category: "Nature",
    notes: "Best in early morning light.",
    priority: "high",
    estimatedCost: 2000,
    visited: false,
    favorite: true,
  },
  {
    id: uid("place"),
    name: "Attabad Lake",
    location: "Hunza",
    category: "Nature",
    notes: "Boating available.",
    priority: "high",
    estimatedCost: 1500,
    visited: false,
    favorite: true,
  },
  {
    id: uid("place"),
    name: "Khunjerab Pass",
    location: "Near Hunza",
    category: "Adventure",
    notes: "Carry warm clothes, very high altitude.",
    priority: "medium",
    estimatedCost: 0,
    visited: false,
    favorite: false,
  },
  {
    id: uid("place"),
    name: "Eagle's Nest Viewpoint",
    location: "Duikar, Hunza",
    category: "Photography",
    notes: "Go for sunset.",
    priority: "medium",
    estimatedCost: 500,
    visited: false,
    favorite: false,
  },
];

const foodOptions = [
  {
    id: uid("food"),
    name: "Trout Point Restaurant",
    location: "Naran Bazaar",
    cuisine: "Local / Pakistani",
    estimatedCost: 1500,
    rating: 4.2,
    notes: "Known for trout fish.",
    votes: ["friend_01", "friend_02", "friend_03", "friend_04"],
  },
  {
    id: uid("food"),
    name: "Old Hunza View Restaurant",
    location: "Karimabad, Hunza",
    cuisine: "Local / Continental",
    estimatedCost: 1800,
    rating: 4.5,
    notes: "Great valley view.",
    votes: ["friend_02", "friend_03"],
  },
];

const polls = [
  {
    id: uid("poll"),
    question: "Which activity should we prioritize in Hunza?",
    closed: false,
    options: [
      {
        id: uid("opt"),
        text: "Attabad Lake boating",
        votes: ["friend_01", "friend_03"],
      },
      { id: uid("opt"), text: "Khunjerab Pass drive", votes: ["friend_02"] },
      { id: uid("opt"), text: "Passu Cones hike", votes: ["friend_04"] },
    ],
  },
];

const notes = [
  {
    id: uid("note"),
    text: "Don't forget CNICs — needed for Khunjerab Pass checkpoint.",
    author: "friend_01",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: uid("note"),
    text: "Leave Islamabad before 7 AM to beat traffic on the highway.",
    author: "friend_02",
    createdAt: "2026-08-02T09:00:00.000Z",
  },
  {
    id: uid("note"),
    text: "Fuel up fully before entering the mountains — stations get sparse.",
    author: "friend_01",
    createdAt: "2026-08-02T09:15:00.000Z",
  },
];

export const initialTripState = {
  trip: {
    id: "trip_mountain_escape",
    name: "Mountain Escape",
    description:
      "A 6-day loop through the northern mountains — sample trip, edit freely.",
    startLocation: "Islamabad",
    destination: "Hunza",
    startDate: "2026-08-23",
    endDate: "2026-08-28",
    currency: "PKR",
    distanceKm: 630,
    estimatedTravelHours: 14,
    status: "upcoming",
  },
  vehicle: {
    name: "Toyota Corolla",
    fuelType: "Petrol",
    fuelEfficiencyKmPerLiter: 12,
    fuelPricePerLiter: 280,
    driverId: "friend_02",
  },
  friends,
  routeStops,
  itinerary,
  expenses,
  packingItems,
  places,
  foodOptions,
  polls,
  notes,
};

export { uid };
