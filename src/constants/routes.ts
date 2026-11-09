import type { ComponentType, SVGProps } from "react";
import { Plane, Car, Landmark, MapPin } from "lucide-react";

export interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  startingFrom: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  fare: string;
  fareUnit: string;
  includes: string[];
  about: string;
  idealFor: string[];
  badge?: string;
  badgeColor?: string;
}

export const IMG = (prompt: string, size = "landscape_4_3") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

export const POPULAR_ROUTES: Route[] = [
  {
    id: "shirdi",
    name: "Shirdi",
    distance: "185 km",
    duration: "3 hrs 30 min",
    startingFrom: "₹2,499",
    image: "/images/services/pune-to-shirdi.jpeg",
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar",
    distance: "120 km",
    duration: "3 hrs",
    startingFrom: "₹1,899",
    image: "/images/services/mahabaleshwar.jpeg",
  },
  {
    id: "lonavala",
    name: "Lonavala",
    distance: "65 km",
    duration: "1 hr 45 min",
    startingFrom: "₹1,299",
    image: "/images/services/pune-to-lonavala.jpeg",
  },
  {
    id: "nashik",
    name: "Nashik",
    distance: "165 km",
    duration: "3 hrs 15 min",
    startingFrom: "₹2,199",
    image: "/images/services/nashik.jpeg",
  },
  {
    id: "goa",
    name: "Goa",
    distance: "430 km",
    duration: "8 hrs",
    startingFrom: "₹5,999",
    image: "/images/services/goa.jpeg",
  },
  {
    id: "pune-airport",
    name: "Pune Airport",
    distance: "15 km",
    duration: "30 min",
    startingFrom: "₹499",
    image: "/images/services/pune-airport-transfer.jpeg",
  },
];

export const HERO_BACKGROUND = IMG(
  "luxury car driving on a scenic mountain highway at golden hour, cinematic",
  "landscape_16_9",
);

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rohan Deshmukh",
    location: "Pune",
    rating: 5,
    text: "Outstanding service! The Innova Crysta was spotless and the driver was very professional. Reached Shirdi on time.",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Booked a Tempo Traveller for our family trip to Lonavala. Comfortable ride and great value. Highly recommend!",
  },
  {
    id: "t3",
    name: "Amit Kulkarni",
    location: "Nashik",
    rating: 5,
    text: "Best cab service in town. On-time pickups, clean vehicles, and friendly drivers. Will book again.",
  },
  {
    id: "t4",
    name: "Sneha Patil",
    location: "Pune",
    rating: 4,
    text: "Smooth airport transfer experience. Driver helped with luggage and took the best route. Great job!",
  },
];

export const SERVICES: Service[] = [
  {
    id: "pune-darshan-local-cab-service",
    title: "Pune Darshan / Local Cab Service",
    description: "Hourly or point-to-point travel within Pune city. Visit all major attractions with a dedicated cab and an experienced local driver.",
    image: IMG("city taxi cab on an urban Indian street in Pune, daytime, Shaniwar Wada landmark in the background"),
    href: "/services/pune-darshan-local-cab-service",
    icon: MapPin,
    fare: "₹499",
    fareUnit: "half day (4 hrs)",
    includes: [
      "Hourly city rentals with a dedicated driver",
      "Point-to-point city rides across Pune",
      "Pune Darshan sightseeing — all major attractions",
      "Minimum 3 hours booking",
      "Local driver who knows the best routes",
    ],
    about: "Explore Pune at your own pace with our local cab service. From Shaniwar Wada and Aga Khan Palace to the Dagdusheth Ganpati temple, our drivers know every corner of the city. Book by the hour or for a point-to-point ride — clean cabs, verified drivers, and transparent pricing with no hidden charges.",
    idealFor: ["City sightseeing", "Airport to hotel transfer", "Business meetings", "Shopping & dinner outings"],
    badge: "Most Booked",
    badgeColor: "#3B72FF",
  },
  {
    id: "airport-transfer",
    title: "Pune Airport Transfer",
    description: "Pune Airport (PNQ) pickups and drops — on time, every time. Comfortable cabs for domestic and international terminals.",
    image: IMG("modern airport terminal with a taxi cab and passenger luggage, bright daylight"),
    href: "/services/airport-transfer",
    icon: Plane,
    fare: "₹499",
    fareUnit: "one way",
    includes: [
      "Pune Airport (PNQ) pickups & drops",
      "Flight tracking included",
      "Meet & greet service",
      "Luggage assistance",
      "On-time, every time",
    ],
    about: "Reliable airport transfers to and from Pune Airport. We track your flight so your driver is ready on time, help with luggage, and get you to your destination in a clean, AC cab with a verified driver. Domestic and international terminals covered.",
    idealFor: ["Domestic & international flights", "Business travel", "Solo & family trips", "Late-night arrivals"],
  },
  {
    id: "outstation",
    title: "Outstation Cabs",
    description: "Hill station getaways with scenic mountain roads. Pune to Shirdi, Mumbai, Goa, Nashik and beyond with experienced drivers.",
    image: IMG("mahabaleshwar hill station lush green valley with misty mountains, daylight"),
    href: "/services/outstation",
    icon: Car,
    fare: "₹12",
    fareUnit: "per km",
    includes: [
      "Pune to Shirdi, Mumbai, Goa, Nashik & more",
      "One-way & round-trip options",
      "Experienced outstation drivers",
      "Transparent per-km pricing",
      "Clean AC cabs",
    ],
    about: "Step out of the city with our outstation cabs. Whether it's a weekend trip to Mahabaleshwar, a pilgrimage to Shirdi, or a beach holiday in Goa, our experienced drivers and well-maintained AC cars make the journey comfortable. Transparent per-km pricing with no surprise charges.",
    idealFor: ["Weekend getaways", "Hill stations", "Beach trips", "Business travel", "Family vacations"],
  },
  {
    id: "shirdi-pilgrimage",
    title: "Shirdi Pilgrimage Cab",
    description: "Spiritual journey to Sai Baba temple with care and punctuality. Shani Shingnapur darshan and same-day round trip available.",
    image: IMG("shirdi sai baba temple town with devotees, warm golden morning light"),
    href: "/services/shirdi-pilgrimage",
    icon: Landmark,
    fare: "₹2,499",
    fareUnit: "round trip",
    includes: [
      "Shirdi Sai Baba Temple darshan",
      "Shani Shingnapur darshan",
      "Same-day round trip available",
      "Senior-citizen friendly",
      "Experienced pilgrimage drivers",
    ],
    about: "A comfortable, stress-free pilgrimage to Shirdi. Visit the Sai Baba Temple and Shani Shingnapur with a courteous driver who understands the needs of devotees. Same-day round trips available, with senior-citizen-friendly support and clean AC cabs throughout the journey.",
    idealFor: ["Sai devotees", "Same-day spiritual trips", "Senior citizen travel", "Group pilgrimages"],
  },
  {
    id: "nashik-trimbakeshwar",
    title: "Nashik & Trimbakeshwar Taxi",
    description: "Wine capital tour and Jyotirlinga darshan. Clean cabs with courteous drivers for religious trips.",
    image: IMG("nashik vineyard rows with grape farms in maharashtra countryside, sunny"),
    href: "/services/nashik-trimbakeshwar",
    icon: Landmark,
    fare: "₹2,199",
    fareUnit: "round trip",
    includes: [
      "Wine capital tour & vineyards",
      "Trimbakeshwar Jyotirlinga darshan",
      "Clean cabs with courteous drivers",
      "Religious trip specialist",
      "Comfortable AC ride",
    ],
    about: "Explore Nashik — the wine capital of India — and seek blessings at the Trimbakeshwar Jyotirlinga. Our clean cabs and courteous drivers make religious trips comfortable and memorable, whether you're touring vineyards or visiting the temple.",
    idealFor: ["Jyotirlinga darshan", "Wine tours", "Religious trips", "Weekend getaways"],
  },
  {
    id: "ashtavinayak",
    title: "Ashtavinayak Darshan Service",
    description: "Visit all eight Ganpati temples in one comfortable ride. Well-planned pilgrimage itinerary with AC cabs.",
    image: IMG("indian hindu temple complex with devotees, warm golden morning light"),
    href: "/services/ashtavinayak",
    icon: Landmark,
    fare: "₹5,999",
    fareUnit: "full tour",
    includes: [
      "All eight Ganpati temples",
      "Well-planned pilgrimage itinerary",
      "Comfortable AC cabs",
      "Experienced driver",
      "Same-day or multi-day options",
    ],
    about: "Complete the Ashtavinayak yatra in comfort. Visit all eight Ganpati temples with a well-planned itinerary, an experienced driver, and a comfortable AC cab. Choose between same-day or multi-day options based on your schedule.",
    idealFor: ["Ganpati devotees", "Ashtavinayak yatra", "Religious tours", "Family pilgrimage"],
  },
];
