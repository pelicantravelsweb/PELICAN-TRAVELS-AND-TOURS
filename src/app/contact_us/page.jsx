"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './location.module.css';
import Link from 'next/link';
import { FaTripadvisor } from "react-icons/fa";



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
            <li className={styles_1.navigation_desktop}><Link href="/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2 id={styles_1.active}>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2 id={styles_1.active}>CONTACT</h2></Link>

        </div>
        )}
    </div>

    <div className={styles_2.location_section}>
      <div className={styles_2.location_section_sub_dev_1}>
        <h1>VISIT PELICAN TOURS</h1>
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.863734555289!2d80.04584540979856!3d6.53888702295864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae233c0282e0d1f%3A0x66241ac610346e2d!2sPelican%20Travels%20%26%20Tours!5e0!3m2!1sen!2slk!4v1762019413844!5m2!1sen!2slk&basemap=satellite"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className={styles_2.address}>
            <i className="fa-solid fa-location-dot"></i>
            <h2>Dodangoda Toll Booth, Dodangoda Entrance, Kalutara</h2>
          </div>
        
      </div>

      <div className={styles_2.contact_us_section}>
            <h1 className={styles_2.contact_us_section_heading_1}>Are you a Tourist?</h1>
            <h2 className={styles_2.contact_us_section_heading_2}>Contact Us</h2>
            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-whatsapp"></i>
              <a href="https://wa.me/+94782436606"><p>+94782436606</p></a>
              <h3>|</h3>
              <a href="https://wa.me/+94764705440"><p>+94764705440</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:hello@pelicantravelsandtours.com"><p>hello@pelicantravelsandtours.com</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-facebook-f"></i>
              <a href="https://web.facebook.com/pelicantravels.lk"><p>@Pelican Travels</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-instagram"></i>
              <a href="https://web.facebook.com/pelicantravels.lk"><p>@Pelican Travels & Tours</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <FaTripadvisor className={styles_2.tripadvisor_icon} />
              <a href="https://www.tripadvisor.com/Profile/pelicantravels1982?fid=81ba0ae8-db2f-4695-9935-329e6501a9db"><p>@Pelican Travels & Tours</p></a>
            </div>

            <h2 className={styles_2.contact_us_section_heading_3}>Send us your email — we’ll get back to you</h2>

            <div className={styles_2.contact_us_section_details}>
              <input  type="text"  placeholder="Enter your Email"  className={styles_2.text_box_1} />
            </div>

            <div className={styles_2.contact_us_section_details}>
            <textarea rows="5"  placeholder="Type your message here..." className={styles_2.text_box_2} ></textarea>
            </div>
                      
            <div className={styles_2.contact_us_section_details_2}>
            <button className={styles_2.button_1}><i className="fa-solid fa-paper-plane"></i></button>
            </div>    
      </div>

      <div className={styles_2.contact_us_section}>
            <h1 className={styles_2.contact_us_section_heading_1}>Are You a Business?</h1>
            <h2 className={styles_2.contact_us_section_heading_2}>Contact Us</h2>
            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-whatsapp"></i>
              <a href="https://wa.me/+94782436606"><p>+94782436606</p></a>
              <h3>|</h3>
              <a href="https://wa.me/+94764705440"><p>+94764705440</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:hello@pelicantravelsandtours.com"><p>hello@pelicantravelsandtours.com</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-facebook-f"></i>
              <a href="https://web.facebook.com/pelicantravels.lk"><p>@Pelican Travels</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <i className="fa-brands fa-instagram"></i>
              <a href="https://web.facebook.com/pelicantravels.lk"><p>@Pelican Travels & Tours</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <FaTripadvisor className={styles_2.tripadvisor_icon} />
              <a href="https://www.tripadvisor.com/Profile/pelicantravels1982?fid=81ba0ae8-db2f-4695-9935-329e6501a9db"><p>@Pelican Travels & Tours</p></a>
            </div>

            <h2 className={styles_2.contact_us_section_heading_3}>Send us your email — we’ll get back to you</h2>

            <div className={styles_2.contact_us_section_details}>
              <input  type="text"  placeholder="Enter your Email"  className={styles_2.text_box_1} />
            </div>

            <div className={styles_2.contact_us_section_details}>
            <textarea rows="5"  placeholder="Type your message here..." className={styles_2.text_box_2} ></textarea>
            </div>
                      
            <div className={styles_2.contact_us_section_details_2}>
            <button className={styles_2.button_1}><i className="fa-solid fa-paper-plane"></i></button>
            </div>    
      </div>

    </div>

    </>
  )
}


export default page
