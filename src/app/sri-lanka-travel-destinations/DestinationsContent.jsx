"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import styles_1 from './navigation.module.css';
import styles_2 from './destinations_section.module.css';
import styles_9 from './footer_section.module.css';
import Link from 'next/link';
import image_1 from "../../../public/Cover_Image.webp";
import image_2 from "../../../public/Destinations_Image_1.webp";
import image_3 from "../../../public/Destinations_Image_2.webp";
import image_4 from "../../../public/Destinations_Image_3.webp";
import image_5 from "../../../public/Destinations_Image_4.webp";
import image_6 from "../../../public/Destinations_Image_5.webp";
import image_7 from "../../../public/Destinations_Image_6.webp";
import image_8 from "../../../public/Destinations_Image_7.webp";
import image_9 from "../../../public/Destinations_Image_8.webp";
import image_10 from "../../../public/Destinations_Image_9.webp";
import image_11 from "../../../public/Destinations_Image_10.webp";
import image_12 from "../../../public/Destinations_Image_11.webp";
import image_13 from "../../../public/Destinations_Image_12.webp";
import image_14 from "../../../public/Destinations_Image_17.webp";
import image_15 from "../../../public/Destinations_Image_18.webp";
import image_16 from "../../../public/Destinations_Image_19.webp";
import image_17 from "../../../public/Destinations_Image_20.webp";
import image_18 from "../../../public/Destinations_Image_21.webp";
import image_19 from "../../../public/Destinations_Image_22.webp";
import image_20 from "../../../public/SriLankan_Attractions.webp";
import image_21 from "../../../public/Destinations_Image_23.webp";
import image_22 from "../../../public/Destinations_Image_24.webp";
import image_23 from "../../../public/Destinations_Image_25.webp";
import image_24 from "../../../public/Destinations_Image_26.webp";
import image_25 from "../../../public/Destinations_Image_27.webp";
import image_26 from "../../../public/Destinations_Image_28.webp";
import image_27 from "../../../public/Destinations_Image_29.webp";
import image_28 from "../../../public/Destinations_Image_30.webp";
import image_29 from "../../../public/Destinations_Image_31.webp";
import image_30 from "../../../public/Destinations_Image_32.webp";
import image_31 from "../../../public/Destinations_Image_33.webp";
import image_32 from "../../../public/Destinations_Image_34.webp";
import image_33 from "../../../public/Destinations_Image_35.webp";
import image_34 from "../../../public/Destinations_Image_36.webp";
import image_35 from "../../../public/Destinations_Image_37.webp";
import image_36 from "../../../public/Destinations_Image_38.webp";
import image_37 from "../../../public/Destinations_Image_39.webp";
import image_38 from "../../../public/Destinations_Image_16.webp";
import image_39 from "../../../public/Destinations_Image_40.webp";
import image_40 from "../../../public/Destinations_Image_41.webp";
import image_41 from "../../../public/Destinations_Image_42.webp";
import image_42 from "../../../public/Destinations_Image_43.webp";
import image_43 from "../../../public/Destinations_Image_44.webp";
import image_44 from "../../../public/Destinations_Image_45.webp";
import useThemeToggle from '../lib/useThemeToggle';
import { FaTripadvisor } from "react-icons/fa";



function DestinationsContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();


  // Jump to the destinations from home page destination cards ____________________________________________________________________
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const targetId = searchParams.get("scroll");
  
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
  
        if (element) {
          const elementTop = element.offsetTop;
          const windowHeight = window.innerHeight;
  
          const scrollTo =
            elementTop - windowHeight / 7;
  
          window.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, [searchParams]);
  

//MAP View___________________________________________________________________________________________________________

const [showMaps, setShowMaps] = useState([false, false, false, false]);

const handleMapButtonClick = (index) => {
  setShowMaps((prev) => {
    const updated = [...prev];
    updated[index] = !updated[index];
    return updated;
  });
};

//Swipe and Shift Attractions_________________________________________________________________________________________

  const containerRefs = useRef([]);
const [isAnimating, setIsAnimating] = useState(false);
const centerOffsets = useRef([]);

const getCardWidth = (index) => {
  const container = containerRefs.current[index];
  if (!container) return 0;

  const firstChild = container.children[0];
  return firstChild ? firstChild.offsetWidth + 12 : 0;
};

const centerCards = (index) => {
  const container = containerRefs.current[index];
  if (!container) return;

  const cards = container.children;
  if (cards.length < 3) return;

  const targetCard = cards[Math.floor(cards.length / 2)];

  const containerCenter = container.offsetWidth / 2;
  const cardCenter =
    targetCard.offsetLeft + targetCard.offsetWidth / 2;

  const offset = cardCenter - containerCenter;

  centerOffsets.current[index] = offset;

  container.style.transition = "none";
  container.style.transform = `translateX(-${offset}px)`;
};

const handleLeftClick = (index) => {
  if (isAnimating) return;

  const container = containerRefs.current[index];
  if (!container) return;

  const firstChild = container.children[0];
  const cardWidth = getCardWidth(index);
  const baseOffset = centerOffsets.current[index] || 0;

  setIsAnimating(true);

  container.style.transition = "none";
  container.style.transform = `translateX(-${baseOffset}px)`;

  container.offsetHeight;

  container.style.transition = "transform 0.5s ease";
  container.style.transform = `translateX(-${baseOffset + cardWidth}px)`;

  setTimeout(() => {
    container.appendChild(firstChild);

    container.style.transition = "none";
    container.style.transform = `translateX(-${baseOffset}px)`;

    setIsAnimating(false);
  }, 500);
};

const handleRightClick = (index) => {
  if (isAnimating) return;

  const container = containerRefs.current[index];
  if (!container) return;

  const cardWidth = getCardWidth(index);
  const lastChild = container.lastElementChild;
  const baseOffset = centerOffsets.current[index] || 0;

  setIsAnimating(true);

  container.insertBefore(lastChild, container.firstChild);

  container.style.transition = "none";
  container.style.transform = `translateX(-${baseOffset + cardWidth}px)`;

  container.offsetHeight;

  requestAnimationFrame(() => {
    container.style.transition = "transform 0.5s ease";
    container.style.transform = `translateX(-${baseOffset}px)`;
  });

  setTimeout(() => {
    setIsAnimating(false);
  }, 500);
};

useEffect(() => {
  setTimeout(() => {
    containerRefs.current.forEach((_, index) => {
      centerCards(index);
    });
  }, 300);

  const handleResize = () => {
    containerRefs.current.forEach((_, index) => {
      centerCards(index);
    });
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  
const startX = useRef(0);
const currentX = useRef(0);
const isSwiping = useRef(false);

const handleTouchStart = (e) => {
  startX.current = e.touches[0].clientX;
  isSwiping.current = false;
};

const handleTouchMove = (e) => {
  currentX.current = e.touches[0].clientX;

  const diff = Math.abs(startX.current - currentX.current);

  if (diff > 15) {
    isSwiping.current = true;
  }
};

const handleTouchEnd = (index) => {
  if (!isSwiping.current) return;

  const diff = startX.current - currentX.current;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    handleLeftClick(index);
  } else {
    handleRightClick(index);
  }
};


  return (
    <>
{/*Navigation Section_____________________________________________________________________________*/}
    <div className={styles_1.navigation}>
        <Link href="/"><h2 className={styles_1.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-travel-destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link>
          <Link href="/sri-lanka-travel-destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link>
          <Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>


{/*Destination Section_____________________________________________________________________________*/}
{/*Destination_1________________________________________________________________*/}
    <div className={styles_2.destinatons_section}>

      <div className={styles_2.destinaton} id="galle">
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[0] ? styles_2.show_map : ""}`}>
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

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN GALLE</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(0)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(0)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container} ref={(el) => (containerRefs.current[0] = el)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(0)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_6} alt="Galle Fort" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Galle Fort</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_8} alt="Jungle Beach" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Jungle Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_9} alt="Hikkaduwa Beach" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Hikkaduwa Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_7} alt="Unawatuna Beach" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Unawatuna Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_14} alt="Thalpe Beach" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Thalpe Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_15} alt="Kottawa Forest Reserve" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Kottawa Forest Reserve</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button className={styles_2.map_button} onClick={() => handleMapButtonClick(0)}>VIEW MAP</button>
          </div>
        </div>
      </div>





{/*Destination_2________________________________________________________________*/}
      <div id="kandy" className={styles_2.destinaton}>
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[1] ? styles_2.show_map : ""}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.41806474999!2d80.58449557380983!3d7.294628565342877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy!5e0!3m2!1sen!2slk!4v1763046530285!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>KANDY</h1>
              <p className={styles_2.city_description}>Experience Kandy, Sri Lanka’s scenic hill capital and a sacred city rich in culture and tradition.
                 Home to the Temple of the Sacred Tooth Relic, this UNESCO World Heritage Site
                 blends spiritual heritage with natural beauty. Surrounded by misty mountains,
                 lush tea gardens, and the serene Kandy Lake, it’s an ideal destination for culture lovers
                 and nature enthusiasts alike. Discover traditional dance, vibrant festivals,
                 and timeless charm in the heart of Sri Lanka.</p>


              <div className={styles_2.attraction_section}>

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN KANDY</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(1)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(1)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container}   ref={(el) => (containerRefs.current[1] = el)}  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(1)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_10} alt="Kandy Temple" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Kandy Temple</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_11} alt="Peradeniya Royal Botanical Garden" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Peradeniya Royal Botanical Garden</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_13} alt="Elephant Orphanage" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Elephant Orphanage</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_12} alt="Ambuluwawa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Ambuluwawa</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_16} alt="Bahirawakanda Temple" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Bahirawakanda Temple</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_17} alt="Nelligala Temple" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Nelligala Temple</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(1)}>VIEW MAP</button>
          </div>
        </div>
      </div>





{/*Destination_3________________________________________________________________*/}

      <div id="dambulla" className={styles_2.destinaton}>
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[2] ? styles_2.show_map : ""}`}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252936.28695222916!2d80.5343989678028!3d7.881518540860323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!5e0!3m2!1sen!2slk!4v1763054062512!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>DAMBULLA</h1>
              <p className={styles_2.city_description}>Experience the Dambulla–Sigiriya region, the cultural heart of Sri Lanka’s ancient kingdom where history, nature, and wildlife come together. Home to the sacred Dambulla Cave Temple, this UNESCO World Heritage Site features stunning rock-carved shrines, ancient murals, and centuries-old Buddhist artistry. Nearby stands the majestic Sigiriya Rock Fortress, an iconic citadel rising dramatically above the plains with breathtaking views and rich archaeological significance. Surrounded by the rural charm of Habarana village, the adventurous Pidurangala Rock, and the wildlife-rich Minneriya National Park, this region offers a perfect blend of culture, adventure, and nature. Discover ancient heritage, unforgettable landscapes, and wild encounters in the heart of Sri Lanka’s Cultural Triangle.</p>


              <div className={styles_2.attraction_section}>

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN DAMBULLA</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(2)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(2)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container}   ref={(el) => (containerRefs.current[2] = el)}  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(2)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_3} alt="Cave Temple" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Cave Temple</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_2} alt="Sigiriya" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Sigiriya Fortress</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_5} alt="Pidurangala Rock" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Pidurangala Rock</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_4} alt="Minneriya" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Minneriya</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_18} alt="Hiriwadunna Village" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Hiriwadunna Village</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_19} alt="Kaludiya Pokuna" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Kaludiya Pokuna</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(2)}>VIEW MAP</button>
          </div>
        </div>
      </div>



{/*Destination_4________________________________________________________________*/}
      <div id="polonnaruwa" className={styles_2.destinaton}>
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[3] ? styles_2.show_map : ""}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63225.99689403916!2d80.97197874238707!3d7.934196286263252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb44ba3b16ce27%3A0xc34997a2b3032b7c!2sPolonnaruwa!5e0!3m2!1sen!2slk!4v1779038774853!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>POLONNARUWA</h1>
              <p className={styles_2.city_description}>Discover Polonnaruwa, one of Sri Lanka’s most fascinating 
                ancient kingdoms and a UNESCO World Heritage Site rich in history and archaeological wonders. 
                Explore beautifully preserved ruins, ancient temples, royal palaces, massive stone Buddha statues, 
                and intricate carvings that reflect the grandeur of Sri Lanka’s medieval past. Surrounded by peaceful 
                reservoirs and lush greenery, Polonnaruwa offers a unique blend of culture, heritage, and natural beauty, 
                making it a must-visit destination for history lovers and cultural explorers.</p>


              <div className={styles_2.attraction_section}>

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN POLONNARUWA</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(3)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(3)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container}   ref={(el) => (containerRefs.current[3] = el)}  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(3)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_21} alt="Gal Vihara, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Gal Vihara</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_22} alt="The Sacred Quadrangle, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>The Sacred Quadrangle</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_23} alt="Rankoth Vehera, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Rankoth Vehera</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_24} alt="Lanka Thilaka Vihara, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Lanka Thilaka Vihara</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_25} alt="Aukana Buddha Statue, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Aukana Buddha Statue</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_26} alt="Parakrama Samudra Lake, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Parakrama Samudra Lake</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(3)}>VIEW MAP</button>
          </div>
        </div>
      </div>


{/*Destination_5________________________________________________________________*/}
      <div id="colombo" className={styles_2.destinaton}>
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[4] ? styles_2.show_map : ""}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.803921889186!2d79.81500564084803!3d6.921922085258426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1779120150007!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>COLOMBO</h1>
              <p className={styles_2.city_description}>Explore Colombo, Sri Lanka’s vibrant commercial capital 
                where modern city life meets rich colonial heritage and coastal charm. From bustling markets and 
                luxury shopping malls to historic landmarks, cultural temples, and scenic oceanfront views, 
                Colombo offers a dynamic travel experience for every visitor. Discover lively streets, diverse cuisine, 
                beautiful seaside promenades, and a blend of tradition and contemporary lifestyle in the heart of Sri Lanka’s urban culture.</p>


              <div className={styles_2.attraction_section}>

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN COLOMBO</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(4)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(4)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container}   ref={(el) => (containerRefs.current[4] = el)}  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(4)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_27} alt="Red Mosque, Colombo, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Red Mosque</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_28} alt="Gangarama Temple, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Gangarama Temple</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_29} alt="Lotus Tower, Colombo, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Lotus Tower</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_30} alt="Lanka Thilaka Vihara, Polonnaruwa" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Indipendance Square</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_31} alt="Pettah Local Market, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Pettah Local Market</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_32} alt="Port City, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Port City</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_33} alt="Urban Wetland Park, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Urban Wetland Park</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_34} alt="Viharamahadevi Park, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Viharamahadevi Park</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_35} alt="One Galleface Mall, Colombo" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>One Galleface Mall</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(4)}>VIEW MAP</button>
          </div>
        </div>
      </div>
{/*_______________________________________________________________*/}

{/*Destination_6________________________________________________________________*/}
      <div id="matara" className={styles_2.destinaton}>
        <div className={styles_2.city} >
          <div   className={`${styles_2.div_left} ${showMaps[5] ? styles_2.show_map : ""}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89792.13882122049!2d80.4884159873891!3d5.954808029750211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d151937cd9%3A0x1d711f45897009a3!2sMatara!5e0!3m2!1sen!2slk!4v1779731765100!5m2!1sen!2slk"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          <div className={styles_2.div_right}>
              <h1 className={styles_2.city_name}>MATARA</h1>
              <p className={styles_2.city_description}>Discover Matara, 
                a beautiful coastal city in southern Sri Lanka known for its golden beaches, rich history, 
                and relaxed tropical atmosphere. From the historic Dutch Fort and ancient temples to 
                stunning ocean views and vibrant local culture, Matara offers a perfect mix of heritage 
                and seaside charm. Explore nearby surfing hotspots, peaceful lagoons, and scenic coastal 
                landscapes while experiencing the authentic beauty of Sri Lanka’s southern coastline.</p>


              <div className={styles_2.attraction_section}>

                <h1 className={styles_2.sub_topic}>ATTRACTIONS IN MATARA</h1>

                <div className={styles_2.attraction_section}>
                  <div className={styles_2.overlayers}>
                    <div className={styles_2.fade_overlay_right}></div>
                    <div className={styles_2.fade_overlay_left}></div>
                    <div className={styles_2.solid_right}></div>
                    <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(5)}>
                          <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(5)}>
                          <i className="fas fa-chevron-right"></i>
                      </button>
                  </div>


                    <div className={styles_2.attraction_container}   ref={(el) => (containerRefs.current[5] = el)}  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => handleTouchEnd(5)}>
                        <div className={styles_2.attraction}>
                          <Image src={image_36} alt="Coconut Tree Hill, Mirissa, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Coconut Tree Hill</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_37} alt="Pegion Island, Matara, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Pegion Island</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_38} alt="Mirissa Beach, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Mirissa Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_39} alt="Weligama Port, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Weligama Port</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_40} alt="Matara Beach, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Matara Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_41} alt="Dondra Light House, Matara, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Dondra Light House</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_42} alt="Weligama Beach, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Weligama Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_43} alt="Dikwella Beach, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Dikwella Beach</h2>
                        </div>

                        <div className={styles_2.attraction}>
                          <Image src={image_44} alt="Parrot Rock, Sri Lanka" width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw"/>
                          <h2 className={styles_2.attraction_name}>Parrot Rock</h2>
                        </div>

                    </div>
                </div>
              </div>

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(5)}>VIEW MAP</button>
          </div>
        </div>
      </div>
{/*_______________________________________________________________*/}

        
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
                <Image src={image_20} alt="Sri Lankan Attractions" />
        </div>
    </>
  )
}

export default DestinationsContent
