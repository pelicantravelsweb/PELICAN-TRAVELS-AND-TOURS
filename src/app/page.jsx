"use client";
import React, { useState, useEffect, useRef } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './cover_section.module.css';
import styles_3 from './services_section.module.css';
import styles_4 from './packages_section.module.css';
import styles_5 from './destination_section.module.css';
import Link from 'next/link';
import Image from "next/image";
import image_1 from "../../public/Cover_Image.jpg";



export default function Home() {
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


const containerRef = useRef(null);

useEffect(() => {
  if (!containerRef.current) return;

  const container = containerRef.current;
  const packages = container.querySelectorAll(`.${styles_4.packages}`);

  if (packages.length < 3) return;

  setTimeout(() => {
    const middle = container.offsetWidth / 2 - packages[2].offsetWidth / 2;

    container.scrollTo({
      left: packages[2].offsetLeft - middle,
      behavior: "smooth",
    });
  }, 300);
}, []);


// Scroll one card at a time
const scrollToPackage = (direction) => {
  if (!containerRef.current) return;

  const container = containerRef.current;
  const packages = container.querySelectorAll(`.${styles_4.packages}`);

  if (!packages.length) return;

  const cardWidth = packages[0].offsetWidth + 16; // add gap if needed

  const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

const scrollLeft = () => scrollToPackage("left");
const scrollRight = () => scrollToPackage("right");




  return (
    <>
{/*Navigation Section_____________________________________________________________________________*/}
    <div className={styles_1.navigation}>
        <Link href="/"><h1 className={styles_1.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2 id={styles_1.active}>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="https://pelican-travels.web.app/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2 id={styles_1.active}>HOME</h2></Link>
          <Link href="/packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>

{/*Cover Section_____________________________________________________________________________*/}
    <div className={styles_2.coversection}>
        <div className={styles_2.coversection_brief}>
                <h1>TRAVEL WITH WINGS OF ASSURANCE</h1>
                <h2>Explore & Discover the Elegance of Sri Lanka</h2>
                <p> Explore Sri Lanka’s top tourist attractions — 
                    from pristine beaches and ancient Buddhist temples to lush tea plantations, 
                    wildlife safaris, and cultural heritage sites. 
                    Whether you're looking for all-inclusive Sri Lanka tour packages, 
                    honeymoon getaways, or custom holiday itineraries, 
                    Pelican Tours is your trusted travel agency in Sri Lanka. 
                    Let us design your unforgettable Sri Lankan vacation.</p>
                <button className={styles_2.button_1}>INQUIRE NOW</button>
            </div>
            <div className={styles_2.coversection_image}>
                <Image src={image_1} alt="Sri Lankan Beach"/>
            </div>
    </div>

{/*Services Section_____________________________________________________________________________*/}
        <div className={styles_3.services_section}>
            <h1 className={styles_3.topic_text}>OUR <span style={{ color: "rgb(235, 130, 10)" }}>SERVICES</span></h1>
            <div className={styles_3.services_container}>
                <div className={styles_3.services}>
                    <i className="fa fa-recycle"></i>
                    <h1 className={styles_3.sub_topic_text}>ROUND TOURS</h1>
                    <p>Discover Sri Lanka with customized round tours covering cultural sites, wildlife, and scenic landscapes.</p>
                </div>

                <div className={styles_3.services}>
                    <i className="fa-solid fa-binoculars"></i>
                    <h1 className={styles_3.sub_topic_text}>DAY EXCURSIONS</h1>
                    <p>Enjoy guided day excursions to famous attractions, historic landmarks, and natural wonders near you.</p>
                </div>

                <div className={styles_3.services}>
                    <i className="fa fa-users"></i>
                    <h1 className={styles_3.sub_topic_text}>MICE SERVICES</h1>
                    <p>Professional MICE services for meetings, incentives, conferences, and events tailored to your needs.</p>
                </div>

                <div className={styles_3.services}>
                    <i className="fa-solid fa-car"></i>
                    <h1 className={styles_3.sub_topic_text}>TRANSPORT SERVICES</h1>
                    <p>Reliable transport services with comfortable vehicles and experienced drivers for safe travel anywhere.</p>
                </div>
            </div>
        </div>

{/*Packages Section_____________________________________________________________________________*/}
        <h1 className={styles_4.topic_text}>OUR <span style={{ color: "rgb(235, 130, 10)" }}>PACKAGES</span></h1>
        <div className={styles_4.packages_section}>
        
              <div className={styles_4.overlayers}>
                    <div className={styles_4.solid_left}></div>
                    <div className={styles_4.fade_overlay_left}></div>
                    <div className={styles_4.fade_overlay_right}></div>
                    <div className={styles_4.solid_right}></div>

                    <button className={`${styles_4.nav_arrow} ${styles_4.left}`} onClick={scrollLeft}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className={`${styles_4.nav_arrow} ${styles_4.right}`} onClick={scrollRight}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    
                </div>



              <div className={styles_4.packages_container} ref={containerRef}>
                <div className={styles_4.packages} id="package_1">
                    <Image src={image_1} alt="Sri Lankan Beach"/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-12 Paxes</p>
                        </div>
                        <h1 className={styles_4.packages_h1}>WILDLIFE SAFARI ADVENTURE</h1>  
                        <h3 className={styles_4.Package_h3}>Encounter elephants, leopards and exotic birds in Sri Lanka's national parks including Yala, Udawalawe and Minneriya.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        <p className={styles_4.package_price}>$899</p>
                        <p className={styles_4.perperson}>Per Person</p>
                        </div>
                    </div>
                </div>

                <div className={styles_4.packages} id="package_1">
                    <Image src={image_1} alt="Sri Lankan Beach"/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-12 Paxes</p>
                        </div>
                        <h1 className={styles_4.packages_h1}>WILDLIFE SAFARI ADVENTURE</h1>  
                        <h3 className={styles_4.Package_h3}>Encounter elephants, leopards and exotic birds in Sri Lanka's national parks including Yala, Udawalawe and Minneriya.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        <p className={styles_4.package_price}>$899</p>
                        <p className={styles_4.perperson}>Per Person</p>
                        </div>
                    </div>
                </div>


                <div className={styles_4.packages} id="package_1">
                    <Image src={image_1} alt="Sri Lankan Beach"/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-12 Paxes</p>
                        </div>
                        <h1 className={styles_4.packages_h1}>WILDLIFE SAFARI ADVENTURE</h1>  
                        <h3 className={styles_4.Package_h3}>Encounter elephants, leopards and exotic birds in Sri Lanka's national parks including Yala, Udawalawe and Minneriya.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        <p className={styles_4.package_price}>$899</p>
                        <p className={styles_4.perperson}>Per Person</p>
                        </div>
                    </div>
                </div>

                <div className={styles_4.packages} id="package_1">
                    <Image src={image_1} alt="Sri Lankan Beach"/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-12 Paxes</p>
                        </div>
                        <h1 className={styles_4.packages_h1}>WILDLIFE SAFARI ADVENTURE</h1>  
                        <h3 className={styles_4.Package_h3}>Encounter elephants, leopards and exotic birds in Sri Lanka's national parks including Yala, Udawalawe and Minneriya.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        <p className={styles_4.package_price}>$899</p>
                        <p className={styles_4.perperson}>Per Person</p>
                        </div>
                    </div>
                </div>

                <div className={styles_4.packages} id="package_1">
                    <Image src={image_1} alt="Sri Lankan Beach"/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-12 Paxes</p>
                        </div>
                        <h1 className={styles_4.packages_h1}>WILDLIFE SAFARI ADVENTURE</h1>  
                        <h3 className={styles_4.Package_h3}>Encounter elephants, leopards and exotic birds in Sri Lanka's national parks including Yala, Udawalawe and Minneriya.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        <p className={styles_4.package_price}>$899</p>
                        <p className={styles_4.perperson}>Per Person</p>
                        </div>
                    </div>
                </div>
                
              </div>
        </div>

{/*Destinations Section_____________________________________________________________________________*/}
        <h1 className={styles_3.topic_text}>DESTINATIONS & <span style={{ color: "rgb(235, 130, 10)" }}>ATTRACTIONS</span></h1>
        <div className={styles_5.destination_section}>
                <div className={styles_5.overlayers}>
                    <div className={styles_5.solid_left}></div>
                    <div className={styles_5.fade_overlay_left}></div>
                    <div className={styles_5.fade_overlay_right}></div>
                    <div className={styles_5.solid_right}></div>

                    <button className={`${styles_5.nav_arrow} ${styles_5.left}`}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className={`${styles_5.nav_arrow} ${styles_5.right}`}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                
                <div className={styles_5.destinations_container}>
                    <div className={styles_5.destination_container} id="dest_5">
                        <div className={styles_5.destinations}>
                            <Image src={image_1} alt="Sri Lankan Beach"/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>DAMBULLA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Central Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>Discover historic sites, scenic landscapes, and local cultural experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} id="dest_5">
                        <div className={styles_5.destinations}>
                            <Image src={image_1} alt="Sri Lankan Beach"/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>GALLE</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Southern Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>Discover historic sites, scenic landscapes, and local cultural experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} id="dest_5">
                        <div className={styles_5.destinations}>
                            <Image src={image_1} alt="Sri Lankan Beach"/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>KANDY</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Central Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>Discover historic sites, scenic landscapes, and local cultural experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} id="dest_5">
                        <div className={styles_5.destinations}>
                            <Image src={image_1} alt="Sri Lankan Beach"/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>POLONNARUWA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>North Western Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>Discover historic sites, scenic landscapes, and local cultural experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} id="dest_5">
                        <div className={styles_5.destinations}>
                            <Image src={image_1} alt="Sri Lankan Beach"/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>POLONNARUWA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>North Western Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>Discover historic sites, scenic landscapes, and local cultural experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>
                </div>
        </div>

{/*Inquire Us Section_____________________________________________________________________________*/}
        

    </>
  )
}
