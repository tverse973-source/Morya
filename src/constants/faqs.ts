export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    id: "booking",
    question: "How do I book a cab with Morya Travels?",
    answer:
      "You can book in three ways: share your trip through the enquiry form on our website, call us directly, or message us on WhatsApp. We confirm your vehicle, driver and fare before the trip, so there are no surprises on the day of travel.",
  },
  {
    id: "rates",
    question: "What are your outstation rates?",
    answer:
      "Outstation cabs start at ₹12/km for a Swift Dzire, with a minimum of 300 km per booking. Sedans, SUVs and premium vehicles are priced per kilometre, so the final fare depends on your route and vehicle choice. Use the fare estimator on our Fleet page for an instant estimate.",
  },
  {
    id: "extras",
    question: "Are toll, parking and permit charges included?",
    answer:
      "No. Our fares cover the vehicle and driver. Toll charges, parking fees, state permits and any applicable entry taxes are billed at actuals on top of the estimate, and we always share the breakdown transparently.",
  },
  {
    id: "tempo",
    question: "Can I book a Tempo Traveller for a group trip?",
    answer:
      "Yes. We run 13-seater and 17-seater Tempo Travellers on a flat package rate — ₹19,000 for the 13-seater and ₹23,000 for the AC 17-seater. They are ideal for family trips, pilgrimages and group tours across Maharashtra.",
  },
  {
    id: "airport",
    question: "Do you provide airport pickup and drop in Pune?",
    answer:
      "Yes. Pune Airport transfers start at ₹499. Share your flight details when booking and our driver will track your arrival and wait for you, so late flights are never a problem.",
  },
  {
    id: "oneway",
    question: "Do you offer one-way drops?",
    answer:
      "Yes, one-way trips are available on most routes. One-way pricing differs from round trips, so share your travel date and route and we will send you an exact quote.",
  },
  {
    id: "vehicles",
    question: "Are your vehicles clean, air-conditioned and tracked?",
    answer:
      "Every vehicle in our fleet is regularly serviced, cleaned and fitted with AC and GPS tracking. You can view seating, luggage capacity and amenities for each vehicle on our Fleet page.",
  },
  {
    id: "advance",
    question: "How far in advance should I book?",
    answer:
      "For daily travel, booking a day or two ahead is usually enough. During festivals, long weekends and peak pilgrimage season we recommend booking as early as possible, since Tempo Travellers and premium vehicles are in high demand.",
  },
  {
    id: "coverage",
    question: "Which routes and cities do you cover?",
    answer:
      "We are based in Pune and cover popular routes including Shirdi, Mahabaleshwar, Lonavala, Nashik and Goa, along with corporate and local city travel. If your destination is not listed, call us — we can usually arrange it.",
  },
  {
    id: "corporate",
    question: "Do you handle corporate and long-term travel?",
    answer:
      "Yes. We offer dedicated cabs, employee commutes and event travel for companies, with itemised billing and a single point of contact. Visit our Corporate page or get in touch to discuss your requirements.",
  },
];
