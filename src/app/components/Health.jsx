"use client";
import React from "react";
import styles from './health.module.css';

function Health() {

  const knowItems = [
    {
      title: "Travel Insurance Is Recommended",
      text: "Although healthcare in Sri Lanka is generally affordable, comprehensive travel insurance is strongly recommended. Insurance can help cover medical treatment, emergency transportation, hospitalization, and unexpected travel disruptions.",
    },
    {
      title: "Stay Hydrated in the Tropical Climate",
      text: "Sri Lanka's warm and humid climate can lead to dehydration, especially during outdoor activities and sightseeing. Travelers should drink plenty of bottled or filtered water and take precautions when spending extended periods in the sun.",
    },
    {
      title: "Protect Yourself From Mosquitoes",
      text: "Mosquitoes are present throughout Sri Lanka, particularly during and after rainy periods. Using insect repellent, wearing light-colored clothing, and choosing accommodations with screens or air conditioning can help reduce mosquito bites.",
    },
    {
      title: "Food and Water Safety",
      text: "Most hotels, restaurants, and tourist-oriented establishments maintain good hygiene standards. Visitors are advised to drink bottled or filtered water and choose freshly prepared food, particularly when purchasing from street vendors.",
    },
    {
      title: "Carry Essential Medications",
      text: "Travelers who regularly take prescription medications should bring an adequate supply for their trip. It is also advisable to carry a copy of prescriptions and a small personal first-aid kit for minor illnesses and injuries.",
    },
  ];

  const accessibilityItems = [
    {
      title: "Hospitals and Medical Centers",
      text: "Quality healthcare is readily available in major destinations such as Colombo, Kandy, Galle, Negombo, and Ella. Both public and private hospitals offer emergency services, specialist consultations, diagnostic testing, and inpatient care.",
    },
    {
      title: "Private Healthcare",
      text: "Many travelers prefer private hospitals due to shorter waiting times, modern facilities, and English-speaking medical staff. Private healthcare facilities are particularly common in larger cities and tourist regions.",
    },
    {
      title: "Pharmacies",
      text: "Pharmacies are widely available across Sri Lanka and stock a broad range of common medications, first-aid supplies, and healthcare products. Most towns and cities have at least one pharmacy within easy reach.",
    },
    {
      title: "Emergency Services",
      text: "Emergency medical services operate throughout the country, with the fastest access generally available in urban and tourist areas. Hotels and tour operators can also assist travelers in arranging medical care when needed.",
    },
  ];

  const costRows = [
    { type: "Pharmacy Consultation", cost: "USD 2–10" },
    { type: "General Doctor Consultation", cost: "USD 10–30" },
    { type: "Private Hospital Consultation", cost: "USD 20–60" },
    { type: "Minor Medical Treatment", cost: "USD 20–100" },
    { type: "Emergency Room Visit", cost: "USD 30–150+" },
    { type: "Prescription Medication", cost: "Often lower than Western countries" },
  ];

  const quickTips = [
    "Purchase comprehensive travel insurance before arrival.",
    "Drink bottled or filtered water.",
    "Use sunscreen and stay hydrated.",
    "Carry insect repellent.",
    "Bring sufficient prescription medication.",
    "Keep emergency contact and insurance details accessible.",
    "Seek treatment promptly if feeling unwell during your trip.",
  ];

  return (
    <div className={styles.health_container}>

      <p className={styles.health_intro}>
        Sri Lanka offers a well-developed healthcare system with public hospitals, private hospitals,
        medical centers, pharmacies, and emergency services available throughout the country. Major
        cities and popular tourist destinations provide easy access to quality medical care, while even
        smaller towns typically have basic healthcare facilities and pharmacies.
      </p>

      {/* What Travelers Should Know____________________________________ */}
      <h4 className={styles.health_subheading}>What Travelers Should Know About Health</h4>
      <div className={styles.card_grid}>
        {knowItems.map((item, index) => (
          <div className={styles.card} key={index}>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Healthcare Accessibility____________________________________ */}
      <h4 className={styles.health_subheading}>Healthcare Accessibility</h4>
      <div className={styles.card_grid}>
        {accessibilityItems.map((item, index) => (
          <div className={styles.card} key={index}>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Typical Healthcare Costs____________________________________ */}
      <h4 className={styles.health_subheading}>Typical Healthcare Costs</h4>
      <p>Healthcare costs in Sri Lanka are generally lower than in many Western countries.</p>

      <div className={styles.cost_table_wrapper}>
        <table className={styles.cost_table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Typical Cost</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Costs vary depending on the provider, treatment required, and location.</p>

      {/* Quick Health Tips____________________________________ */}
      <h4 className={styles.health_subheading}>Quick Health Tips</h4>
      <ul className={styles.quick_tips_list}>
        {quickTips.map((tip, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{tip}</li>
        ))}
      </ul>

    </div>
  );
}

export default Health;
