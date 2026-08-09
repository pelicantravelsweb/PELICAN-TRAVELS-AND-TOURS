import Link from 'next/link';
import styles from './travel_tips_preview.module.css';

// NOTE: Update this if your Travel Tips page lives at a different route.
// Based on your existing slugs (sri-lanka-tour-packages, sri-lanka-tour-services,
// sri-lanka-travel-destinations) this assumes /sri-lanka-travel-tips.
const TRAVEL_TIPS_HREF = '/sri-lanka-travel-tips';

// Mirrors the exact section order from your TravelTips.jsx sub-topic buttons.
// Each id below must match an id="..." on the corresponding section in that
// page — same convention as the destinations page (id="galle", id="kandy", etc).
// "comingSoon: true" renders a disabled card with a badge instead of a link,
// so nothing points to a section that doesn't exist on the page yet.
const travelTips = [
  {
    id: 'weather',
    icon: 'fa-solid fa-cloud-rain',
    title: 'Weather',
    description:
      "Know exactly when to go. From southwest monsoons to sunny dry-zone beaches, time your Sri Lanka trip around the right coast.",
  },
  {
    id: 'experiences',
    icon: 'fa-solid fa-hiking',
    title: 'Experiences',
    description:
      'From ancient cities to misty tea country, discover the must-do experiences and hidden gems across the island.',
  },
  {
    id: 'transportation',
    icon: 'fa-solid fa-train',
    title: 'Transportation',
    description:
      "Trains, tuk-tuks, and private drivers — get around Sri Lanka's coasts, cities, and hill country with ease.",
  },
  {
    id: 'currency',
    icon: 'fa-solid fa-money-bill-wave',
    title: 'Currency',
    description:
      'A quick guide to the Sri Lankan Rupee, card payments, and getting the best exchange rate on arrival.',
  },
  {
    id: 'food',
    icon: 'fa-solid fa-utensils',
    title: 'Food',
    description:
      'Curries, hoppers, and fresh seafood — a taste of authentic Sri Lankan cuisine before you even land.',
  },
  {
    id: 'health',
    icon: 'fa-solid fa-suitcase-medical',
    title: 'Health',
    description:
      'Vaccinations, travel insurance, and everyday wellness tips to keep your Sri Lanka trip worry-free.',
  },
  {
    id: 'safety',
    icon: 'fa-solid fa-shield-halved',
    title: 'Safety',
    description:
      'Practical, on-the-ground advice for traveling Sri Lanka confidently, from city streets to remote trails.',
  },
  {
    id: 'culture',
    icon: 'fa-solid fa-hands-praying',
    title: 'Culture',
    description:
      'Local customs, temple etiquette, and traditions to help you travel Sri Lanka respectfully and connect with locals.',
  },
  {
    id: 'accommodation',
    icon: 'fa-solid fa-bed',
    title: 'Accommodation',
    description:
      'From boutique villas to beachfront resorts — our stay guide is on its way. Check back soon.',
    /*comingSoon: true,*/
  },
];

function TravelTipsPreview() {
  return (
    <div className={styles.section}>
      {/* Header___________________________________________________________*/}
      <div className={styles.header}>
        <div className={styles.eyebrow}>

        </div>
        <h2 className={styles.heading}>
          TRAVEL <span>TIPS</span> &amp; GUIDES
        </h2>
        <p className={styles.subtext}>
          Everything you need for a smooth Sri Lanka trip — weather patterns, getting around,
          currency, food, health, safety, and local culture, gathered from our on-the-ground
          travel experts so you can plan your Sri Lanka itinerary with confidence.
        </p>
      </div>

      {/* Cards Grid_______________________________________________________*/}
      <div className={styles.grid}>
        {travelTips.map((tip, index) => {
          const cardInner = (
            <>
              <div className={styles.iconCircle}>
                <i className={tip.icon} aria-hidden="true"></i>
              </div>
              <h3 className={styles.cardTitle}>{tip.title}</h3>
              <p className={styles.cardDescription}>{tip.description}</p>

              {tip.comingSoon ? (
                <span className={styles.comingSoonBadge}>Coming Soon</span>
              ) : (
                <span className={styles.readMore}>
                  Read More <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </span>
              )}
            </>
          );

          const style = { animationDelay: `${0.08 * index}s` };

          if (tip.comingSoon) {
            return (
              <div
                key={tip.id}
                className={`${styles.card} ${styles.cardDisabled}`}
                style={style}
              >
                {cardInner}
              </div>
            );
          }

          return (
            <Link
              key={tip.id}
              href={`${TRAVEL_TIPS_HREF}?scroll=${tip.id}`}
              scroll={false}
              className={styles.card}
              style={style}
              aria-label={`Read more about Sri Lanka ${tip.title.toLowerCase()} travel tips`}
            >
              {cardInner}
            </Link>
          );
        })}
      </div>

      {/* CTA______________________________________________________________*/}
      <div className={styles.ctaWrap}>
        <Link href={TRAVEL_TIPS_HREF} className={styles.ctaButton}>
          Explore The Full Travel Guide <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default TravelTipsPreview;