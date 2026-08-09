"use client";
import React from "react";
import styles from './accommodation.module.css';
import Image from "next/image";

// Images for accommodation types — only Destinations_Image_5.webp was confirmed by you.
// 6–11 continue the same naming convention as placeholders — replace with your real files.
// NOTE: these are static imports, so Next.js will fail to build until files exist at these
// paths in /public. Add the images (or rename these imports) before building.
import stay_1 from "../../../public/accomodation_7.webp";
import stay_2 from "../../../public/accomodation_9.webp";
import stay_3 from "../../../public/accomodation_1.webp";
import stay_4 from "../../../public/accomodation_4.webp";
import stay_5 from "../../../public/accomodation_5.webp";
import stay_6 from "../../../public/accomodation_3.webp";
import stay_7 from "../../../public/accomodation_6.webp";
import stay_8 from "../../../public/accomodation_8.webp";
import stay_9 from "../../../public/accomodation_2.webp";

function Accommodation() {

  const stayOptions = [
    {
      image: stay_1,
      title: "Budget Guest Houses & Homestays",
      price: "USD 10 – 40",
      text: "Family-run guest houses and homestays across Ella, Kandy, Sigiriya, Mirissa, Arugam Bay, and Nuwara Eliya offer clean rooms, home-cooked meals, and warm local hospitality. Hosts often help arrange transport and tours — ideal for backpackers and budget-conscious travelers.",
    },
    {
      image: stay_2,
      title: "3-Star Hotels",
      price: "USD 40 – 80",
      text: "Air-conditioned rooms, private bathrooms, on-site restaurants, and swimming pools deliver reliable comfort in popular towns, coastal areas, and cities — a dependable choice for families and couples who want more polish without the luxury price tag.",
    },
    {
      image: stay_3,
      title: "Boutique Hotels & Heritage Stays",
      price: "USD 80 – 180",
      text: "Restored colonial mansions, tea estate bungalows, and plantation homes pair timeless architecture with personalized service, tranquil surroundings, and gourmet dining — a favorite with honeymooners seeking somewhere distinctive to stay.",
    },
    {
      image: stay_4,
      title: "4-Star Hotels",
      price: "USD 90 – 180",
      text: "Spacious rooms, multiple restaurants, spas, and fitness centers bring an upscale feel to beaches, tea-covered mountains, and city skylines alike — a strong fit for families and business travelers who want extra amenities.",
    },
    {
      image: stay_5,
      title: "5-Star Luxury Resorts",
      price: "USD 180 – 500+",
      text: "Beachfront suites, private villas, infinity pools, and award-winning restaurants rival the best in Asia, set beside pristine coastline, wildlife reserves, tea country, and Colombo's skyline — built for honeymoons and special celebrations.",
    },
    {
      image: stay_6,
      title: "Eco Lodges & Nature Retreats",
      price: "USD 50 – 200",
      text: "Sustainably built lodges nestled in rainforests, tea plantations, and wildlife reserves blend into their surroundings while keeping modern comforts close — perfect for birdwatching, nature walks, and slower mornings.",
    },
    {
      image: stay_7,
      title: "Private Villas & Serviced Apartments",
      price: "USD 80 – 400+",
      text: "Fully equipped kitchens, multiple bedrooms, gardens, and private pools give families and groups room to spread out, particularly along the southern coastline and hill country — a flexible home away from home.",
    },
    {
      image: stay_8,
      title: "Cabanas & Glamping",
      price: "USD 50 – 250+",
      text: "Private cabanas and luxury tents combine nature, privacy, and comfort, from peaceful beachside stays to safari-style camps near wildlife parks — ideal for couples, families, and adventure seekers.",
    },

    {
      image: stay_9,
      title: "Heritage Bungalows",
      price: "USD 70 – 250+",
      text: "Historic plantation homes surrounded by tea gardens and misty mountains offer traditional architecture, spacious rooms, and personalized hospitality — perfect for experiencing Sri Lanka's colonial heritage.",
    },

  ];

  const quickTips = [
    "Rates run lowest during shoulder seasons (May–June and September–November) and peak from December to April.",
    "Book boutique hotels, beach resorts, and luxury properties several weeks or months ahead, especially around holidays.",
    "Budgets stretch far — from USD 10 hostels to USD 500+ private villas — so there's an option at every price point.",
    "Expect genuine hospitality and consistently high standards of service, regardless of budget.",
  ];

  return (
    <div className={styles.accommodation_container}>

      <p className={styles.accommodation_intro}>
        Whether you're traveling on a budget, planning a romantic honeymoon, enjoying a family holiday, or seeking
        a luxury escape, Sri Lanka offers one of Asia's most diverse accommodation selections. From cozy family-run
        guest houses in rural villages to internationally renowned five-star beachfront resorts, there is a
        comfortable place to stay for every travel style and budget. Prices generally range from USD 10 for simple
        hostels to USD 500+ per night for exclusive luxury resorts and private villas, making Sri Lanka an
        excellent destination for travelers seeking outstanding value for money.
      </p>

      {/* Accommodation Options____________________________________ */}
      <h4 className={styles.accommodation_subheading}>Accommodation Options in Sri Lanka</h4>
      <div className={styles.stay_list}>
        {stayOptions.map((item, index) => (
          <div className={styles.stay_item} key={index}>
            <div className={styles.stay_item_image}>
              <Image src={item.image} alt={item.title} />
            </div>
            <div className={styles.stay_item_description}>
              <h5>{item.title}</h5>
              <p className={styles.stay_item_price}><span>{item.price}</span> per night</p>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips____________________________________ */}
      <h4 className={styles.accommodation_subheading}>Quick Accommodation Tips</h4>
      <ul className={styles.quick_tips_list}>
        {quickTips.map((tip, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{tip}</li>
        ))}
      </ul>

    </div>
  );
}

export default Accommodation;
