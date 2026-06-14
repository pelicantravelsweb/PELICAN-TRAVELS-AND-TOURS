"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./transportation.module.css";

const TRANSPORT_MODES = [
  {
    id: "public-bus",
    icon: "fa-solid fa-bus",
    title: "Public Bus",
    availability: 100,
    description:
      "Sri Lanka's public bus network is the most widely available and affordable way to travel across the island. Intercity and local services connect every town and village, making it ideal for budget-conscious travellers eager to experience authentic local life.",
  },
  {
    id: "tuk-tuk",
    icon: "fa-solid fa-taxi",
    title: "Tuk-Tuk",
    availability: 98,
    description:
      "The iconic three-wheeler tuk-tuk is found almost everywhere in Sri Lanka — from bustling city streets to quiet coastal towns. Perfect for short hops, sightseeing, and navigating narrow lanes where larger vehicles cannot reach.",
  },
  {
    id: "private-driver",
    icon: "fa-solid fa-car-side",
    title: "Private Driver",
    availability: 95,
    description:
      "Hiring a private driver with an air-conditioned vehicle is the most comfortable and flexible way to explore Sri Lanka. Knowledgeable local drivers can be arranged island-wide, offering personalised itineraries and door-to-door service.",
  },
  {
    id: "taxi",
    icon: "fa-solid fa-car",
    title: "Taxi",
    availability: 90,
    description:
      "Metered and app-based taxis are widely available in Colombo and major tourist cities. They offer a reliable and comfortable option for airport transfers, city travel, and trips between popular destinations.",
  },
  {
    id: "expressway-bus",
    icon: "fa-solid fa-bus-simple",
    title: "Expressway Bus",
    availability: 80,
    description:
      "Modern expressway coaches operate on Sri Lanka's Southern and Central Expressways, connecting Colombo to Galle, Hambantota, and Kandy in significantly reduced travel times — a comfortable upgrade from regular bus services.",
  },
  {
    id: "rental-car",
    icon: "fa-solid fa-car-rear",
    title: "Rental Car",
    availability: 80,
    description:
      "Self-drive car rentals are available in Colombo and major tourist hubs. While driving in Sri Lanka requires confidence on narrow roads and busy traffic, it offers maximum freedom for travellers who prefer to set their own pace.",
  },
  {
    id: "scooter-bike",
    icon: "fa-solid fa-motorcycle",
    title: "Scooter / Bike Rental",
    availability: 75,
    description:
      "Scooter and motorbike rentals are popular in beach towns like Arugam Bay, Mirissa, and Ella. They are a fun and economical way to explore coastal roads and scenic hill country routes at your own leisure.",
  },
  {
    id: "ride-hailing",
    icon: "fa-solid fa-mobile-screen-button",
    title: "Ride-Hailing Apps",
    availability: 70,
    description:
      "Apps such as PickMe and Uber are active in Colombo and growing tourist regions. They provide transparent, metered fares and the convenience of cashless travel — a reliable alternative to hailing a vehicle on the street.",
  },
  {
    id: "self-drive-tuk",
    icon: "fa-solid fa-person-biking",
    title: "Self-Drive Tuk-Tuk",
    availability: 65,
    description:
      "Renting and driving your own tuk-tuk is a unique adventure gaining popularity among independent travellers. Available at select locations, it offers a quirky and memorable way to navigate Sri Lankan roads on a self-guided tour.",
  },
  {
    id: "train",
    icon: "fa-solid fa-train",
    title: "Train",
    availability: 45,
    description:
      "Sri Lanka's scenic railway network connects key destinations including Colombo, Kandy, Ella, and Jaffna. The highland route from Kandy to Ella is among the world's most beautiful train journeys, passing through misty mountains and tea estates.",
  },
  {
    id: "domestic-flights",
    icon: "fa-solid fa-plane",
    title: "Domestic Flights",
    availability: 20,
    description:
      "Limited domestic flight services operate between Colombo and Jaffna, offering the fastest way to reach the north of the island. Charter seaplane services also provide scenic transfers to select coastal and island resorts.",
  },
  {
    id: "ferry",
    icon: "fa-solid fa-ferry",
    title: "Ferry",
    availability: 10,
    description:
      "Ferry services in Sri Lanka operate on select coastal and inland routes, including services to Mannar Island and scenic lagoon crossings. A seasonal ferry link to India from Talaimannar is also available on specific schedules.",
  },
];

// ── Animated bar inside card ───────────────────────────────────────────────────
function CardBar({ value, animate }) {
  return (
    <div className={styles.card_bar_wrap}>
      <div className={styles.card_bar_header}>
        <span className={styles.card_bar_label}>Availability</span>
        <span className={styles.card_bar_value}>{value}%</span>
      </div>
      <div className={styles.card_bar_track}>
        <div
          className={styles.card_bar_fill}
          style={{ width: animate ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Transportation() {
  const [animate, setAnimate] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.section_wrapper}>

      <p className={styles.section_description}>
        Sri Lanka offers a rich variety of transportation options to suit every travel style and budget. From the vibrant local bus network and iconic tuk-tuks weaving through coastal towns, to comfortable private drivers navigating ancient cultural sites and scenic highland train journeys through misty tea estates — getting around the island is an experience in itself. Understanding Sri Lanka's transport options helps you plan smarter itineraries, save time between destinations, and discover the island at your own pace.
      </p>

      <div className={styles.cards_grid} ref={gridRef}>
        {TRANSPORT_MODES.map((mode) => (
          <div key={mode.id} className={styles.card}>

            {/* icon + title row — your layout */}
            <div>
            <div className={styles.card_icon_wrap}>
              <i className={`${mode.icon} ${styles.card_icon}`}></i>
              <h3 className={styles.card_title}>{mode.title}</h3>
            </div>

            {/* description */}
            <div className={styles.card_body}>
              <p className={styles.card_description}>{mode.description}</p>
            </div>
            </div>

            {/* availability bar */}
            <CardBar value={mode.availability} animate={animate} />

          </div>
        ))}
      </div>

    </div>
  );
}
