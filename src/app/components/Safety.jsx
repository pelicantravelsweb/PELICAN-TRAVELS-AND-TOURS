"use client";
import React from "react";
import styles from './safety.module.css';

function Safety() {

  const knowItems = [
    {
      title: "Keep Your Valuables Secure",
      text: "Carry only the cash you need for the day and keep passports, extra money, and important documents in your hotel safe whenever possible. Be mindful of your belongings in crowded areas and on public transport.",
    },
    {
      title: "Use Licensed Transportation",
      text: "Choose registered taxis, reputable ride-hailing apps, or licensed tuk-tuks whenever possible. If using a tuk-tuk without a meter, agree on the fare before starting your journey.",
    },
    {
      title: "Stay Aware of Your Surroundings",
      text: "Tourist areas are generally safe, but remain aware of your surroundings, especially in busy markets, transport hubs, and crowded attractions. Avoid displaying expensive jewelry, large amounts of cash, or valuable electronics unnecessarily.",
    },
    {
      title: "Swim Only in Safe Areas",
      text: "Sri Lanka's beaches are beautiful, but ocean conditions can change quickly. Always pay attention to warning flags, local advice, and lifeguard instructions. Strong currents can occur even on calm-looking beaches.",
    },
    {
      title: "Respect Wildlife",
      text: "Do not feed or approach wild animals, including monkeys, elephants, and stray dogs. Keep a safe distance and follow instructions provided by national parks and wildlife guides.",
    },
    {
      title: "Protect Yourself from the Sun",
      text: "The tropical sun can be intense throughout the year. Wear sunscreen, a hat, sunglasses, and drink plenty of water, especially during outdoor activities.",
    },
    {
      title: "Respect Local Customs",
      text: "Dress modestly when visiting temples and religious sites. Remove shoes and hats before entering Buddhist and Hindu temples, and always ask permission before photographing people or religious ceremonies.",
    },
  ];

  const quickTips = [
    "Keep valuables and travel documents secure.",
    "Use licensed taxis or trusted ride-hailing services.",
    "Agree on tuk-tuk fares before traveling if no meter is used.",
    "Swim only at beaches where conditions are safe.",
    "Stay hydrated and use sunscreen.",
    "Respect local customs and wildlife.",
    "Keep emergency contact numbers and travel insurance details readily available.",
  ];

  return (
    <div className={styles.safety_container}>

      <p className={styles.safety_intro}>
        Sri Lanka is generally considered a safe destination for tourists. Like traveling anywhere in the
        world, taking a few common-sense precautions will help ensure a safe and enjoyable journey.
      </p>

      {/* What Travelers Should Know____________________________________ */}
      <h4 className={styles.safety_subheading}>What Travelers Should Know</h4>
      <div className={styles.card_grid}>
        {knowItems.map((item, index) => (
          <div className={styles.card} key={index}>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Emergency Assistance____________________________________ */}
      <h4 className={styles.safety_subheading}>Emergency Assistance</h4>
      <p>
        In case of an emergency, contact local authorities or seek assistance from your hotel, tour
        guide, or nearest police station or hospital. Most tourist destinations have access to medical
        facilities, pharmacies, and English-speaking staff.
      </p>

      {/* Quick Safety Tips____________________________________ */}
      <h4 className={styles.safety_subheading}>Quick Safety Tips</h4>
      <ul className={styles.quick_tips_list}>
        {quickTips.map((tip, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{tip}</li>
        ))}
      </ul>

    </div>
  );
}

export default Safety;
