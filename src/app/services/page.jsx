"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './services_content.module.css';
import Link from 'next/link';
import Image from "next/image";
import image_1 from "../../../public/Services_Image_1.jpg";
import image_2 from "../../../public/Services_Image_2.jpg";
import image_3 from "../../../public/Services_Image_3.jpg";
import image_4 from "../../../public/Services_Image_4.jpg";
import useThemeToggle from '../lib/useThemeToggle';



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
    <div className={styles_1.navigation}>
        <Link href="/"><h1 className={styles_1.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2 id={styles_1.active}>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2 id={styles_1.active}>SERVICES</h2></Link>
          <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>
        </div>
        )}
    </div>


    <div className={styles_2.services_section}>
        <div className={styles_2.services_table}>
          <div className={styles_2.button_pannel}>
          <button className={styles_2.table_tabs} id={activeButton === "round_tours" ? styles_2.active : undefined}onClick={() => handleClick("round_tours")}>ROUND TOURS</button>
          <button className={styles_2.table_tabs} id={activeButton === "day_excursions" ? styles_2.active : undefined}onClick={() => handleClick("day_excursions")}>DAY EXCURSIONS</button>
          <button className={styles_2.table_tabs} id={activeButton === "mice_services" ? styles_2.active : undefined}onClick={() => handleClick("mice_services")}>MICE SERVICES</button>
          <button className={styles_2.table_tabs} id={activeButton === "transport_services" ? styles_2.active : undefined}onClick={() => handleClick("transport_services")}>TRANSPORT SERVICES</button>
          </div>

          {/* Round Tours Details */}
           {activeButton === "round_tours" && (
          <div className={styles_2.services_content}>
              <div className={styles_2.services_image}>
                <Image src={image_1} alt="Adam's Peak, Sri Lanka"/>
              </div>
              <div className={styles_2.services_description}>
               <h1 className={styles_2.topic_1}>Guided Round Tours In Sri Lanka</h1>
              <p className={styles_2.p_1}>Explore the beauty and diversity of Sri Lanka through our expertly guided round tours. 
                Each itinerary is custom-built to match your interests — 
                whether you crave beaches and wildlife or history and culture. 
                Travel comfortably with private transport, licensed guides, 
                and carefully selected hotels while discovering the island’s hidden gems.</p>

              <h1 className={styles_2.topic_1}>Endless Experiences to Choose From</h1>
              <ul className={styles_2.ul_1}><li>Beach & Coastal</li>
                  <li>Historical Sites</li>
                  <li>Cultural & Heritage</li>
                  <li>Botanical Gardens & Parks</li>
                  <li>Hikes & Nature Trails</li>
                  <li>Safaris & Wildlife</li>
                  <li>Adventures (rafting, zipline, etc.)</li>
                  <li>Train Rides</li>
                  <li>Ayurveda & Wellness</li>
                  <li>Festivals & Local Events</li>
                  <li>Food & Culinary</li></ul>

              <h1 className={styles_2.topic_1}>Everything You Need, All Arranged for You</h1>
              <ul className={styles_2.ul_2}><li>Licensed, English-speaking tour guides</li>
                  <li>Private transport with professional chauffeurs</li>
                  <li>Hotel reservations from boutique stays to luxury resorts</li>
                  <li>Personalized itinerary planning</li>
                  <li>24/7 local assistance and travel support</li></ul>

              <h1 className={styles_2.topic_1}>Tell us your preferred experiences and travel dates </h1>
              <p className={styles_2.p_1}>our experts will craft a tailor-made Sri Lanka round tour that brings your dream journey to life.</p>
              </div>
          </div>
          )}

          {/* Day Excursions Details */}
          {activeButton === "day_excursions" && (
          <div className={styles_2.services_content}>
              <div className={styles_2.services_image}>
                <Image src={image_2} alt="Adam's Peak, Sri Lanka"/>
              </div>
              <div className={styles_2.services_description}>
                <h1 className={styles_2.topic_1}>Private Excursions In Sri Lanka </h1>
                <p className={styles_2.p_1}>Perfect for travelers with limited time, 
                  our day excursions offer a taste of Sri Lanka’s most iconic destinations 
                  in just one day or an overnight stay. From coastal escapes and ancient cities 
                  to wildlife safaris and hiking adventures, each trip is fully guided, 
                  privately transported, and customizable to your interests. 
                  Accommodation can be arranged when a one-night stay enhances your experience.</p>

                <h1 className={styles_2.topic_1}>Popular Day & Overnight Tours</h1>
                      <ul className={styles_2.ul_2}><li>Coast Exploration</li>
                      <li>Cultural Experience Tours</li>
                      <li>Historical Places Tours</li>
                      <li>Wildlife Tours</li>
                      <li>Hiking & Nature Trail Tours</li>
                      <li>Adventure Tours</li>
                      <li>Train Rides</li></ul>

                <h1 className={styles_2.topic_1}>Everything You Need for a Seamless Day Tour</h1>
                      <ul className={styles_2.ul_2}><li>Private, air-conditioned transport with driver</li>
                      <li>Licensed, English-speaking guide</li>
                      <li>Entrance coordination & activity arrangements</li>
                      <li>Optional hotel accommodation for overnight trips</li>
                      <li>24/7 support during the excursion</li></ul>

                <h1 className={styles_2.topic_1}>Plan Your Day Excursion in Sri Lanka Today</h1>
                <p className={styles_2.p_1}>Choose your preferred destination or experience — 
                  beaches, wildlife, culture, or adventure — and we’ll organize a personalized day 
                  or overnight trip designed around you.</p>
              </div>
          </div>
          )}

          {/* MICE Services Details */}
          {activeButton === "mice_services" && (
          <div className={styles_2.services_content}>
              <div className={styles_2.services_image}>
                <Image src={image_3} alt="Adam's Peak, Sri Lanka"/>
              </div>
              <div className={styles_2.services_description}>
                <h1 className={styles_2.topic_1}>Professional MICE & Corporate Travel Solutions in Sri Lanka</h1>
                <p className={styles_2.p_1}>Choose your preferred destination or experience — 
                  beaches, wildlife, culture, or adventure — and we’ll organize a personalized day 
                  or overnight trip designed around you.</p>
                
                <h1 className={styles_2.topic_1}>Tailor-Made Corporate Experiences</h1>
                      <ul className={styles_2.ul_2}><li>Meetings & Conferences</li>
                      <li>Incentive Tours & Team-Building Programs</li>
                      <li>Corporate Events & Product Launches</li>
                      <li>Business Travel Management</li>
                      <li>Group Transport & Accommodation Coordination</li></ul>

                <h1 className={styles_2.topic_1}>Comprehensive MICE Travel Support</h1>
                      <ul className={styles_2.ul_2}><li>Venue sourcing, event planning & coordination</li>
                      <li>Hotel reservations & meeting facilities</li>
                      <li>Airport transfers & private transport</li>
                      <li>Guided excursions & leisure activities for delegates</li>
                      <li>On-site event management & local assistance</li></ul>

                <h1 className={styles_2.topic_1}>Plan Your Next Corporate Event in Sri Lanka</h1>
                <p className={styles_2.p_1}>Whether it’s a small executive meeting or a large international conference, 
                  our MICE team will design a professional, stress-free program that blends business with authentic Sri Lankan experiences.</p>
              </div>
          </div>
          )}

          {/* Transport Services Details */}
          {activeButton === "transport_services" && (
          <div className={styles_2.services_content}>
              <div className={styles_2.services_image}>
                <Image src={image_4} alt="Riverston, Sri Lanka"/>
              </div>
              <div className={styles_2.services_description}>
                <h1 className={styles_2.topic_1}>Comfortable & Reliable Transport Solutions Across Sri Lanka</h1>
                <p className={styles_2.p_1}>Travel across Sri Lanka safely and comfortably with 
                  our professional transportation services. Whether you need a private airport transfer, 
                  daily travel between destinations, or full island-wide tour transport, we provide 
                  air-conditioned vehicles driven by experienced chauffeurs. 
                  Enjoy flexible, reliable, and stress-free travel while exploring the island at your own pace.</p>

                <h1 className={styles_2.topic_1}>Travel Options for Every Journey</h1>
                      <ul className={styles_2.ul_2}><li>City-to-City Private Transfers</li>
                      <li>Chauffeur-Driven Round Tours</li>
                      <li>Airport transfers & private transport</li>
                      <li>Group & Family Transport</li>
                      <li>Luxury & Business-Class Vehicles</li></ul>

                <h1 className={styles_2.topic_1}>Everything You Need for a Smooth Journey</h1>
                      <ul className={styles_2.ul_2}><li>Air-conditioned cars, vans, and minibuses</li>
                      <li>Professional, English-speaking drivers</li>
                      <li>24/7 airport pickup & drop-off</li>
                      <li>Flexible schedules and customizable routes</li>
                      <li>Ideal for tours, business travel, or short transfers</li></ul>

                <h1 className={styles_2.topic_1}>Book Your Private Transport in Sri Lanka</h1>
                <p className={styles_2.p_1}>Wherever you’re headed — from the airport to your next destination — 
                  our transport team ensures you travel safely, comfortably, and on time.</p>
              </div>
          </div>
          )}

          


        </div>
    </div>

    <div className={styles_2.services_section_mobile}>
      <div className={styles_2.services_section_mobile_sub}>

          <button className={styles_2.table_tabs_mobile} id={styles_2.button_1}  onClick={() => toggleSection("service_1")}>ROUND TOURS</button>
         
            <div className={`${styles_2.content_box} ${openSection === "service_1" ? styles_2.active : ""}`}>
              <Image src={image_1} alt="Adam's Peak, Sri Lanka"/>

              <h1 className={styles_2.topic_1}>Guided Round Tours In Sri Lanka</h1>
              <p className={styles_2.p_1}>Explore the beauty and diversity of Sri Lanka through our expertly guided round tours. 
                Each itinerary is custom-built to match your interests — 
                whether you crave beaches and wildlife or history and culture. 
                Travel comfortably with private transport, licensed guides, 
                and carefully selected hotels while discovering the island’s hidden gems.</p>

              <h1 className={styles_2.topic_1}>Endless Experiences to Choose From</h1>
              <ul className={styles_2.ul_2}><li>Beach & Coastal</li>
                  <li>Historical Sites</li>
                  <li>Cultural & Heritage</li>
                  <li>Botanical Gardens & Parks</li>
                  <li>Hikes & Nature Trails</li>
                  <li>Safaris & Wildlife</li>
                  <li>Adventures (rafting, zipline, etc.)</li>
                  <li>Train Rides</li>
                  <li>Ayurveda & Wellness</li>
                  <li>Festivals & Local Events</li>
                  <li>Food & Culinary</li></ul>

              <h1 className={styles_2.topic_1}>Everything You Need, All Arranged for You</h1>
              <ul className={styles_2.ul_2}><li>Licensed, English-speaking tour guides</li>
                  <li>Private transport with professional chauffeurs</li>
                  <li>Hotel reservations from boutique stays to luxury resorts</li>
                  <li>Personalized itinerary planning</li>
                  <li>24/7 local assistance and travel support</li></ul>

              <h1 className={styles_2.topic_1}>Tell us your preferred experiences and travel dates </h1>
              <p className={styles_2.p_1}>our experts will craft a tailor-made Sri Lanka round tour that brings your dream journey to life.</p>
            </div>

          <button className={styles_2.table_tabs_mobile} id={styles_2.button_2} onClick={() => toggleSection("service_2")}>DAY EXCURSIONS</button>
            <div className={`${styles_2.content_box} ${openSection === "service_2" ? styles_2.active : ""}`}>
            <Image src={image_2} alt="Adam's Peak, Sri Lanka"/>

            <h1 className={styles_2.topic_1}>Private Excursions In Sri Lanka </h1>
            <p className={styles_2.p_1}>Perfect for travelers with limited time, 
              our day excursions offer a taste of Sri Lanka’s most iconic destinations 
              in just one day or an overnight stay. From coastal escapes and ancient cities 
              to wildlife safaris and hiking adventures, each trip is fully guided, 
              privately transported, and customizable to your interests. 
              Accommodation can be arranged when a one-night stay enhances your experience.</p>

            <h1 className={styles_2.topic_1}>Popular Day & Overnight Tours</h1>
                  <ul className={styles_2.ul_2}><li>Coast Exploration</li>
                  <li>Cultural Experience Tours</li>
                  <li>Historical Places Tours</li>
                  <li>Wildlife Tours</li>
                  <li>Hiking & Nature Trail Tours</li>
                  <li>Adventure Tours</li>
                  <li>Train Rides</li></ul>

            <h1 className={styles_2.topic_1}>Everything You Need for a Seamless Day Tour</h1>
                  <ul className={styles_2.ul_2}><li>Private, air-conditioned transport with driver</li>
                  <li>Licensed, English-speaking guide</li>
                  <li>Entrance coordination & activity arrangements</li>
                  <li>Optional hotel accommodation for overnight trips</li>
                  <li>24/7 support during the excursion</li></ul>

            <h1 className={styles_2.topic_1}>Plan Your Day Excursion in Sri Lanka Today</h1>
            <p className={styles_2.p_1}>Choose your preferred destination or experience — 
              beaches, wildlife, culture, or adventure — and we’ll organize a personalized day 
              or overnight trip designed around you.</p>
            </div>

          <button className={styles_2.table_tabs_mobile} id={styles_2.button_3} onClick={() => toggleSection("service_3")}>MICE SERVICES</button>
          <div className={`${styles_2.content_box} ${openSection === "service_3" ? styles_2.active : ""}`}>

            <Image src={image_3} alt="Adam's Peak, Sri Lanka"/>
            <h1 className={styles_2.topic_1}>Professional MICE & Corporate Travel Solutions in Sri Lanka</h1>
            <p className={styles_2.p_1}>Choose your preferred destination or experience — 
              beaches, wildlife, culture, or adventure — and we’ll organize a personalized day 
              or overnight trip designed around you.</p>
            
            <h1 className={styles_2.topic_1}>Tailor-Made Corporate Experiences</h1>
                  <ul className={styles_2.ul_2}><li>Meetings & Conferences</li>
                  <li>Incentive Tours & Team-Building Programs</li>
                  <li>Corporate Events & Product Launches</li>
                  <li>Business Travel Management</li>
                  <li>Group Transport & Accommodation Coordination</li></ul>

            <h1 className={styles_2.topic_1}>Comprehensive MICE Travel Support</h1>
                  <ul className={styles_2.ul_2}><li>Venue sourcing, event planning & coordination</li>
                  <li>Hotel reservations & meeting facilities</li>
                  <li>Airport transfers & private transport</li>
                  <li>Guided excursions & leisure activities for delegates</li>
                  <li>On-site event management & local assistance</li></ul>

            <h1 className={styles_2.topic_1}>Plan Your Next Corporate Event in Sri Lanka</h1>
            <p className={styles_2.p_1}>Whether it’s a small executive meeting or a large international conference, 
              our MICE team will design a professional, stress-free program that blends business with authentic Sri Lankan experiences.</p>
          </div>

          <button className={styles_2.table_tabs_mobile} id={styles_2.button_4} onClick={() => toggleSection("service_4")}>TRANSPORT SERVICES</button>
          <div className={`${styles_2.content_box} ${openSection === "service_4" ? styles_2.active : ""}`}>
            <Image src={image_4} alt="Adam's Peak, Sri Lanka"/>
            <h1 className={styles_2.topic_1}>Comfortable & Reliable Transport Solutions Across Sri Lanka</h1>
            <p className={styles_2.p_1}>Travel across Sri Lanka safely and comfortably with 
              our professional transportation services. Whether you need a private airport transfer, 
              daily travel between destinations, or full island-wide tour transport, we provide 
              air-conditioned vehicles driven by experienced chauffeurs. 
              Enjoy flexible, reliable, and stress-free travel while exploring the island at your own pace.</p>

            <h1 className={styles_2.topic_1}>Travel Options for Every Journey</h1>
                  <ul className={styles_2.ul_2}><li>City-to-City Private Transfers</li>
                  <li>Chauffeur-Driven Round Tours</li>
                  <li>Airport transfers & private transport</li>
                  <li>Group & Family Transport</li>
                  <li>Luxury & Business-Class Vehicles</li></ul>

            <h1 className={styles_2.topic_1}>Everything You Need for a Smooth Journey</h1>
                  <ul className={styles_2.ul_2}><li>Air-conditioned cars, vans, and minibuses</li>
                  <li>Professional, English-speaking drivers</li>
                  <li>24/7 airport pickup & drop-off</li>
                  <li>Flexible schedules and customizable routes</li>
                  <li>Ideal for tours, business travel, or short transfers</li></ul>

            <h1 className={styles_2.topic_1}>Book Your Private Transport in Sri Lanka</h1>
            <p className={styles_2.p_1}>Wherever you’re headed — from the airport to your next destination — 
              our transport team ensures you travel safely, comfortably, and on time.</p>

          </div>
      </div>
    </div>

    </>
  )
}



export default page
