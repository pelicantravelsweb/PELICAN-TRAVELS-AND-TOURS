"use client";
import React from "react";
import styles from './culture.module.css';
import Image from "next/image";

// Image for "What Travelers Should Know About Sri Lankan Culture" (4:5) — replace with your actual file
import know_image from "../../../public/culture_know.webp";

// Image for "Festivals Can Affect Travel Plans" (4:5) — replace with your actual file
import festival_image from "../../../public/culture_festivals.webp";

function Culture() {

  const knowItems = [
    {
      title: "Dress Respectfully at Religious Sites",
      text: "When visiting Buddhist temples, Hindu kovils, mosques, or churches, wear clothing that covers your shoulders and knees. Shoes and hats should be removed before entering religious sites.",
    },
    {
      title: "Respect Buddhist Traditions",
      text: "Buddhism is the country's largest religion, and Buddhist temples are places of worship. Avoid turning your back toward Buddha statues when taking photos, never climb on religious monuments, and always behave respectfully inside sacred places.",
    },
    {
      title: "Greeting the Locals",
      text: "Sri Lankans are known for their friendliness and hospitality. A smile and a polite greeting are always appreciated. While handshakes are common, some people may greet with palms pressed together in the traditional \"Ayubowan,\" meaning \"May you live long.\"",
    },
    {
      title: "Ask Before Taking Photos",
      text: "Always ask permission before photographing local people, particularly monks, religious ceremonies, or individuals in rural communities. Photography may also be restricted inside certain temples and museums.",
    },
    {
      title: "Respect Local Customs",
      text: "Public displays of affection are generally uncommon, especially in rural areas and around religious sites. Dressing modestly and behaving respectfully will help you blend comfortably with local culture.",
    },
    {
      title: "Remove Shoes Where Required",
      text: "Shoes must be removed before entering temples and some traditional homes. Wearing socks can make walking on hot temple grounds more comfortable during the day.",
    },
  ];

  const experiences = [
    "Traditional Kandyan dance performances",
    "Buddhist temple ceremonies",
    "Local festivals and cultural celebrations",
    "Ayurveda wellness traditions",
    "Tea plantation visits",
    "Traditional village experiences",
    "Handicraft and artisan workshops",
    "Local markets and street life",
  ];

  const quickTips = [
    "Dress modestly when visiting religious sites.",
    "Remove shoes and hats before entering temples.",
    "Ask permission before photographing people.",
    "Respect Buddha statues and religious monuments.",
    "Greet locals with a smile or \"Ayubowan.\"",
    "Avoid loud or disrespectful behavior at sacred places.",
    "Learn a few simple Sinhala or Tamil greetings—they're always appreciated.",
  ];

  return (
    <div className={styles.culture_container}>

      <p className={styles.culture_intro}>
        Sri Lanka is a culturally rich and welcoming country where hospitality is an important part of
        everyday life. Respecting local customs and traditions will help you enjoy a more meaningful
        travel experience while creating positive interactions with local communities.
      </p>

      {/* What Travelers Should Know — image left, points stacked right_______ */}
      <h4 className={styles.culture_subheading}>What Travelers Should Know About Sri Lankan Culture</h4>
      <div className={styles.know_section}>
        <div className={styles.know_image}>
          <Image src={know_image} alt="What travelers should know about Sri Lankan culture" />
        </div>
        <div className={styles.know_list}>
          {knowItems.map((item, index) => (
            <div className={styles.know_item} key={index}>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Accessibility____________________________________ */}
      <h4 className={styles.culture_subheading}>Cultural Accessibility</h4>
      <p>
        Sri Lanka welcomes visitors from around the world, and English is widely spoken in hotels,
        restaurants, tourist attractions, and by many tour guides. Locals are generally happy to assist
        travelers, making it easy to experience the country's rich cultural heritage.
      </p>

      {/* Cultural Experiences Not to Miss____________________________________ */}
      <h4 className={styles.culture_subheading}>Cultural Experiences Not to Miss</h4>
      <p>Visitors can experience Sri Lanka's vibrant culture through:</p>
      <ul className={styles.experience_list}>
        {experiences.map((item, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{item}</li>
        ))}
      </ul>

      {/* Quick Cultural Tips____________________________________ */}
      <h4 className={styles.culture_subheading}>Quick Cultural Tips</h4>
      <ul className={styles.quick_tips_list}>
        {quickTips.map((tip, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{tip}</li>
        ))}
      </ul>

      {/* Festivals — image left, text right____________________________________ */}
      <h4 className={styles.culture_subheading}>Festivals Can Affect Travel Plans</h4>
      <div className={styles.festival_section}>
        <div className={styles.festival_image}>
          <Image src={festival_image} alt="Sri Lankan festivals and cultural celebrations" />
        </div>
        <div className={styles.festival_description}>
          <p>
            Sri Lanka celebrates numerous religious and cultural festivals throughout the year, including
            Buddhist, Hindu, Muslim, and Christian holidays. During major festivals, popular attractions,
            roads, and public transport may be busier than usual, while some businesses may operate on
            reduced hours. On the other hand, these celebrations offer visitors a unique opportunity to
            experience the island's vibrant traditions, colorful processions, music, and cultural heritage.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Culture;
