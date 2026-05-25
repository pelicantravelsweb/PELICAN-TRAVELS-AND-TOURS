"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './traveltips.module.css';
import styles_9 from '../footer_section.module.css';
import Link from 'next/link';
import Image from "next/image";
import image_1 from "../../../public/travel_tips_cover.jpg";
import image_5 from "../../../public/SriLankan_Attractions.png";
import useThemeToggle from '../lib/useThemeToggle';
import { FaTripadvisor } from "react-icons/fa";




function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();



  const [openSection, setOpenSection] = useState("service_4");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);};

  //Desktop View Button Scripts
  const [activeButton, setActiveButton] = useState("round_tours");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  
  return (
    <>
{/*Navigation Section_____________________________________________________________________________*/}
    <div className={styles_1.navigation}>
        <Link href="/"><h2 className={styles_1.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-services"><h2 id={styles_1.active}>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/sri-lanka-tour-services"><h2 id={styles_1.active}>SERVICES</h2></Link>
          <Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>
{/*Hero_section_____________________________________________________________________________*/}
    <div className={styles_2.hero_section_container}>
        <div className={styles_2.hero_section_image}>
            <Image src={image_1} alt="Bomburu ella falls Sri Lanka" />
        </div>
        <div className={styles_2.hero_section_description}>
            <h1><span>SRI LANKA</span> TRAVEL TIPS <i className="fa fa-lightbulb bulbIcon"></i></h1>
            <p>
            <strong>Plan your perfect journey through Sri Lanka with expert travel tips and valuable local insights.</strong>
            Discover the best time to visit Sri Lanka, transportation options, cultural etiquette, budgeting advice,
            weather updates, safety information, accommodation recommendations, and must-see destinations across
            the island. <br/><br/>Learn how to travel between popular tourist destinations, experience authentic Sri Lankan
            culture, explore scenic train journeys, enjoy local food experiences, and prepare for different regional
            weather conditions. Whether you are exploring ancient cities, misty hill country, tropical beaches,
            wildlife parks, or hidden gems, this complete Sri Lanka travel guide helps first-time visitors and
            experienced travelers enjoy a smooth, memorable, safe, and authentic travel experience across the island.
            </p>
            <div>
                <button className={styles_2.sub_topic_button}>Weather</button>
            </div>
        </div>

    </div>

{/*Monsoon_Season_____________________________________________________________________________*/}


{/*Footer Section_____________________________________________________________________________*/}
        <h2 className={styles_9.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>CONTACT</span> PELICAN TOURS</h2>    
        <div className={styles_9.footer_section}>
                <div className={styles_9.footer_buttons}>
                    <Link href="https://web.facebook.com/pelicantravels.lk" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_1}><i className="fa-brands fa-facebook"></i></button></Link>
                    <Link href="https://www.linkedin.com/in/pelican-travels-and-tours-a35a45409?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_1}><i className="fa-brands fa-linkedin"></i></button></Link>
                    <button className={styles_9.footer_button_2}><i className="fa-brands fa-instagram"></i></button>
                    <Link href="https://www.tripadvisor.com/Attraction_Review-g293962-d17700816-Reviews-PELICAN_TRAVELS_SRI_LANKA-Colombo_Western_Province.html" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_3}><FaTripadvisor className={styles_9.tripadvisor_icon} /></button></Link>
                    <Link href="https://wa.me/+94782436606" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_4}><i className="fa-brands fa-whatsapp"></i></button></Link>
                </div>

                <div className={styles_9.footer_phone_numbers}>  
                    <i className="fa-solid fa-phone"></i>
                    <a href="https://wa.me/94764705440" target="_blank" rel="noopener noreferrer">+94764705440</a>
                    <span> | </span>
                    <a href="https://wa.me/94719015403" target="_blank" rel="noopener noreferrer">+94719015403</a>
                </div>

                <div className={styles_9.footer_email}>  
                    <i className="fa-solid fa-envelope"></i>

                    <a href="mailto:hello@pelicantravelsandtours.com">
                        hello@pelicantravelsandtours.com
                    </a>     
                </div>

                <div className={styles_9.footer_address}>  
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Dodangoda Toll Booth, Dodangoda Entrance, Kalutara</p>
                </div>

                <div className={styles_9.footer_bottomline}>
                    <p>© 2026 Pelican Travels & Tours | All rights reserved</p>
                    <p></p>
                </div>
                <Image src={image_5} alt="Sri Lankan Attractions" />
        </div>
    </>
  )
}



export default page