"use client";
import React, { useState, useEffect } from "react";
import styles_nav from '../navigation.module.css';
import styles from './tour_packages.module.css';
import Link from 'next/link';
import Image from "next/image";
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function TourPackages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [durationRange, setDurationRange] = useState([1, 30]);
  const [budgetRange, setBudgetRange] = useState([500, 5000]);

  // Filter options
  const tourTypes = ['Individual', 'Couple', 'Honeymoon', 'Family', 'Group', 'Corporate (MICE)'];
  const experiences = [
    'Beach & Coastal', 'Historical Sites', 'Cultural & Heritage',
    'Botanical Gardens/Parks', 'Hikes/Nature Trails', 'Safaris & Wildlife',
    'Adventures', 'Train Rides', 'Ayurveda & Wellness',
    'Festivals & Local Events', 'Food & Culinary'
  ];
  const travelPeriods = ['All Year Round', 'December–April (Dry season)', 'May–September (Dry season)'];

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

  // Apply filters
  useEffect(() => {
    let result = [...packages];

    if (selectedTourTypes.length > 0) {
      result = result.filter(pkg =>
        selectedTourTypes.includes(pkg.tourType)
      );
    }

    if (selectedExperiences.length > 0) {
      result = result.filter(pkg =>
        selectedExperiences.some(exp => pkg.experiences?.includes(exp))
      );
    }

    if (selectedPeriod.length > 0) {
      result = result.filter(pkg =>
        selectedPeriod.some(period => pkg.travelPeriod?.includes(period))
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
    setBudgetRange([500, 5000]);
  };

  const hasActiveFilters = selectedTourTypes.length > 0 ||
    selectedExperiences.length > 0 ||
    selectedPeriod.length > 0 ||
    durationRange[0] !== 1 ||
    durationRange[1] !== 30 ||
    budgetRange[0] !== 500 ||
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

      {/* Page Header */}
      <div className={styles.page_header}>
        <h1>SRI LANKA <span>TOUR PACKAGES</span></h1>
        <p>Discover our curated collection of unforgettable Sri Lankan experiences</p>
      </div>

      {/* Main Content */}
      <div className={styles.main_container}>
        {/* Mobile Filter Toggle */}
        <button
          className={styles.filter_toggle}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <i className="fa-solid fa-filter"></i>
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters && <span className={styles.filter_badge}></span>}
        </button>

        {/* Filters Sidebar */}
        <aside className={`${styles.filters_sidebar} ${isFilterOpen ? styles.filters_open : ''}`}>
          <div className={styles.filters_header}>
            <h2><i className="fa-solid fa-sliders"></i> Filters</h2>
            {hasActiveFilters && (
              <button className={styles.clear_filters} onClick={clearAllFilters}>
                Clear All
              </button>
            )}
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
            <div className={styles.range_filter}>
              <div className={styles.range_inputs}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={durationRange[0]}
                  onChange={(e) => setDurationRange([parseInt(e.target.value) || 1, durationRange[1]])}
                />
                <span>to</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={durationRange[1]}
                  onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value) || 30])}
                />
                <span>days</span>
              </div>
            </div>
          </div>

          {/* Budget Filter */}
          <div className={styles.filter_group}>
            <h3>Budget (USD)</h3>
            <div className={styles.range_filter}>
              <div className={styles.range_inputs}>
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={budgetRange[0]}
                  onChange={(e) => setBudgetRange([parseInt(e.target.value) || 0, budgetRange[1]])}
                />
                <span>to $</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={budgetRange[1]}
                  onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value) || 10000])}
                />
              </div>
            </div>
          </div>
        </aside>

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
                <div key={pkg.id} className={styles.package_card}>
                  <div className={styles.package_image}>
                    {(pkg.coverImage || pkg.imageUrl) ? (
                      <img src={pkg.coverImage || pkg.imageUrl} alt={pkg.title || 'Tour Package'} />
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
                        <span className={styles.per_person}>Per Person</span>
                      </div>
                      <Link href={`/tour-packages/${pkg.id}`} className={styles.view_button}>View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
