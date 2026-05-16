"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles_nav from '../../navigation.module.css';
import styles from './package_detail.module.css';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import useThemeToggle from '../../lib/useThemeToggle';

export default function PackageDetail() {
  const params = useParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Touch handlers for swipe gesture
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe(e);
  };

  const handleSwipe = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
    if (isRightSwipe) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: 2,
    children: 0,
    message: ''
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);

    try {
      // Compute days from arrival/departure
      const arrival = new Date(quoteForm.arrivalDate);
      const departure = new Date(quoteForm.departureDate);
      const diffTime = Math.abs(departure - arrival);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Format duration string
      const durationStr = typeof packageData?.duration === 'object'
        ? `${packageData.duration?.days || 0} Days / ${packageData.duration?.nights || 0} Nights`
        : `${packageData?.duration || 'N/A'} Days`;

      await addDoc(collection(db, 'inquiries'), {
        name: quoteForm.name,
        email: quoteForm.email,
        mobile: quoteForm.phone,
        pax: `${quoteForm.adults} Adults, ${quoteForm.children} Children`,
        days: diffDays,
        message: quoteForm.message || '',
        source: 'Tour Package Quote',
        status: 'new',
        createdAt: new Date(),
        packageId: packageData?.id || '',
        packageTitle: packageData?.title || '',
        packageCoverImage: packageData?.coverImage || packageData?.imageUrl || '',
        packageDuration: durationStr,
        packagePrice: packageData?.price || 0,
        packageCurrency: packageData?.currency || 'USD',
        arrivalDate: quoteForm.arrivalDate,
        departureDate: quoteForm.departureDate,
      });

      setQuoteSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setQuoteSubmitted(false);
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          arrivalDate: '',
          departureDate: '',
          adults: 2,
          children: 0,
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Failed to submit quote. Please try again.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Fetch package details from Firebase — try slug first, fallback to doc ID
  useEffect(() => {
    const fetchPackage = async () => {
      if (!params.id) return;

      try {
        // Try slug-based lookup first
        const slugQuery = query(
          collection(db, 'packages'),
          where('slug', '==', params.id)
        );
        const slugSnap = await getDocs(slugQuery);

        if (!slugSnap.empty) {
          const docSnap = slugSnap.docs[0];
          setPackageData({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback: treat param as Firestore document ID (legacy URLs)
          const packageRef = doc(db, 'packages', params.id);
          const packageSnap = await getDoc(packageRef);
          if (packageSnap.exists()) {
            setPackageData({ id: packageSnap.id, ...packageSnap.data() });
          }
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

  // Get images array or use placeholder (handle both old and new formats)
  const images = packageData?.galleryImages?.length > 0
    ? packageData.galleryImages
    : packageData?.images?.length > 0
      ? packageData.images
      : packageData?.coverImage
        ? [packageData.coverImage]
        : packageData?.imageUrl
          ? [packageData.imageUrl]
          : [];

  return (
    <>
        {/*Navigation Section_____________________________________________________________________________*/}
    <div className={styles_nav.navigation}>
        <Link href="/"><h2 className={styles_nav.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_nav.navigation_ul}>
            <li className={styles_nav.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
            <li className={styles_nav.navigation_desktop}><Link href="/sri-lanka-tour-packages"><h2 id={styles_nav.active}>PACKAGES</h2></Link></li>
            <li className={styles_nav.navigation_desktop}><Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link></li>
            <li className={styles_nav.navigation_desktop}><Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link></li>
            <li className={styles_nav.navigation_desktop}><Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link></li>
            <li onClick={handleThemeToggle} className={styles_nav.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
            <li className={styles_nav.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>


      {isMenuOpen && (
        <div className={`${styles_nav.mobile_navigation_menu} ${styles_nav.fadeInDown}`}>
          <Link href="/"><h2>HOME</h2></Link>
          <Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link>
          <Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link>
          <Link href="/sri-lanka-travel-destinations"><h2>DESTINATIONS</h2></Link>
          <Link href="/contact-sri-lanka-tour-agent"><h2 id={styles_nav.active}>CONTACT</h2></Link>

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
            <Link href="/sri-lanka-tour-packages" className={styles.back_link}>Browse All Packages</Link>
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
                <div 
                  className={styles.main_image}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
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
                  <div className={styles.gallery_controls}>
                    <button
                      className={styles.slider_arrow_left}
                      onClick={() => setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length)}
                      aria-label="Previous image"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
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
                    <button
                      className={styles.slider_arrow_right}
                      onClick={() => setActiveImageIndex((activeImageIndex + 1) % images.length)}
                      aria-label="Next image"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
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
                      <span className={styles.info_value}>
                        {typeof packageData.duration === 'object'
                          ? `${packageData.duration?.days || 0} Days / ${packageData.duration?.nights || 0} Nights`
                          : `${packageData.duration || 'N/A'} Days`}
                      </span>
                    </div>
                  </div>
                  <div className={styles.info_card}>
                    <i className="fa-solid fa-users"></i>
                    <div>
                      <span className={styles.info_label}>Group Size</span>
                      <span className={styles.info_value}>{packageData.pax?.min || packageData.minPax || 2}-{packageData.pax?.max || packageData.maxPax || 12} People</span>
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
                      <span className={styles.info_value}>
                        {Array.isArray(packageData.tourType)
                          ? packageData.tourType.join(', ')
                          : packageData.tourType || 'Mixed'}
                      </span>
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
                  <button className={styles.inquire_button} onClick={() => document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' })}>
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
                    <h2>Day-by-Day Itinerary</h2>
                    <div className={styles.itinerary}>
                      {packageData.itinerary.map((day, index) => (
                        <div key={index} className={styles.itinerary_day}>
                          <div className={styles.day_header}>
                            <div className={styles.day_marker}>
                              <span className={styles.day_number}>Day {day.dayNumber || index + 1}</span>
                              {day.location && <span className={styles.day_location}><i className="fa-solid fa-map-marker-alt"></i> {day.location}</span>}
                            </div>
                            <h3 className={styles.day_title}>{day.title || `Day ${index + 1}`}</h3>
                          </div>

                          {/* Day Images Gallery */}
                          {day.images?.length > 0 && (
                            <div className={styles.day_images}>
                              {day.images.map((img, imgIndex) => (
                                <div key={imgIndex} className={styles.day_image_item}>
                                  <img src={img} alt={`Day ${day.dayNumber || index + 1} - ${imgIndex + 1}`} />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className={styles.day_content}>
                            {day.description && <p className={styles.day_description}>{day.description}</p>}

                            {/* Activities */}
                            {day.activities?.length > 0 && day.activities.some(a => a) && (
                              <div className={styles.day_activities}>
                                <h4><i className="fa-solid fa-hiking"></i> Activities</h4>
                                <ul>
                                  {day.activities.filter(a => a).map((activity, actIndex) => (
                                    <li key={actIndex}><i className="fa-solid fa-check"></i> {activity}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Day Details */}
                            <div className={styles.day_details}>
                              {day.accommodation && (
                                <div className={styles.day_detail_item}>
                                  <i className="fa-solid fa-hotel"></i>
                                  <span><strong>Accommodation:</strong> {day.accommodation}</span>
                                </div>
                              )}
                              {day.meals?.length > 0 && (
                                <div className={styles.day_detail_item}>
                                  <i className="fa-solid fa-utensils"></i>
                                  <span><strong>Meals:</strong> {day.meals.join(', ')}</span>
                                </div>
                              )}
                              {day.travelTime && (
                                <div className={styles.day_detail_item}>
                                  <i className="fa-solid fa-car"></i>
                                  <span><strong>Travel Time:</strong> {day.travelTime}</span>
                                </div>
                              )}
                            </div>
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

                {/* Get a Quote Section */}
                <div id="quote-section" className={styles.quote_section}>
                  <div className={styles.quote_header}>
                    <h2><i className="fa-solid fa-paper-plane"></i> Get a Quote</h2>
                    <p>Fill in your details and we'll send you a personalized quote for this tour</p>
                  </div>

                  {quoteSubmitted ? (
                    <div className={styles.quote_success}>
                      <i className="fa-solid fa-check-circle"></i>
                      <h3>Thank You!</h3>
                      <p>Your quote request has been submitted successfully. Our team will review your request and get back to you soon!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuoteSubmit} className={styles.quote_form}>
                      <div className={styles.quote_row}>
                        <div className={styles.quote_field}>
                          <label><i className="fa-solid fa-user"></i> Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={quoteForm.name}
                            onChange={handleQuoteChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className={styles.quote_field}>
                          <label><i className="fa-solid fa-envelope"></i> Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={quoteForm.email}
                            onChange={handleQuoteChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.quote_row}>
                        <div className={styles.quote_field}>
                          <label><i className="fa-solid fa-phone"></i> Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={quoteForm.phone}
                            onChange={handleQuoteChange}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                        <div className={styles.quote_field}>
                          <label><i className="fa-solid fa-calendar"></i> Arrival Date *</label>
                          <input
                            type="date"
                            name="arrivalDate"
                            value={quoteForm.arrivalDate}
                            onChange={handleQuoteChange}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.quote_row}>
                        <div className={styles.quote_field}>
                          <label><i className="fa-solid fa-calendar-check"></i> Departure Date *</label>
                          <input
                            type="date"
                            name="departureDate"
                            value={quoteForm.departureDate}
                            onChange={handleQuoteChange}
                            required
                          />
                        </div>
                        <div className={styles.quote_field_half}>
                          <div className={styles.quote_field}>
                            <label><i className="fa-solid fa-user-group"></i> Adults</label>
                            <input
                              type="number"
                              name="adults"
                              value={quoteForm.adults}
                              onChange={handleQuoteChange}
                              min="1"
                              max="20"
                            />
                          </div>
                          <div className={styles.quote_field}>
                            <label><i className="fa-solid fa-child"></i> Children</label>
                            <input
                              type="number"
                              name="children"
                              value={quoteForm.children}
                              onChange={handleQuoteChange}
                              min="0"
                              max="10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.quote_field_full}>
                        <label><i className="fa-solid fa-message"></i> Special Requests</label>
                        <textarea
                          name="message"
                          value={quoteForm.message}
                          onChange={handleQuoteChange}
                          placeholder="Any special requirements, dietary needs, or questions?"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className={styles.quote_actions}>
                        <button type="submit" className={styles.quote_submit} disabled={quoteSubmitting}>
                          {quoteSubmitting ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
                          ) : (
                            <><i className="fa-solid fa-paper-plane"></i> Submit Quote</>
                          )}
                        </button>
                        <p className={styles.quote_note}>
                          <i className="fa-solid fa-bolt"></i> Instant response guaranteed
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
