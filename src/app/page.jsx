"use client";
import React, { useState, useEffect, useRef } from "react";
import styles_1 from './navigation.module.css';
import styles_2 from './cover_section.module.css';
import styles_3 from './services_section.module.css';
import styles_4 from './packages_section.module.css';
import styles_5 from './destination_section.module.css';
import styles_6 from './tailormade_section.module.css';
import styles_7 from './whyus_section.module.css';
import styles_8 from './feedback_section.module.css';
import styles_9 from './footer_section.module.css';
import Link from 'next/link';
import Image from "next/image";
import image_1 from "../../public/Cover_Image.jpg";
import image_2 from "../../public/Pelican_Bird_Art.png";
import image_3 from "../../public/SriLankan_Attractions.png";
import image_4 from "../../public/Inquiry Section_Mask Image.png";
import image_5 from "../../public/Inquiry Section_Mask Image_2.png";
import image_package_1 from "../../public/package_1.png";
import image_package_2 from "../../public/package_2.png";
import image_package_3 from "../../public/package_3.jpg";
import image_package_4 from "../../public/package_4.jpg";
import image_package_5 from "../../public/package_5.png";
import image_package_6 from "../../public/package_6.jpg";
import image_package_7 from "../../public/package_7.jpg";
import image_destination_1 from "../../public/Destinations_Image_1.jpg";
import image_destination_2 from "../../public/Destinations_Image_5.jpg";
import image_destination_3 from "../../public/Destinations_Image_9.jpg";
import image_destination_4 from "../../public/Destinations_Image_13.jpg";
import image_destination_5 from "../../public/Destinations_Image_14.jpg";
import image_destination_6 from "../../public/Destinations_Image_15.jpg";
import image_destination_7 from "../../public/Destinations_Image_16.jpg";
import { FaTripadvisor } from "react-icons/fa";
import useThemeToggle from './lib/useThemeToggle';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";



export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLightTheme, handleThemeToggle } = useThemeToggle();
    const [value, setValue] = useState(""); 
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState("");


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

// Phone Number input with country code __________________________________________________________________________________________
const handleSubmit = () => {
  if (!isValidPhoneNumber(value)) {
    alert("Invalid phone number");
  } else {
    console.log("Valid:", value);
  }
};

// Phone Number Validation
const handlePhoneChange = (val) => {
  if (!val) {
    setPhone(val);
    return;
  }

  const phoneNumber = parsePhoneNumberFromString(val);

  if (phoneNumber) {
    const nationalNumber = phoneNumber.nationalNumber;

    // 🔥 Example: Sri Lanka max = 9 digits
    if (nationalNumber.length > 9 && phoneNumber.country === "LK") {
      return; // ❌ block extra typing
    }
  }

  setPhone(val);

  // validation
  if (!isValidPhoneNumber(val)) {
    setPhoneError("Invalid phone number");
  } else {
    setPhoneError("");
  }
};


// Inquire Now Button (Jumping to Tailormade section)_____________________________________________________________________________
const inquireRef = useRef(null);

const scrollToInquire = () => {
  if (!inquireRef.current) return; // ✅ prevent crash

  const yOffset = -200;
  const y =
    inquireRef.current.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};




// Packages section(Scrolling cards)_____________________________________________________________________________
const [isAnimating, setIsAnimating] = useState(false);

const getCardWidth = () => {
  const container = containerRef.current;
  if (!container) return 0;

  const firstChild = container.children[0];
  return firstChild ? firstChild.offsetWidth + 12 : 0;
};

const handleLeftClick = () => {
  if (isAnimating) return;

  const container = containerRef.current;
  if (!container) return;

  const firstChild = container.children[0];
  const cardWidth = getCardWidth();

  setIsAnimating(true);

  // 🔥 Reset first
  container.style.transition = "none";
  container.style.transform = "translateX(0)";

  // 🔥 FORCE REFLOW (this is the fix)
  container.offsetHeight;

  // ✅ Now apply animation
  container.style.transition = "transform 0.5s ease";
  container.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    container.appendChild(firstChild);

    container.style.transition = "none";
    container.style.transform = "translateX(0)";

    setIsAnimating(false);
  }, 500);
};

const handleRightClick = () => {
  if (isAnimating) return;

  const container = containerRef.current;
  if (!container) return;

  const cardWidth = getCardWidth();
  const lastChild = container.lastElementChild;

  setIsAnimating(true);

  container.insertBefore(lastChild, container.firstChild);

  container.style.transition = "none";
  container.style.transform = `translateX(-${cardWidth}px)`;

  // 🔥 FORCE REFLOW
  container.offsetHeight;

  requestAnimationFrame(() => {
    container.style.transition = "transform 0.5s ease";
    container.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    setIsAnimating(false);
  }, 500);
};


// Swiping on mobile
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

  // Only mark as swipe if movement is meaningful
  if (diff > 15) {
    isSwiping.current = true;
  }
};

const handleTouchEnd = () => {
  if (!isSwiping.current) return; // ❌ Ignore simple taps

  const diff = startX.current - currentX.current;

  if (Math.abs(diff) < 50) return; // ❌ Not a strong swipe

  if (diff > 0) {
    handleLeftClick();
  } else {
    handleRightClick();
  }
};


// Destinations Section(Scrolling Cards)__________________________________________________________________________
const destinationsRef = useRef(null);

const slideNext = (container) => {
  if (isAnimating || !container) return;

  const firstChild = container.children[0];
  const cardWidth = firstChild.offsetWidth + 16;

  setIsAnimating(true);

  container.style.transition = "none";
  container.style.transform = "translateX(0)";
  container.offsetHeight; // 🔥 force reflow

  container.style.transition = "transform 0.5s ease";
  container.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    container.appendChild(firstChild);
    container.style.transition = "none";
    container.style.transform = "translateX(0)";
    setIsAnimating(false);
  }, 500);
};

const slidePrev = (container) => {
  if (isAnimating || !container) return;

  const lastChild = container.lastElementChild;
  const cardWidth = container.children[0].offsetWidth + 16;

  setIsAnimating(true);

  container.insertBefore(lastChild, container.firstChild);

  container.style.transition = "none";
  container.style.transform = `translateX(-${cardWidth}px)`;
  container.offsetHeight; // 🔥 force reflow

  requestAnimationFrame(() => {
    container.style.transition = "transform 0.5s ease";
    container.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    setIsAnimating(false);
  }, 500);
};

const handleTouchEndDest = () => {
  if (!isSwiping.current) return;

  const diff = startX.current - currentX.current;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    slideNext(destinationsRef.current);
  } else {
    slidePrev(destinationsRef.current);
  }
};

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      slidePrev(destinationsRef.current);
    }
    if (e.key === "ArrowRight") {
      slideNext(destinationsRef.current);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);




// Inquiry form
const [inquiryForm, setInquiryForm] = useState({
  name: '',
  email: '',
  mobile: '',
  pax: 'Individual / Couple (1-3 persons)',
  days: 'Mini Excursion (1-2 days)',
  date: '', 
  message: ''
});
const [inquirySubmitting, setInquirySubmitting] = useState(false);
const [inquirySubmitted, setInquirySubmitted] = useState(false);
const [inquiryError, setInquiryError] = useState('');

const handleInquiryChange = (e) => {
  const { name, value } = e.target;
  setInquiryForm(prev => ({ ...prev, [name]: value }));
};

const handleInquirySubmit = async (e) => {
  e.preventDefault();
  setInquirySubmitting(true);
  setInquiryError('');

  try {
    const res = await fetch('/api/send-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...inquiryForm,
        mobile: phone, // 🔥 include phone
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    setInquirySubmitted(true);

    setInquiryForm({
      name: '',
      email: '',
      mobile: '',
      pax: 'Individual / Couple (1-3 persons)',
      days: 'Mini Excursion (1-2 days)',
      date: '',
      message: ''
    });

    setPhone('');

    // ✅ KEEP SAME MESSAGE
    setTimeout(() => setInquirySubmitted(false), 5000);

  } catch (error) {
    console.error(error);
    setInquiryError('Failed to submit inquiry. Please try again.');
  } finally {
    setInquirySubmitting(false);
  }
};

  return (
    <>
{/*Navigation Section_____________________________________________________________________________*/}
    <div className={styles_1.navigation}>
        <Link href="/"><h2 className={styles_1.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_1.navigation_ul}>
            <li className={styles_1.navigation_desktop}><Link href="/"><h2 id={styles_1.active}>HOME</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/tour-packages"><h2>PACKAGES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_1.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
          <Link href="/"><h2 id={styles_1.active}>HOME</h2></Link>
          <Link href="/tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/services"><h2>SERVICES</h2></Link>
          <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact_us"><h2>CONTACT</h2></Link>

        </div>
        )}
    </div>

{/*Cover Section_____________________________________________________________________________*/}
    <div className={styles_2.coversection}>
            <div className={styles_2.coversection_brief}>
                <h1>SRI LANKA TOUR PACKAGES & TAILORMADE TOURS</h1>
                <h2>TRAVEL WITH WINGS OF ASSURANCE</h2>
                <p>
                Explore the best <strong>Sri Lanka tour packages</strong> designed to showcase the island’s most iconic destinations. 
                From pristine beaches and ancient Buddhist temples to lush tea plantations, thrilling wildlife safaris, 
                and UNESCO World Heritage sites, Sri Lanka offers unforgettable travel experiences. 

                Whether you're searching for <strong>Sri Lanka holiday packages</strong>, romantic honeymoon getaways, 
                family tours, or fully customized itineraries, Pelican Travels and Tours is your trusted travel agency in Sri Lanka. 
                Let us create a personalized Sri Lanka travel package tailored to your needs and budget.
                </p>
                <button className={styles_2.button_1} onClick={scrollToInquire}>INQUIRE NOW</button>
            </div>
            <div className={styles_2.coversection_image}>
                <div className={styles_2.image_wrapper}>
                <Image src={image_1} alt="Sri Lanka beach tour destination with palm trees and tropical coastline" fill priority quality={75} sizes="(max-width: 800px) 100vw, 50vw" className={styles_2.cover_img} placeholder="blur"/>
              </div>
            </div>
    </div>

{/*Services Section_____________________________________________________________________________*/}
        <div className={styles_3.services_section}>
            <Link href="/services"><h2 className={styles_3.topic_text}>OUR <span style={{ color: "rgb(235, 130, 10)" }}>SERVICES</span></h2></Link>
            <div className={styles_3.services_container}>
                <div className={styles_3.services} >
                    <Link href="/services"><i className="fa fa-recycle"></i>
                    <h2 className={styles_3.sub_topic_text}>ROUND TOURS</h2>
                    <p>Discover Sri Lanka with customized round tours covering cultural sites, wildlife, and scenic landscapes.</p></Link>
                </div>

                <div className={styles_3.services}>
                    <Link href="/services"><i className="fa-solid fa-binoculars"></i>
                    <h2 className={styles_3.sub_topic_text}>DAY EXCURSIONS</h2>
                    <p>Enjoy guided day excursions to famous attractions, historic landmarks, and natural wonders near you.</p></Link>
                </div>

                <div className={styles_3.services}>
                    <Link href="/services"><i className="fa fa-users"></i>
                    <h2 className={styles_3.sub_topic_text}>MICE SERVICES</h2>
                    <p>Professional MICE services for meetings, incentives, conferences, and events tailored to your needs.</p></Link>
                </div>

                <div className={styles_3.services}>
                    <Link href="/services"><i className="fa-solid fa-car"></i>
                    <h2 className={styles_3.sub_topic_text}>TRANSPORT SERVICES</h2>
                    <p>Reliable transport services with comfortable vehicles and experienced drivers for safe travel anywhere.</p></Link>
                </div>
            </div>
        </div>

{/*Packages Section_____________________________________________________________________________*/}
    <div className={styles_4.packages_section_container}>
        <Link href="/tour-packages"><h2 className={styles_4.topic_text}>SRI LANKAN <span style={{ color: "rgb(235, 130, 10)" }}>TOUR PACKAGES</span></h2></Link>
        <div className={styles_4.packages_section}>
        
              <div className={styles_4.overlayers}>
                <div className={styles_4.fade_overlay_right}></div>
                <div className={styles_4.fade_overlay_left}></div>
                <div className={styles_4.solid_right}></div>
                <div className={styles_4.solid_left}></div>
                    <button className={`${styles_4.nav_arrow} ${styles_4.left}`} onClick={handleRightClick}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className={`${styles_4.nav_arrow} ${styles_4.right}`} onClick={handleLeftClick}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>



              <div className={styles_4.packages_container} ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <Link href="/tour-packages/3hrumfK0tfHEXkXBCV12"><div className={styles_4.packages}>
                    <Image   src={image_package_1} alt="Golf Tour Package in Sri Lanka" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  8 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  1-8 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>MINI GOLF ESCAPE TOUR</h2>  
                        <h3 className={styles_4.Package_h3}>Sri Lanka is a rising golf destination in Asia, offering scenic, diverse courses, colonial charm, and affordable, high-quality experiences year-round.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                        <p>5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$950</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/AKvGtOLu2IsUzprJcdiC"><div className={styles_4.packages}>
                    <Image   src={image_package_2} alt="Sri Lankan Honeymoon Packages" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  10 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-2 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>HONEYMOON TOUR</h2>  
                        <h3 className={styles_4.Package_h3}>Romantic Sri Lanka honeymoon with hill country, train rides, safaris, and beach sunsets—blending adventure, luxury, and intimate moments.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                        <p>5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$1100</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/H7e0jCKt7JCk66yQ1jZ4"><div className={styles_4.packages}>
                    <Image   src={image_package_3} alt="Sri Lankan Wild Life Tour Packages" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-8 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>WILD & COASTAL BLISS</h2>  
                        <h3 className={styles_4.Package_h3}>South Coast Sri Lanka tour with safaris, whale watching, heritage, and beach escapes—blending adventure with coastal luxury.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$550</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/HPJwHyK5IUUbmLg6DHlC"><div className={styles_4.packages}>
                    <Image   src={image_package_4} alt="Sri Lankan Bird Watching Tour Package" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  11 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-7 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>BIRD WATCHING TOUR</h2>  
                        <h3 className={styles_4.Package_h3}>Sri Lanka hosts 430+ bird species, including 33 endemics. This tour covers diverse habitats with excellent birdwatching opportunities.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$1099.97</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/sDOgrjEvWHJ2cU4SWcYW"><div className={styles_4.packages}>
                    <Image   src={image_package_5} alt="Sri Lanka Luxury Honeymoon Package" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  7 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-2 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>LUXURY HONEYMOON</h2>  
                        <h3 className={styles_4.Package_h3}>Luxury Sri Lanka honeymoon with scenic hill country escapes, wildlife safaris, and relaxing beachside romance.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                        <p>5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$850</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/z6kf9PXvELkTkqmkNyic"><div className={styles_4.packages}>
                    <Image   src={image_package_6} alt="Pekoe Trail Tour Package" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  11 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  1-8 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>PEKOE TRAIL TREKKING</h2>  
                        <h3 className={styles_4.Package_h3}>The Pekoe Trail is a 300 km hike through Sri Lanka’s Central Highlands, linking tea estates, mountains, and villages.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$1450</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>

                <Link href="/tour-packages/06RhE4L4KZrctSKnodQG"><div className={styles_4.packages}>
                    <Image   src={image_package_7} alt="Wellness Tour Package" width={310} height={200} sizes="(max-width: 900px) 250px, 310px" quality={70}/>
                    <div className={styles_4.package_details}>
                        <div className={styles_4.packageinfo}> 
                        <p className={styles_4.Package_days}><i className="fa-solid fa-clock"></i>  10 Days</p>
                        <p className={styles_4.Package_paxes}><i className="fa-solid fa-users"></i>  2-8 Paxes</p>
                        </div>
                        <h2 className={styles_4.packages_h1}>WELLNESS & REJUVENATION</h2>  
                        <h3 className={styles_4.Package_h3}>Sri Lanka wellness retreat with Ayurveda, yoga, spa therapies, and nature healing—designed for complete mind, body, rejuvenation.</h3>
                        <div className={styles_4.package_ratings}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                        <p>5</p>
                        </div>
                        <div className={styles_4.package_cost}>
                        {/*<p className={styles_4.package_price}>$1855</p>
                        <p className={styles_4.perperson}>Per Person</p>*/}
                        </div>
                    </div>
                </div></Link>
                
              </div>
        </div>
    </div>
{/*Destinations Section_____________________________________________________________________________*/}
        <Link href={"/destinations"} className={styles_5.text_deco_none}><h2 className={styles_5.topic_text}>DESTINATIONS & <span style={{ color: "rgb(235, 130, 10)" }}>ATTRACTIONS</span></h2></Link>
        <div className={styles_5.destination_section}   onTouchStart={handleTouchStart}  onTouchMove={handleTouchMove} onTouchEnd={handleTouchEndDest}>
                <div className={styles_5.overlayers}>
                    <div className={styles_5.solid_left}></div>
                    <div className={styles_5.fade_overlay_left}></div>
                    <div className={styles_5.fade_overlay_right}></div>
                    <div className={styles_5.solid_right}></div>

                    <button className={`${styles_5.nav_arrow} ${styles_5.left}`} onClick={() => slidePrev(destinationsRef.current)}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className={`${styles_5.nav_arrow} ${styles_5.right}`}  onClick={() => slideNext(destinationsRef.current)}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                
                <div className={styles_5.destinations_container} ref={destinationsRef}>
                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_7} alt="Mirissa Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>MATARA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Southern Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Matara, explore historic forts, tranquil beaches, cultural temples, scenic lighthouse views, and coastal wildlife experiences.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>

                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_6} alt="Yala, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>YALA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Southern Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Yala, experience thrilling wildlife safaris, spot leopards and elephants, explore diverse ecosystems, and enjoy scenic coastal landscapes.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>

                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_1} alt="Dambulla, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>DAMBULLA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Central Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Dambulla, explore ancient cave temples, admire sacred Buddhist murals, experience cultural heritage, and enjoy scenic rock landscapes.</p>
                            <Link href="/destinations?scroll=dambulla"><button className={styles_5.button_3}>EXPLORE</button></Link>
                        </div>
                    </div>

                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_2} alt="Galle, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>GALLE</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Southern Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Galle, explore colonial forts, scenic beaches, historic streets, museums, and unique coastal heritage experiences.</p>
                            <Link href="/destinations?scroll=galle"><button className={styles_5.button_3}>EXPLORE</button></Link>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_3} alt="Kandy, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>KANDY</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Central Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Kandy, explore sacred temples, lush hills, cultural heritage, scenic lakes, and vibrant traditional experiences.</p>
                            <Link href="/destinations?scroll=kandy"><button className={styles_5.button_3}>EXPLORE</button></Link>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_5} alt="Polonnaruwa, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>POLONNARUWA</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>North Central Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Polonnaruwa, explore ancient ruins, royal palaces, sacred temples, intricate stone carvings, and rich archaeological heritage.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>


                    <div className={styles_5.destination_container} >
                        <div className={styles_5.destinations}>
                            <Image src={image_destination_4} alt="Colombo, Sri Lanka" fill sizes="(max-width: 800px) 250px, 320px" quality={70} className={styles_5.destination_img} placeholder="blur" priority/>
                            <div className={styles_5.destinations_overlay}>
                                <h2>COLOMBO</h2>
                            </div>
                        </div>
                        <div className={styles_5.destinations_brief}>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Western Province</span>
                        </div>
                        <div className={styles_5.destinations_description}>   
                            <p>In Colombo, explore vibrant city life, colonial landmarks, bustling markets, modern shopping, and coastal seaside views.</p>
                            <button className={styles_5.button_3}>EXPLORE</button>
                        </div>
                    </div>
                </div>
        </div>

{/*Tailormade Section_____________________________________________________________________________*/}

        <h2 className={styles_6.topic_text}>INQUIRE <span style={{ color: "rgb(235, 130, 10)" }}>US</span></h2>
        <div className={styles_6.inquire_section} ref={inquireRef}>
            <form className={styles_6.inquire_form} onSubmit={handleInquirySubmit}>
                <div className={styles_6.inquire_form_content}>
                    <table><tbody>

                    <tr><td><label>NAME</label></td>
                    <td><input name="name" type="text" placeholder="John Doe" required
                        value={inquiryForm.name} onChange={handleInquiryChange} /></td></tr>

                    <tr><td><label>EMAIL</label></td>
                    <td><input name="email" type="email" placeholder="johndoe@gmail.com" required
                        value={inquiryForm.email} onChange={handleInquiryChange} /></td></tr>

                    <tr><td><label>MOBILE</label></td>
                    <td><PhoneInput placeholder="Enter phone number" defaultCountry="US" international countryCallingCodeEditable={false} value={phone}
                        onChange={(val) => { setPhone(val); if (!val) { setPhoneError(""); return; }
                        if (!isValidPhoneNumber(val)) { setPhoneError("Invalid phone number"); } else { setPhoneError(""); } }}/>
                        {phoneError && ( <p style={{ color: "red", fontSize: "0.8rem" }}>{phoneError}</p>)}</td></tr>

                    <tr><td><label>PAX</label></td>
                    <td><select name="pax" value={inquiryForm.pax} onChange={handleInquiryChange}>
                            <option value="Individual / Couple (1-3 persons)">Individual / Couple (1–3 persons)</option>
                            <option value="Small Group (4-8 persons)">Small Group (4–8 persons)</option>
                            <option value="Medium Group (9-15 persons)">Medium Group (9–15 persons)</option>
                            <option value="Large Group (16-25 persons)">Large Group (16–25 persons)</option>
                            <option value="Full-Scale Group (26+ persons)">Full-Scale Group (26+ persons)</option>
                        </select></td></tr>

                    <tr><td><label>DAYS</label></td>
                    <td><select name="days" value={inquiryForm.days} onChange={handleInquiryChange}
                        className={styles_6.days}>
                            <option value="Mini Excursion (1-2 days)">Mini Excursion (1-2 days)</option>
                            <option value="Short Tour (3-5 days)">Short Tour (3-5 days)</option>
                            <option value="Medium Tour (6-10 days)">Medium Tour (6-10 days)</option>
                            <option value="Long Tour (10+ days)">Long Tour (10+ days)</option>
                        </select></td></tr>

                    <tr>
                    <td><label>DATE</label></td>
                    <td>
                        <div className={styles_6.date_wrapper}>
                        <input
                            type="date"
                            name="date"
                            value={inquiryForm.date}
                            onChange={handleInquiryChange}
                            required
                            className={styles_6.date_input}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        <i className={`fa fa-calendar ${styles_6.date_icon}`}></i>
                        </div>
                    </td>
                    </tr>

                    <tr><td><label>MESSAGE</label></td>
                    <td><textarea name="message" rows="4" placeholder="Your message here..."
                        value={inquiryForm.message} onChange={handleInquiryChange}></textarea></td></tr>

                    <tr><td></td>
                    <td>
                      {inquirySubmitted ? (
                        <p style={{color: '#27ae60', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem'}}>
                          Inquiry submitted successfully!
                        </p>
                      ) : (
                        <button type="submit" className={styles_6.submit_button} disabled={inquirySubmitting}>
                          {inquirySubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                        </button>
                      )}
                      {inquiryError && (
                        <p style={{color: '#e74c3c', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', marginTop: '0.5rem'}}>
                          {inquiryError}
                        </p>
                      )}
                    </td></tr>

                    </tbody></table>

                </div>
            </form>

            <div className={styles_6.inquire_image}>
                <Image   src={image_4} alt="Inquiry Visual" width={600} height={600} sizes="(max-width: 800px) 0px, 50vw" quality={70} className={styles_6.inquire_form_image_1} priority placeholder="blur"/>
                <Image   src={image_5} alt="Inquiry Visual" width={600} height={600} sizes="(max-width: 800px) 0px, 50vw" quality={70} className={styles_6.inquire_form_image_2} priority placeholder="blur"/>
            </div>
        </div>

{/*Why Us Section_____________________________________________________________________________*/}   
        <h2 className={styles_7.topic_text}>WHY <span style={{ color: "rgb(235, 130, 10)" }}>PELICAN TOURS?</span></h2>
        <div className={styles_7.whyus_section_container}>

            <div className={styles_7.whyus_section}>
                <div className={styles_7.whyus_section_image}>
                    <Image src={image_2} alt="pelican tours icon kolam art"/>
                </div>

                <div className={styles_7.whyus_section_description}>
                    <ul>
                        <li><h3>Local Expertise with a Personal Touch</h3></li>
                        <p>Discover Sri Lanka with passionate guides who know every hidden gem, ensuring authentic and personalized experiences.</p>
                        <li><h3>Tailor-Made Itineraries</h3></li>
                        <p>Enjoy fully customized Sri Lanka tour packages designed to match your travel style, budget, and interests.</p>
                        <li><h3>Experience-Based Packages</h3></li>
                        <p>From cultural tours to adventure escapes, our packages focus on unique, immersive experiences you’ll never forget.</p>
                        <li><h3>Long Industry Expertise</h3></li>
                        <p>With years of trusted service as a leading inbound tour operator in Sri Lanka, we guarantee reliable and professional travel solutions.</p>
                    </ul>
                </div>
            </div>

        </div>

{/*Feedback Section_____________________________________________________________________________*/}
        <h2 className={styles_8.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>FEEDBACK</span> FROM OUR CLIENTS</h2>    
        <div className={styles_8.feedback_section}>
            <div className={styles_8.feedback_container}>
                <div className={styles_8.feedback}>
                    <div className={styles_8.stars}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                    <p>"What an amazing trip… Pelican Travels & Tours were amazing. It’s the small details that turn a good into a fantastic holiday and the pelican team were amazing. Hasitha, our ever friendly and helpful host guide was supported by the wider team working behind the scene to constantly tweak our itinerary to get the most out of the each excursion, the weather and the location of the animals we wanted to see. We will definitely travel with Pelican next time we come to Sri Lanka."</p>
                    <h3>- Tim D7</h3>
                </div>
                
                <div className={styles_8.feedback}>
                    <div className={styles_8.stars}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                    <p>"Hasitha was a fantastic driver for our week long iteniary. He went above and beyond to ensure my friend and I were comfortable, was always extremely punctual and polite and also managed to organise additional excursions when requested. He also gave us tips and ensured our safety- as two female travellers that is highly important. We would recommend to everyone."</p>
                    <h3>- tasneem d</h3>
                </div>

                <div className={styles_8.feedback}>
                    <div className={styles_8.stars}><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                    <p>"The tour was bespoke to our family’s needs. Our guides Ranga and Hasitha went far and beyond our expectations, taking us to unique sights and activities such as hiking, hidden waterfalls, zip lining, turtle release, elephant safari,and surfing. We also hit the highlights of Sri Lanka. My family absolutely loved our adventure! Highly recommend Pelican tours!"</p>
                    <h3>- Isabel F</h3>
                </div>
            </div>
            <div className={styles_8.feedback_links}><h2 className={styles_8.feedback_title_2}>SHARE YOUR EXPERIENCE WITH US & <br/>
             CHECKOUT WHAT OTHERS SAID ABOUT US</h2>
             <div className={styles_8.feedback_buttons}>
                <Link href="https://www.google.com/search?q=pelican+travels&rlz=1C1HKFL_enLK1208LK1208&oq=pelican+&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIHCAEQABiABDIYCAIQLhgUGK8BGMcBGIcCGIAEGJgFGJkFMgcIAxAAGIAEMgwIBBAuGBQYhwIYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg2NDk1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3ae233c0282e0d1f:0x66241ac610346e2d,1,,,,"   target="_blank" rel="noopener noreferrer"><button><i className="fa-brands fa-google"></i></button></Link>
                <Link href="https://www.tripadvisor.com/Attraction_Review-g293962-d17700816-Reviews-PELICAN_TRAVELS_SRI_LANKA-Colombo_Western_Province.html#REVIEWS"  target="_blank" rel="noopener noreferrer"><button><FaTripadvisor className={styles_8.tripadvisor_icon} /></button></Link>
             </div>
            </div>
        </div>   

{/*Contact Us Section_____________________________________________________________________________*/}
        <h2 className={styles_9.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>CONTACT</span> PELICAN TOURS</h2>    
        <div className={styles_9.footer_section}>
                <div className={styles_9.footer_buttons}>
                    <button className={styles_9.footer_button_1}><i className="fa-brands fa-facebook"></i></button>
                    <button className={styles_9.footer_button_2}><i className="fa-brands fa-instagram"></i></button>
                    <button className={styles_9.footer_button_3}><FaTripadvisor className={styles_9.tripadvisor_icon} /></button>
                    <button className={styles_9.footer_button_4}><i className="fa-brands fa-whatsapp"></i></button>
                </div>
                <div className={styles_9.footer_phone_numbers}>  
                        <i className="fa-solid fa-phone"></i>
                        <p>+94782436606</p><p>|</p>
                        <p>+94764705440</p>
                </div>

                <div className={styles_9.footer_email}>  
                        <i className="fa-solid fa-envelope"></i>
                        <p> hello@pelicantravelsandtours.com</p>     
                </div>

                <div className={styles_9.footer_address}>  
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Dodangoda Toll Booth, Dodangoda Entrance, Kalutara</p>      
                </div>

                <div className={styles_9.footer_bottomline}>
                    <p>© 2026 Pelican Travels & Tours | All rights reserved</p>
                    <p></p>
                </div>
                <Image src={image_3} alt="Sri Lankan Attractions" />
        </div>
    </>
  )
}
