"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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
import image_14 from "../../../public/Destinations_Image_17.png";
import image_15 from "../../../public/Destinations_Image_18.png";
import image_16 from "../../../public/Destinations_Image_19.jpg";
import image_17 from "../../../public/Destinations_Image_20.png";
import useThemeToggle from '../lib/useThemeToggle';



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
          const elementHeight = element.offsetHeight;
          const windowHeight = window.innerHeight;
  
          const scrollTo =
            elementTop - windowHeight / 1 + elementHeight / 1;
  
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
    <div className={styles_1.navigation}>
        <Link href="/"><h1 className={styles_1.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>


{/*Destination Section_____________________________________________________________________________*/}
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

                    <button   className={styles_2.map_button} onClick={() => handleMapButtonClick(2)}>VIEW MAP</button>
          </div>
        </div>
      </div>


        
    </div>
    </>
  )
}

export default DestinationsContent
