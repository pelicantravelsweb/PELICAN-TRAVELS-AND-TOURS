"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './location.module.css';
import Link from 'next/link';
import { FaTripadvisor } from "react-icons/fa";
import useThemeToggle from '../lib/useThemeToggle';



function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();
// Tourist form
  const [touristForm, setTouristForm] = useState({ email: '', message: '' });
  const [touristSubmitting, setTouristSubmitting] = useState(false);
  const [touristSubmitted, setTouristSubmitted] = useState(false);
  const [touristError, setTouristError] = useState('');

const handleTouristChange = (e) => {
  const { name, value } = e.target;
  setTouristForm(prev => ({ ...prev, [name]: value }));
};

const handleTouristSubmit = async (e) => {
  e.preventDefault();
  setTouristSubmitting(true);
  setTouristError('');

  try {
    const res = await fetch('/api/send-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...touristForm, category: 'Tourist' }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setTouristSubmitted(true);
    setTouristForm({ email: '', message: '' });
    setTimeout(() => setTouristSubmitted(false), 5000);
  } catch (error) {
    console.error(error);
    setTouristError('Failed to send message. Please try again.');
  } finally {
    setTouristSubmitting(false);
  }
};

// Business form
const [businessForm, setBusinessForm] = useState({ email: '', message: '' });
const [businessSubmitting, setBusinessSubmitting] = useState(false);
const [businessSubmitted, setBusinessSubmitted] = useState(false);
const [businessError, setBusinessError] = useState('');

const handleBusinessChange = (e) => {
  const { name, value } = e.target;
  setBusinessForm(prev => ({ ...prev, [name]: value }));
};

const handleBusinessSubmit = async (e) => {
  e.preventDefault();
  setBusinessSubmitting(true);
  setBusinessError('');

  try {
    const res = await fetch('/api/send-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...businessForm, category: 'Business' }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setBusinessSubmitted(true);
    setBusinessForm({ email: '', message: '' });
    setTimeout(() => setBusinessSubmitted(false), 5000);
  } catch (error) {
    console.error(error);
    setBusinessError('Failed to send message. Please try again.');
  } finally {
    setBusinessSubmitting(false);
  }
};


  return (
    <>

    {/*Navigation Section_____________________________________________________________________________*/}
    <Link href="/sri-lanka-travel-tips"><div className={styles_1.travel_tips}><h3>Travel Tips</h3><i className="fa fa-lightbulb"></i></div></Link>
    <div className={styles_1.navigation}>
        <Link href="/"><h2 className={styles_1.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact-sri-lanka-tour-agent"><h2 id={styles_1.active}>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link>
          <Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact-sri-lanka-tour-agent"><h2 id={styles_1.active}>CONTACT</h2></Link>

        </div>
        )}
    </div>


    <p className={styles_2.location_description}>
      Speak directly with a local Sri Lanka tour agent based in Kalutara.
      Pelican Travels & Tours designs private, tailor-made itineraries with
      dedicated driver-guides, handpicked stays, and full event logistics for
      corporate MICE trips. Reach out below for a free quote, or explore our{" "}
      <Link href="/">private Sri Lanka tours</Link> to see how your holiday
      can be built around you.
    </p>
    
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

            <form onSubmit={handleTouristSubmit}>
              <div className={styles_2.contact_us_section_details}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className={styles_2.text_box_1}
                  value={touristForm.email}
                  onChange={handleTouristChange}
                  required
                />
              </div>

              <div className={styles_2.contact_us_section_details}>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Type your message here..."
                  className={styles_2.text_box_2}
                  value={touristForm.message}
                  onChange={handleTouristChange}
                  required
                ></textarea>
              </div>

              <div className={styles_2.contact_us_section_details_2}>
                {touristSubmitted ? (
                  <p style={{ color: '#27ae60', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                    Message sent successfully!
                  </p>
                ) : (
                  <button type="submit" className={styles_2.button_1} disabled={touristSubmitting}>
                    <i className={touristSubmitting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"}></i>
                  </button>
                )}
              </div>
              {touristError && (
                <p style={{ color: '#e74c3c', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {touristError}
                </p>
              )}
            </form> 
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
              <i className="fa-brands fa-linkedin"></i>
              <a href="https://www.linkedin.com/in/pelican-travels-and-tours-a35a45409?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><p>@Pelican Travels & Tours</p></a>
            </div>

            <div className={styles_2.contact_us_section_details}>
              <FaTripadvisor className={styles_2.tripadvisor_icon} />
              <a href="https://www.tripadvisor.com/Profile/pelicantravels1982?fid=81ba0ae8-db2f-4695-9935-329e6501a9db"><p>@Pelican Travels & Tours</p></a>
            </div>

            <h2 className={styles_2.contact_us_section_heading_3}>Send us your email — we’ll get back to you</h2>

            <form onSubmit={handleBusinessSubmit}>
              <div className={styles_2.contact_us_section_details}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className={styles_2.text_box_1}
                  value={businessForm.email}
                  onChange={handleBusinessChange}
                  required
                />
              </div>

              <div className={styles_2.contact_us_section_details}>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Type your message here..."
                  className={styles_2.text_box_2}
                  value={businessForm.message}
                  onChange={handleBusinessChange}
                  required
                ></textarea>
              </div>

              <div className={styles_2.contact_us_section_details_2}>
                {businessSubmitted ? (
                  <p style={{ color: '#27ae60', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                    Message sent successfully!
                  </p>
                ) : (
                  <button type="submit" className={styles_2.button_1} disabled={businessSubmitting}>
                    <i className={businessSubmitting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"}></i>
                  </button>
                )}
              </div>
              {businessError && (
                <p style={{ color: '#e74c3c', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {businessError}
                </p>
              )}
            </form>
      </div>

    </div>

    </>
  )
}

export default page
