"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './traveltips.module.css';
import styles_9 from '../footer_section.module.css';
import Link from 'next/link';
import Image from "next/image";
import image_1 from "../../../public/travel_tips_cover.jpg";
import image_2 from "../../../public/sl_monsoon_1.png";
import image_3 from "../../../public/sl_monsoon_2.png";
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

{/*Weather_____________________________________________________________________________*/}
    <div className={styles_2.weather_section_container}>
        <h2><span>WEA </span>THER<i className="fa-solid fa-cloud-rain"></i></h2>

        <div className={styles_2.weather_section}>
            <div>
            <h4> Monsoon Seasons</h4>
            <p>Sri Lanka experiences two main weather seasons shaped by the southwest and northeast monsoons, creating year-round travel opportunities across the island. From May to September, the southwest monsoon brings rain to the southern and western regions, while the east coast and northern areas enjoy sunny beaches and dry conditions. Between October and February, the northeast monsoon affects the north and east, making the south and west ideal for sightseeing, wildlife tours, and coastal escapes. This unique tropical climate allows travelers to explore different parts of Sri Lanka throughout the year, from golden beaches and lush hill country to ancient cultural sites and national parks.</p>
            </div>
            <div className={styles_2.weather_section_image_container}>
                <div className={styles_2.weather_section_image}>
                    <Image src={image_2} alt="Bomburu ella falls Sri Lanka" />
                    <div className={styles_2.weather_section_image_description}>
                        <h4>Southwest Monsoon </h4>
                        <p>The Rainy Season in Southwest Sri Lanka</p>
                        <h5> Best Time to Travel:<span> October to April</span></h5>
                    </div>
                </div>
                <div className={styles_2.weather_section_image}>
                    <Image src={image_3} alt="Bomburu ella falls Sri Lanka" />
                    <div className={styles_2.weather_section_image_description}>
                        <h4>Northeast Monsoon </h4>
                        <p>The Rainy Season in Northeast Sri Lanka</p>
                        <h5> Best Time to Travel:<span> May to September</span></h5>
                    </div>

                </div>
            </div>
        </div>

        <div className={styles_2.climate_section_container}>
            <h4>Climate</h4>
            <p>Sri Lanka's diverse climate zones allow travelers to find favorable weather somewhere on the island during any month of the year. Whether exploring the lush rainforests of the Wet Zone, relaxing on the sunny beaches of the Dry Zone, or enjoying the cool mountain air of the Central Highlands, visitors can experience unique landscapes and activities throughout every season. This climatic diversity makes Sri Lanka one of Asia's most versatile and rewarding year-round travel destinations.</p>
            <div className={styles_2.climate_sections}>
                <div className={styles_2.climate_section}>
                    <div className={styles_2.climate_section_image}>
                        <Image src={image_1} alt="Bomburu ella falls Sri Lanka" /> 
                    </div>
                    <div className={styles_2.climate_section_description}>
                    <h5>Wet Zone Climate</h5>
                    <p>The Wet Zone of Sri Lanka covers much of the southwest region, including popular destinations such as Colombo, Galle, Bentota, Kalutara, Sinharaja Rainforest, and Kandy. This region receives abundant rainfall throughout the year, creating lush tropical landscapes, dense rainforests, cascading waterfalls, and vibrant greenery. Temperatures typically range between 24°C and 31°C (75°F–88°F), offering a warm and humid tropical climate. Travelers visiting the Wet Zone can enjoy scenic beaches, wildlife experiences, tea plantations, and cultural attractions surrounded by rich natural beauty. The best travel conditions are generally found between December and April, when rainfall is lower and outdoor activities are most</p>                   
                    </div>
                </div>

                <div className={styles_2.climate_section}>
                    <div className={styles_2.climate_section_image}>
                        <Image src={image_1} alt="Bomburu ella falls Sri Lanka" /> 
                    </div>
                    <div className={styles_2.climate_section_description}>
                    <h5>Mountain Climate</h5>
                    <p>Sri Lanka’s Mountain Climate is found in the central highlands, including destinations such as Nuwara Eliya, Ella, Haputale, Horton Plains, Bandarawela, and parts of the Knuckles Mountain Range. Due to higher elevations, temperatures are significantly cooler than the rest of the island, typically ranging from 10°C to 24°C (50°F–75°F) depending on altitude and season. Mist-covered mountains, rolling tea plantations, scenic train journeys, waterfalls, and breathtaking viewpoints make this region one of the country's most unique travel experiences. The cool and refreshing weather offers a welcome escape from the tropical heat found elsewhere in Sri Lanka. Mountain destinations can be visited year-round, with the clearest conditions often occurring between January and April.</p>                   
                    </div>
                </div>
                
                <div className={styles_2.climate_section}>
                    <div className={styles_2.climate_section_image}>
                        <Image src={image_1} alt="Bomburu ella falls Sri Lanka" /> 
                    </div>
                    <div className={styles_2.climate_section_description}>
                    <h5>Dry Zone Climate</h5>
                    <p>The Dry Zone of Sri Lanka covers much of the northern, eastern, and southeastern regions, including famous destinations such as Anuradhapura, Polonnaruwa, Trincomalee, Pasikuda, Arugam Bay, Sigiriya, and Yala. Characterized by long hours of sunshine, lower annual rainfall, and warm temperatures ranging from 27°C to 35°C (81°F–95°F), this region is ideal for beach holidays, wildlife safaris, and cultural exploration. The Dry Zone is home to many of Sri Lanka’s ancient kingdoms, national parks, and pristine east coast beaches. Travelers seeking sunny weather, outdoor adventures, and historical landmarks will find excellent conditions here, particularly between May and September when much of the region experiences dry and pleasant weather.</p>                   
                    </div>
                </div>

            </div>
        </div>


        
    </div>


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