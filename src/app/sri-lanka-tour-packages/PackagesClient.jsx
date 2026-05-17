"use client";
import React, { useState, useEffect, useRef } from "react";
import styles_nav from '../navigation.module.css';
import styles from './tour_packages.module.css';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import useThemeToggle from '../lib/useThemeToggle';


function PackageCard({ pkg, renderStars, styles }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);
  const packageHref = `/sri-lanka-tour-packages/${pkg.slug || pkg.id}`;

  // Collect all images: cover + gallery + itinerary day images (capped at 8)
  const images = [
    pkg.coverImage || pkg.imageUrl,
    ...(pkg.galleryImages || []),
    ...(pkg.itinerary?.flatMap(day => day.images || []) || [])
  ].filter(Boolean).slice(0, 8);

  const handleMouseEnter = () => {
    if (images.length <= 1) return;
    isHoveredRef.current = true;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) return;
      idx = (idx + 1) % images.length;
      setCurrentImageIndex(idx);
    }, 700);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCardNavigation = (event) => {
    if (event.target.closest('a, button, input, textarea, select, label')) return;
    router.push(packageHref);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(packageHref);
    }
  };

  const handleTouchStart = () => {
    if (images.length <= 1) return;
    // Clear any previous touch cycle
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    isHoveredRef.current = true;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % images.length;
      setCurrentImageIndex(idx);
    }, 700);
    // Auto-stop after cycling through all images once (max 4s)
    const cycleDuration = Math.min(images.length * 700, 4000);
    touchTimeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
      isHoveredRef.current = false;
    }, cycleDuration);
  };

  const handleTouchEnd = () => {
    // Do not stop immediately — let the touch cycle run via touchTimeoutRef
  };

  return (
    <div
      className={styles.package_card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleCardNavigation}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`View package details for ${pkg.title || 'tour package'}`}
    >
      <div className={styles.package_image}>
        {images.length > 0 ? (
          <>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={i === 0 ? (pkg.title || 'Tour Package') : ''}
                className={`${styles.package_img_slide} ${i === currentImageIndex ? styles.package_img_active : ''}`}
              />
            ))}
            {images.length > 1 && (
              <div className={styles.image_dots}>
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.image_dot} ${i === currentImageIndex ? styles.image_dot_active : ''}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.placeholder_image}>
            <i className="fa-solid fa-image"></i>
          </div>
        )}
        {pkg.featured && <span className={styles.featured_badge}>Featured</span>}
      </div>
      <div className={styles.package_content}>
        <div className={styles.package_meta}>
          <span><i className="fa-solid fa-clock"></i> {typeof pkg.duration === 'object' ? pkg.duration?.days : pkg.duration || 'N/A'} Days</span>
          <span><i className="fa-solid fa-users"></i> {pkg.pax?.min || pkg.minPax || 2}-{pkg.pax?.max || pkg.maxPax || 12} Pax</span>
        </div>
        <h3 className={styles.package_title}>{pkg.title || 'Tour Package'}</h3>
        <p className={styles.package_description}>
          {pkg.description?.substring(0, 450) || 'Discover the beauty of Sri Lanka with this amazing tour package.'}
          {pkg.description?.length > 450 ? '...' : ''}
        </p>
        <div className={styles.package_rating}>
          {renderStars(pkg.rating || 4.5)}
          <span>{pkg.rating || 4.5}</span>
        </div>
        <div className={styles.package_footer}>
          <div className={styles.package_price}>
            <span className={styles.price}>${pkg.price || 899}</span>
            <span className={styles.per_person}>Starting From</span>
          </div>
          <Link href={packageHref} className={styles.view_button}>View Details</Link>
        </div>
      </div>
    </div>
  );
}

export default function TourPackages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [durationRange, setDurationRange] = useState([1, 30]);
  const [budgetRange, setBudgetRange] = useState([50, 5000]);

  // Filter options
  const tourTypes = ['Individual', 'Couple', 'Honeymoon', 'Family', 'Group', 'Corporate (MICE)'];
  const experiences = [
    'Beach & Coastal', 'Historical Sites', 'Cultural & Heritage',
    'Botanical Gardens/Parks', 'Hikes/Nature Trails', 'Safaris & Wildlife',
    'Adventures', 'Train Rides', 'Ayurveda & Wellness',
    'Festivals & Local Events', 'Food & Culinary'
  ];
  const travelPeriods = ['All Year Round', 'December–April (Dry season)', 'May–September (Dry season)'];

  // Fetch packages from Firebase
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packagesCollection = collection(db, 'packages');
        const packagesSnapshot = await getDocs(packagesCollection);
        const packagesList = packagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPackages(packagesList);
        setFilteredPackages(packagesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    const handleViewportChange = (event) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (isMobileView && isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
    }
  }, [isMobileView, isSidebarCollapsed]);

  // Apply filters
  useEffect(() => {
    let result = [...packages];

    if (selectedTourTypes.length > 0) {
      result = result.filter(pkg => {
        const pkgTypes = Array.isArray(pkg.tourType) ? pkg.tourType : [pkg.tourType].filter(Boolean);
        return selectedTourTypes.every(t => pkgTypes.includes(t));
      });
    }

    if (selectedExperiences.length > 0) {
      result = result.filter(pkg =>
        selectedExperiences.every(exp => pkg.experiences?.includes(exp))
      );
    }

    if (selectedPeriod.length > 0) {
      result = result.filter(pkg =>
        selectedPeriod.every(period => pkg.travelPeriod?.includes(period))
      );
    }

    result = result.filter(pkg => {
      // Handle both old format (number) and new format (object with days/nights)
      const duration = typeof pkg.duration === 'object' ? pkg.duration?.days : pkg.duration || 0;
      return duration >= durationRange[0] && duration <= durationRange[1];
    });

    result = result.filter(pkg => {
      const price = pkg.price || 0;
      return price >= budgetRange[0] && price <= budgetRange[1];
    });

    setFilteredPackages(result);
  }, [packages, selectedTourTypes, selectedExperiences, selectedPeriod, durationRange, budgetRange]);

  const handleCheckboxChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTourTypes([]);
    setSelectedExperiences([]);
    setSelectedPeriod([]);
    setDurationRange([1, 30]);
    setBudgetRange([50, 5000]);
  };

  const hasActiveFilters = selectedTourTypes.length > 0 ||
    selectedExperiences.length > 0 ||
    selectedPeriod.length > 0 ||
    durationRange[0] !== 1 ||
    durationRange[1] !== 30 ||
    budgetRange[0] !== 50 ||
    budgetRange[1] !== 5000;

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



      {/* Page Header */}
      <div className={styles.page_header}>
        <h1>SRI LANKA <span>TOUR PACKAGES</span></h1>
        <p>Discover our curated collection of unforgettable Sri Lankan experiences</p>
      </div>

      {/* Main Content */}
      <div className={styles.main_container}>
        {/* Filters Sidebar */}
        {(!isMobileView || isMobileFilterOpen) && (
        <>
        {isMobileView && (
          <div className={styles.mobile_filter_overlay} onClick={() => setIsMobileFilterOpen(false)} />
        )}
        <aside
          className={`${styles.filters_sidebar} ${isSidebarCollapsed ? styles.sidebar_collapsed : ''} ${isMobileView ? styles.mobile_filter_panel : ''}`}
          onClick={isSidebarCollapsed ? () => setIsSidebarCollapsed(false) : undefined}
        >
          {isSidebarCollapsed ? (
            <div className={styles.sidebar_collapsed_inner}>
              <i className="fa-solid fa-sliders"></i>
              <span className={styles.sidebar_collapsed_label}>Filters</span>
            </div>
          ) : (
            <>
          <div className={styles.filters_header}>
            <h2><i className="fa-solid fa-sliders"></i> Filters</h2>
            <div className={styles.filters_header_actions}>
              {hasActiveFilters && (
                <button className={styles.clear_filters} onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
              {!isMobileView && (
                <button
                  className={styles.hide_sidebar_btn}
                  onClick={() => setIsSidebarCollapsed(true)}
                  title="Hide filters"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              )}
              {isMobileView && (
                <button
                  className={styles.hide_sidebar_btn}
                  onClick={() => setIsMobileFilterOpen(false)}
                  title="Close filters"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          {/* Tour Type Filter */}
          <div className={styles.filter_group}>
            <h3>Tour Type</h3>
            <div className={styles.filter_options}>
              {tourTypes.map(type => (
                <label key={type} className={styles.checkbox_label}>
                  <input
                    type="checkbox"
                    checked={selectedTourTypes.includes(type)}
                    onChange={() => handleCheckboxChange(type, selectedTourTypes, setSelectedTourTypes)}
                  />
                  <span className={styles.checkmark}></span>
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Experiences Filter */}
          <div className={styles.filter_group}>
            <h3>Experiences</h3>
            <div className={styles.filter_options}>
              {experiences.map(exp => (
                <label key={exp} className={styles.checkbox_label}>
                  <input
                    type="checkbox"
                    checked={selectedExperiences.includes(exp)}
                    onChange={() => handleCheckboxChange(exp, selectedExperiences, setSelectedExperiences)}
                  />
                  <span className={styles.checkmark}></span>
                  {exp}
                </label>
              ))}
            </div>
          </div>

          {/* Travel Period Filter */}
          <div className={styles.filter_group}>
            <h3>Travel Period</h3>
            <div className={styles.filter_options}>
              {travelPeriods.map(period => (
                <label key={period} className={styles.checkbox_label}>
                  <input
                    type="checkbox"
                    checked={selectedPeriod.includes(period)}
                    onChange={() => handleCheckboxChange(period, selectedPeriod, setSelectedPeriod)}
                  />
                  <span className={styles.checkmark}></span>
                  {period}
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className={styles.filter_group}>
            <h3>Duration</h3>
            <div className={styles.slider_filter}>
              <div className={styles.slider_value_row}>
                <span className={styles.slider_value_badge}>{durationRange[0]} day{durationRange[0] !== 1 ? 's' : ''}</span>
                <span className={styles.slider_value_badge}>{durationRange[1]} days</span>
              </div>
              <div className={styles.dual_range_wrap}>
                <div
                  className={styles.range_track_fill}
                  style={{
                    left: `${((durationRange[0] - 1) / 29) * 100}%`,
                    width: `${((durationRange[1] - durationRange[0]) / 29) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="1" max="30" step="1"
                  value={durationRange[0]}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v <= durationRange[1]) setDurationRange([v, durationRange[1]]);
                  }}
                  className={styles.range_slider}
                />
                <input
                  type="range"
                  min="1" max="30" step="1"
                  value={durationRange[1]}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v >= durationRange[0]) setDurationRange([durationRange[0], v]);
                  }}
                  className={styles.range_slider}
                />
              </div>
              <div className={styles.slider_bounds}>
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>
          </div>

          {/* Budget Filter */}
          <div className={styles.filter_group}>
            <h3>Budget (USD)</h3>
            <div className={styles.slider_filter}>
              <div className={styles.slider_value_row}>
                <span className={styles.slider_value_badge}>${budgetRange[0].toLocaleString()}</span>
                <span className={styles.slider_value_badge}>${budgetRange[1].toLocaleString()}</span>
              </div>
              <div className={styles.dual_range_wrap}>
                <div
                  className={styles.range_track_fill}
                  style={{
                    left: `${((budgetRange[0] - 50) / 5000) * 100}%`,
                    width: `${((budgetRange[1] - budgetRange[0]) / 5000) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="50" max="5000" step="100"
                  value={budgetRange[0]}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v <= budgetRange[1]) setBudgetRange([v, budgetRange[1]]);
                  }}
                  className={styles.range_slider}
                />
                <input
                  type="range"
                  min="50" max="5000" step="100"
                  value={budgetRange[1]}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v >= budgetRange[0]) setBudgetRange([budgetRange[0], v]);
                  }}
                  className={styles.range_slider}
                />
              </div>
              <div className={styles.slider_bounds}>
                <span>$50</span>
                <span>$5,000</span>
              </div>
            </div>
          </div>
          </>
          )}
        </aside>
        </>
        )}

        {/* Mobile Filter Toggle Button */}
        {isMobileView && (
          <button className={styles.filter_toggle} onClick={() => setIsMobileFilterOpen(true)}>
            <i className="fa-solid fa-sliders"></i>
            Filters
            {hasActiveFilters && <span className={styles.filter_badge}></span>}
          </button>
        )}

        {/* Packages Grid */}
        <main className={styles.packages_main}>
          <div className={styles.results_header}>
            <p>{filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found</p>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>Loading packages...</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className={styles.no_results}>
              <i className="fa-solid fa-search"></i>
              <h3>No packages found</h3>
              <p>Try adjusting your filters to find more packages</p>
              <button onClick={clearAllFilters}>Clear All Filters</button>
            </div>
          ) : (
            <div className={styles.packages_grid}>
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} renderStars={renderStars} styles={styles} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
