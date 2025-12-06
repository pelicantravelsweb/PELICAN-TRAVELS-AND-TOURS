"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './destinations_section.module.css';
import Link from 'next/link';
import image_1 from "../../../public/Cover_Image.jpg";
import image_2 from "../../../public/Destinations_Image_1.jpg";
import image_3 from "../../../public/Destinations_Image_2.jpg";
import image_4 from "../../../public/Destinations_Image_3.jpg";
import image_5 from "../../../public/Destinations_Image_4.jpg";
import image_6 from "../../../public/Destinations_Image_5.jpg";
import image_7 from "../../../public/Destinations_Image_6.jpg";
import image_8 from "../../../public/Destinations_Image_7.jpg";
import image_9 from "../../../public/Destinations_Image_8.jpg";
import image_10 from "../../../public/Destinations_Image_9.jpg";
import image_11 from "../../../public/Destinations_Image_10.jpg";
import image_12 from "../../../public/Destinations_Image_11.jpg";
import image_13 from "../../../public/Destinations_Image_12.jpg";



function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);


  const handleThemeToggle = () => {
    setIsLightTheme(!isLightTheme);
  };

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add("light_theme");
    } else {
      document.body.classList.remove("light_theme");
    }
  }, [isLightTheme]);

  return (
    <>
    <div className={styles_1.navigation}>
        <Link href="/"><h1 className={styles_1.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="https://pelican-travels.web.app/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>


{/*Destination Section_____________________________________________________________________________*/}
    <div className={styles_2.destinatons_section}>

      <div className={styles_2.destinaton}>
        <div className={styles_2.city}>
          <div className={styles_2.div_left}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63480.837541186236!2d80.17071117178111!3d6.055975343899013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1763042234517!5m2!1sen!2slk"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>GALLE</h1>
              <p className={styles_2.city_description}>Discover Galle, a captivating coastal city where history meets tropical beauty.
                 Explore the iconic Galle Fort, a UNESCO World Heritage Site filled with colonial charm,
                 cobblestone streets, and ocean views. Enjoy golden beaches, boutique cafés,
                 and vibrant culture along Sri Lanka’s southern coast. Perfect for sightseeing,
                 relaxation, and photography, Galle offers a unique blend of heritage and seaside
                 tranquility — a must-visit destination for every traveler.</p>


              <div className={styles_2.attraction_section}>
                <h1 className={styles_2.sub_topic}>ATTRACTIONS</h1>
                <div className={styles_2.attraction_container}>
                    <div className={styles_2.attraction}>
                      <Image src={image_6} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Galle Fort</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_8} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Jungle Beach</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_9} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Hikkaduwa Beach</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_7} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Unawatuna Beach</h2>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>




      <div className={styles_2.destinaton}>
        <div className={styles_2.city}>
          <div className={styles_2.div_left}>
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.41806474999!2d80.58449557380983!3d7.294628565342877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy!5e0!3m2!1sen!2slk!4v1763046530285!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>KANDY</h1>
              <p className={styles_2.city_description}>
                 Experience Kandy, Sri Lanka’s scenic hill capital and a sacred city rich in culture and tradition.
                 Home to the Temple of the Sacred Tooth Relic, this UNESCO World Heritage Site
                 blends spiritual heritage with natural beauty. Surrounded by misty mountains,
                 lush tea gardens, and the serene Kandy Lake, it’s an ideal destination for culture lovers
                 and nature enthusiasts alike. Discover traditional dance, vibrant festivals,
                 and timeless charm in the heart of Sri Lanka.</p>


              <div className={styles_2.attraction_section}>
                <h1 className={styles_2.sub_topic}>ATTRACTIONS</h1>
                <div className={styles_2.attraction_container}>
                    <div className={styles_2.attraction}>
                      <Image src={image_10} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Kandy Temple</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_11} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Botanical Garden</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_13} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Elephant Orphanage</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_12} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Ambuluwawa</h2>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>



      <div className={styles_2.destinaton}>
        <div className={styles_2.city}>
          <div className={styles_2.div_left}>
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252936.28695222916!2d80.5343989678028!3d7.881518540860323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!5e0!3m2!1sen!2slk!4v1763054062512!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>DAMBULLA</h1>
              <p className={styles_2.city_description}>
                 Experience Kandy, Sri Lanka’s scenic hill capital and a sacred city rich in culture and tradition.
                 Home to the Temple of the Sacred Tooth Relic, this UNESCO World Heritage Site
                 blends spiritual heritage with natural beauty. Surrounded by misty mountains,
                 lush tea gardens, and the serene Kandy Lake, it’s an ideal destination for culture lovers
                 and nature enthusiasts alike. Discover traditional dance, vibrant festivals,
                 and timeless charm in the heart of Sri Lanka.</p>


              <div className={styles_2.attraction_section}>
                <h1 className={styles_2.sub_topic}>ATTRACTIONS</h1>
                <div className={styles_2.attraction_container}>
                    <div className={styles_2.attraction}>
                      <Image src={image_3} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Cave Temple</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_2} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Sigiriya</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_5} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Pidurangala</h2>
                    </div>

                    <div className={styles_2.attraction}>
                      <Image src={image_4} alt="Sri Lankan Beach"/>
                      <h2 className={styles_2.attraction_name}>Minneriya</h2>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>

        
    </div>
    </>
  )
}


export default page
