"use client";
import React, { useState, useEffect } from "react";
import styles_1 from './navigation.module.css';
import Link from 'next/link';
import useThemeToggle from '../lib/useThemeToggle';



function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();

  return (
    <>
    <div className={styles_1.navigation}>
        <Link href="/"><h1 className={styles_1.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="https://pelican-travels.web.app/tour-packages"><h2 id={styles_1.active}>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/packages"><h2 id={styles_1.active}>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>

    </>
  )
}


export default page
