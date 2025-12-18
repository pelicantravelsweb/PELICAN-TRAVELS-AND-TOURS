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
import { FaTripadvisor } from "react-icons/fa";



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
        <h1 className={styles_4.topic_text}>SRI LANKAN <span style={{ color: "rgb(235, 130, 10)" }}>TOUR PACKAGES</span></h1>
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

        <h1 className={styles_6.topic_text}>INQUIARE <span style={{ color: "rgb(235, 130, 10)" }}>US</span></h1>
        <div className={styles_6.inquire_section}>
            <form className={styles_6.inquire_form}>
                <div className={styles_6.inquire_form_content}>
                    <table><tbody>

                    <tr><td><label>NAME</label></td>
                    <td><input name="name" id="name"  type="text" placeholder="John Doe" required/></td></tr>

                    <tr><td><label>EMAIL</label></td>
                    <td><input name="email" id="email"  type="email" placeholder="johndoe@gmail.com" required/></td></tr>

                    <tr><td><label>MOBILE</label></td>
                    
                    <td><input name="mobile" id="mobile" type="tel" placeholder="+94 123 456 789" required/></td></tr>

                    <tr><td><label>PAX</label></td>
                    <td><select name="pax" id="pax">
                            <option value="Individual / Couple (1-3 persons)">Individual / Couple (1–3 persons)</option>
                            <option value="Small Group (4-8 persons)">Small Group (4–8 persons)</option>
                            <option value="Medium Group (9-15 persons)">Medium Group (9–15 persons)</option>
                            <option value="Large Group (16-25 persons)">Large Group (16–25 persons)</option>
                            <option value="Full-Scale Group (26+ persons)">Full-Scale Group (26+ persons)</option>
                        </select></td></tr>

                    <tr><td><label>DAYS</label></td>
                    <td><select name="days" id="days" className={styles_6.days}>
                            <option value="Mini Excursion (1-2 days)">Mini Excursion (1-2 days)</option>
                            <option value="Short Tour (3-5 days)">Short Tour (3-5 days)</option>
                            <option value="Medium Tour (6-10 days)">Medium Tour (6-10 days)</option>
                            <option value="Long Tour (10+ days)">Long Tour (10+ days)</option>
                        </select></td></tr>

                    <tr><td><label>MESSAGE</label></td>
                    <td><textarea name="message" id="message" rows="4" placeholder="Your message here..."></textarea></td></tr>

                    <tr><td></td>
                    <td><button type="submit" className={styles_6.submit_button}>SUBMIT</button></td></tr>

                    </tbody></table>

                </div>
            </form>

            <div className={styles_6.inquire_image}>
                <Image src={image_4} alt="Inquiry Section Image"/>
            </div>
        </div>

{/*Why Us Section_____________________________________________________________________________*/}   
        <h1 className={styles_6.topic_text}>WHY <span style={{ color: "rgb(235, 130, 10)" }}>PELICAN TOURS?</span></h1>
        <div className={styles_7.whyus_section_container}>

            <div className={styles_7.whyus_section}>
                <div className={styles_7.whyus_section_image}>
                    <Image src={image_2} alt="Sri Lankan Beach"/>
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
        <h1 className={styles_6.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>FEEDBACK</span> FROM OUR CLIENTS</h1>    
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
            <div className={styles_8.feedback_links}><h1 className={styles_8.feedback_title_2}>SHARE YOUR EXPERIENCE WITH US & <br/>
             CHECKOUT WHAT OTHERS SAID ABOUT US</h1>
             <div className={styles_8.feedback_buttons}>
                <button><i className="fa-brands fa-google"></i></button>
                <button><FaTripadvisor className={styles_8.tripadvisor_icon} /></button>
             </div>
            </div>
        </div>   

{/*Feedback Section_____________________________________________________________________________*/}
        <h1 className={styles_6.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>CONTACT</span> PELICAN TOURS</h1>    
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
                    <p>Designed by ACZEND</p>
                </div>
                <Image src={image_3} alt="Sri Lankan Attractions" />
        </div>
    </>
  )
}
