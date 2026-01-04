"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles_nav from '../../navigation.module.css';
import styles from './package_detail.module.css';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function PackageDetail() {
  const params = useParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  // Fetch package details from Firebase
  useEffect(() => {
    const fetchPackage = async () => {
      if (!params.id) return;

      try {
        const packageRef = doc(db, 'packages', params.id);
        const packageSnap = await getDoc(packageRef);

        if (packageSnap.exists()) {
          setPackageData({ id: packageSnap.id, ...packageSnap.data() });
        } else {
          console.error("Package not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package:", error);
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-sharp fa-solid fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-sharp fa-solid fa-star-half-stroke"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }
    return stars;
  };

  // Get images array or use placeholder
  const images = packageData?.images?.length > 0
    ? packageData.images
    : packageData?.imageUrl
      ? [packageData.imageUrl]
      : [];

  return (
    <>
      {/* Navigation Section */}
      <div className={styles_nav.navigation}>
        <Link href="/"><h1 className={styles_nav.heading}>PELICAN TOURS</h1></Link>
        <ul className={styles_nav.navigation_ul}>
          <li className={styles_nav.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
          <li className={styles_nav.navigation_desktop}><Link href="/tour-packages"><h2 id={styles_nav.active}>PACKAGES</h2></Link></li>
          <li className={styles_nav.navigation_desktop}><Link href="/services"><h2>SERVICES</h2></Link></li>
          <li className={styles_nav.navigation_desktop}><Link href="/destinations"><h2>DESTINATIONS</h2></Link></li>
          <li className={styles_nav.navigation_desktop}><Link href="/contact_us"><h2>CONTACT</h2></Link></li>
          <li onClick={handleThemeToggle} className={styles_nav.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
          <li className={styles_nav.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>

        {isMenuOpen && (
          <div className={`${styles_nav.mobile_navigation_menu} ${styles_nav.fadeInDown}`}>
            <Link href="/"><h2>HOME</h2></Link>
            <Link href="/tour-packages"><h2 id={styles_nav.active}>PACKAGES</h2></Link>
            <Link href="/services"><h2>SERVICES</h2></Link>
            <Link href="/destinations"><h2>DESTINATIONS</h2></Link>
            <Link href="/contact_us"><h2>CONTACT</h2></Link>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className={styles.back_section}>
        <button onClick={() => router.back()} className={styles.back_button}>
          <i className="fa-solid fa-arrow-left"></i> Back to Packages
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.main_container}>
        {loading ? (
          <div className={styles.loading}>
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading package details...</p>
          </div>
        ) : !packageData ? (
          <div className={styles.not_found}>
            <i className="fa-solid fa-exclamation-circle"></i>
            <h2>Package Not Found</h2>
            <p>The package you're looking for doesn't exist or has been removed.</p>
            <Link href="/tour-packages" className={styles.back_link}>Browse All Packages</Link>
          </div>
        ) : (
          <>
            {/* Package Header */}
            <div className={styles.package_header}>
              <div className={styles.header_content}>
                <h1 className={styles.package_title}>{packageData.title || 'Tour Package'}</h1>
                <div className={styles.package_meta_header}>
                  <span className={styles.rating}>
                    {renderStars(packageData.rating || 4.5)}
                    <span>{packageData.rating || 4.5}</span>
                    {packageData.reviewCount && <span>({packageData.reviewCount} reviews)</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* Package Content */}
            <div className={styles.package_content}>
              {/* Image Gallery */}
              <div className={styles.gallery_section}>
                <div className={styles.main_image}>
                  {images.length > 0 ? (
                    <img src={images[activeImageIndex]} alt={packageData.title} />
                  ) : (
                    <div className={styles.placeholder_image}>
                      <i className="fa-solid fa-image"></i>
                      <p>No image available</p>
                    </div>
                  )}
                  {packageData.featured && (
                    <span className={styles.featured_badge}>Featured</span>
                  )}
                </div>
                {images.length > 1 && (
                  <div className={styles.thumbnail_gallery}>
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnail} ${activeImageIndex === index ? styles.active : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img src={img} alt={`${packageData.title} ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div className={styles.info_section}>
                {/* Quick Info Cards */}
                <div className={styles.quick_info}>
                  <div className={styles.info_card}>
                    <i className="fa-solid fa-clock"></i>
                    <div>
                      <span className={styles.info_label}>Duration</span>
                      <span className={styles.info_value}>{packageData.duration || 'N/A'} Days</span>
                    </div>
                  </div>
                  <div className={styles.info_card}>
                    <i className="fa-solid fa-users"></i>
                    <div>
                      <span className={styles.info_label}>Group Size</span>
                      <span className={styles.info_value}>{packageData.minPax || 2}-{packageData.maxPax || 12} People</span>
                    </div>
                  </div>
                  <div className={styles.info_card}>
                    <i className="fa-solid fa-calendar"></i>
                    <div>
                      <span className={styles.info_label}>Best Time</span>
                      <span className={styles.info_value}>{packageData.travelPeriod?.[0] || 'All Year'}</span>
                    </div>
                  </div>
                  <div className={styles.info_card}>
                    <i className="fa-solid fa-tag"></i>
                    <div>
                      <span className={styles.info_label}>Tour Type</span>
                      <span className={styles.info_value}>{packageData.tourType?.[0] || 'Mixed'}</span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className={styles.price_section}>
                  <div className={styles.price_info}>
                    <span className={styles.price_label}>Starting from</span>
                    <span className={styles.price}>${packageData.price || 899}</span>
                    <span className={styles.per_person}>per person</span>
                  </div>
                  <button className={styles.inquire_button}>
                    <i className="fa-solid fa-envelope"></i> Inquire Now
                  </button>
                </div>

                {/* Description */}
                <div className={styles.description_section}>
                  <h2>About This Tour</h2>
                  <p>{packageData.description || 'Discover the beauty of Sri Lanka with this amazing tour package. Experience the rich culture, stunning landscapes, and warm hospitality that makes Sri Lanka a must-visit destination.'}</p>
                </div>

                {/* Experiences/Tags */}
                {packageData.experiences?.length > 0 && (
                  <div className={styles.experiences_section}>
                    <h2>Experiences</h2>
                    <div className={styles.tags}>
                      {packageData.experiences.map((exp, index) => (
                        <span key={index} className={styles.tag}>
                          <i className="fa-solid fa-check"></i> {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {packageData.itinerary?.length > 0 && (
                  <div className={styles.itinerary_section}>
                    <h2>Itinerary</h2>
                    <div className={styles.itinerary}>
                      {packageData.itinerary.map((day, index) => (
                        <div key={index} className={styles.itinerary_day}>
                          <div className={styles.day_marker}>
                            <span className={styles.day_number}>Day {index + 1}</span>
                          </div>
                          <div className={styles.day_content}>
                            <h3>{day.title || `Day ${index + 1}`}</h3>
                            <p>{day.description || day}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions & Exclusions */}
                <div className={styles.inclusions_section}>
                  {packageData.inclusions?.length > 0 && (
                    <div className={styles.inclusion_box}>
                      <h2><i className="fa-solid fa-check-circle"></i> What's Included</h2>
                      <ul>
                        {packageData.inclusions.map((item, index) => (
                          <li key={index}><i className="fa-solid fa-check"></i> {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {packageData.exclusions?.length > 0 && (
                    <div className={styles.exclusion_box}>
                      <h2><i className="fa-solid fa-times-circle"></i> What's Not Included</h2>
                      <ul>
                        {packageData.exclusions.map((item, index) => (
                          <li key={index}><i className="fa-solid fa-times"></i> {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                {packageData.highlights?.length > 0 && (
                  <div className={styles.highlights_section}>
                    <h2>Tour Highlights</h2>
                    <div className={styles.highlights_grid}>
                      {packageData.highlights.map((highlight, index) => (
                        <div key={index} className={styles.highlight_item}>
                          <i className="fa-solid fa-star"></i>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className={styles.cta_section}>
                  <h2>Ready to Book This Tour?</h2>
                  <p>Contact us now to customize this package to your preferences</p>
                  <div className={styles.cta_buttons}>
                    <a href="https://wa.me/+94782436606" className={styles.whatsapp_button}>
                      <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
                    </a>
                    <a href="mailto:hello@pelicantravelsandtours.com" className={styles.email_button}>
                      <i className="fa-solid fa-envelope"></i> Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
