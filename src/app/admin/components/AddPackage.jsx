"use client";
import React, { useState } from "react";
import styles from "./AddPackage.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import { generateSlug } from "../../lib/slugify";

export default function AddPackage({ onClose, onSuccess, editPackage }) {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Basic Info
  const [title, setTitle] = useState(editPackage?.title || "");
  const [description, setDescription] = useState(editPackage?.description || "");
  const [tourTypes, setTourTypes] = useState(() => {
    const t = editPackage?.tourType;
    if (!t) return [];
    return Array.isArray(t) ? t : [t];
  });
  const availableTourTypes = ["Individual", "Couple", "Honeymoon", "Family", "Group", "Corporate (MICE)"];
  const [days, setDays] = useState(editPackage?.duration?.days?.toString() || "");
  const [nights, setNights] = useState(editPackage?.duration?.nights?.toString() || "");
  const [price, setPrice] = useState(editPackage?.price?.toString() || "");
  const [currency, setCurrency] = useState(editPackage?.currency || "USD");
  const [minPax, setMinPax] = useState(editPackage?.pax?.min?.toString() || "2");
  const [maxPax, setMaxPax] = useState(editPackage?.pax?.max?.toString() || "12");

  // Filter fields
  const [experiences, setExperiences] = useState(editPackage?.experiences || []);
  const [travelPeriod, setTravelPeriod] = useState(editPackage?.travelPeriod || []);

  const availableExperiences = [
    'Beach & Coastal', 'Historical Sites', 'Cultural & Heritage',
    'Botanical Gardens/Parks', 'Hikes/Nature Trails', 'Safaris & Wildlife',
    'Adventures', 'Train Rides', 'Ayurveda & Wellness',
    'Festivals & Local Events', 'Food & Culinary'
  ];
  const availableTravelPeriods = [
    'All Year Round', 'December\u2013April (Dry season)', 'May\u2013September (Dry season)'
  ];

  // Images
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(editPackage?.coverImage || null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState(editPackage?.galleryImages || []);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState(editPackage?.galleryImages || []);

  // Highlights/Themes
  const [highlights, setHighlights] = useState(
    editPackage?.highlights?.length > 0 ? editPackage.highlights : [""]
  );
  const [themes, setThemes] = useState(editPackage?.themes || []);
  const availableThemes = ["Culture", "History", "Nature", "Wildlife", "Beach", "Adventure", "Wellness", "Food & Cuisine"];

  // Inclusions & Exclusions
  const [inclusions, setInclusions] = useState(
    editPackage?.inclusions?.length > 0 ? editPackage.inclusions : [""]
  );
  const [exclusions, setExclusions] = useState(
    editPackage?.exclusions?.length > 0 ? editPackage.exclusions : [""]
  );

  // Itinerary
  const [itinerary, setItinerary] = useState(
    editPackage?.itinerary?.length > 0
      ? editPackage.itinerary.map(day => ({
          ...day,
          activities: day.activities?.length > 0 ? day.activities : [""],
          meals: day.meals || [],
          images: [],
          imagePreviews: day.images || [],
          existingImages: day.images || []
        }))
      : [{
          dayNumber: 1, title: "", location: "", description: "",
          activities: [""], accommodation: "", meals: [],
          travelTime: "", images: [], imagePreviews: [], existingImages: []
        }]
  );

  const availableMeals = ["Breakfast", "Lunch", "Dinner"];

  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle gallery images upload
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...previews]);
  };

  const removeGalleryImage = (index) => {
    const existingCount = existingGalleryUrls.length;
    if (index < existingCount) {
      setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingCount;
      setGalleryImages(prev => prev.filter((_, i) => i !== newIndex));
    }
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle dynamic list inputs
  const addListItem = (setter, list) => {
    setter([...list, ""]);
  };

  const updateListItem = (setter, list, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setter(updated);
  };

  const removeListItem = (setter, list, index) => {
    if (list.length > 1) {
      setter(list.filter((_, i) => i !== index));
    }
  };

  // Handle themes toggle
  const toggleTheme = (theme) => {
    if (themes.includes(theme)) {
      setThemes(themes.filter(t => t !== theme));
    } else {
      setThemes([...themes, theme]);
    }
  };

  const toggleExperience = (exp) => {
    if (experiences.includes(exp)) {
      setExperiences(experiences.filter(e => e !== exp));
    } else {
      setExperiences([...experiences, exp]);
    }
  };

  const toggleTravelPeriod = (period) => {
    if (travelPeriod.includes(period)) {
      setTravelPeriod(travelPeriod.filter(p => p !== period));
    } else {
      setTravelPeriod([...travelPeriod, period]);
    }
  };

  const toggleTourType = (type) => {
    if (tourTypes.includes(type)) {
      setTourTypes(tourTypes.filter(t => t !== type));
    } else {
      setTourTypes([...tourTypes, type]);
    }
  };

  // Itinerary handlers
  const addItineraryDay = () => {
    setItinerary([...itinerary, {
      dayNumber: itinerary.length + 1,
      title: "",
      location: "",
      description: "",
      activities: [""],
      accommodation: "",
      meals: [],
      travelTime: "",
      images: [],
      imagePreviews: [],
      existingImages: []
    }]);
  };

  const updateItineraryDay = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const removeItineraryDay = (index) => {
    if (itinerary.length > 1) {
      const updated = itinerary.filter((_, i) => i !== index).map((day, i) => ({
        ...day,
        dayNumber: i + 1
      }));
      setItinerary(updated);
    }
  };

  const toggleMeal = (dayIndex, meal) => {
    const updated = [...itinerary];
    const meals = updated[dayIndex].meals;
    if (meals.includes(meal)) {
      updated[dayIndex].meals = meals.filter(m => m !== meal);
    } else {
      updated[dayIndex].meals = [...meals, meal];
    }
    setItinerary(updated);
  };

  const addActivity = (dayIndex) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push("");
    setItinerary(updated);
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[activityIndex] = value;
    setItinerary(updated);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updated = [...itinerary];
    if (updated[dayIndex].activities.length > 1) {
      updated[dayIndex].activities = updated[dayIndex].activities.filter((_, i) => i !== activityIndex);
      setItinerary(updated);
    }
  };

  const handleItineraryImages = (dayIndex, e) => {
    const files = Array.from(e.target.files);
    const updated = [...itinerary];
    updated[dayIndex].images = [...updated[dayIndex].images, ...files];
    updated[dayIndex].imagePreviews = [
      ...updated[dayIndex].imagePreviews,
      ...files.map(file => URL.createObjectURL(file))
    ];
    setItinerary(updated);
  };

  const removeItineraryImage = (dayIndex, imageIndex) => {
    const updated = [...itinerary];
    const existingCount = (updated[dayIndex].existingImages || []).length;
    if (imageIndex < existingCount) {
      updated[dayIndex].existingImages = updated[dayIndex].existingImages.filter((_, i) => i !== imageIndex);
    } else {
      const newIndex = imageIndex - existingCount;
      updated[dayIndex].images = updated[dayIndex].images.filter((_, i) => i !== newIndex);
    }
    updated[dayIndex].imagePreviews = updated[dayIndex].imagePreviews.filter((_, i) => i !== imageIndex);
    setItinerary(updated);
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Form submission
  const handleSubmit = async () => {
    setLoading(true);
    const isEditing = !!editPackage;

    try {
      // Upload cover image only if a new file was selected
      let coverImageUrl = coverImagePreview || "";
      if (coverImage) {
        coverImageUrl = await uploadImage(
          coverImage,
          `packages/${Date.now()}_cover_${coverImage.name}`
        );
      }

      // Upload only new gallery files, combine with remaining existing URLs
      const newGalleryUrls = await Promise.all(
        galleryImages.map((file, index) =>
          uploadImage(file, `packages/${Date.now()}_gallery_${index}_${file.name}`)
        )
      );
      const allGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls];

      // Process itinerary: upload only new images, keep existing
      const itineraryWithUrls = await Promise.all(
        itinerary.map(async (day, dayIndex) => {
          const newImageUrls = await Promise.all(
            day.images.map((file, imgIndex) =>
              uploadImage(file, `packages/${Date.now()}_day${dayIndex + 1}_${imgIndex}_${file.name}`)
            )
          );
          const allDayImages = [...(day.existingImages || []), ...newImageUrls];
          return {
            dayNumber: day.dayNumber,
            title: day.title,
            location: day.location,
            description: day.description,
            activities: day.activities.filter(a => a.trim() !== ""),
            accommodation: day.accommodation,
            meals: day.meals,
            travelTime: day.travelTime,
            images: allDayImages
          };
        })
      );

      const packageData = {
        title,
        slug: generateSlug(title),
        description,
        tourType: tourTypes,
        duration: { days: parseInt(days), nights: parseInt(nights) },
        price: parseFloat(price),
        currency,
        pax: { min: parseInt(minPax), max: parseInt(maxPax) },
        coverImage: coverImageUrl,
        galleryImages: allGalleryUrls,
        highlights: highlights.filter(h => h.trim() !== ""),
        themes,
        experiences,
        travelPeriod,
        inclusions: inclusions.filter(i => i.trim() !== ""),
        exclusions: exclusions.filter(e => e.trim() !== ""),
        itinerary: itineraryWithUrls,
        updatedAt: new Date()
      };

      if (isEditing) {
        const packageRef = doc(db, "packages", editPackage.id);
        await updateDoc(packageRef, packageData);
      } else {
        packageData.createdAt = new Date();
        await addDoc(collection(db, "packages"), packageData);
      }

      onSuccess && onSuccess();
      onClose && onClose();
    } catch (error) {
      console.error("Error saving package:", error);
      alert(`Error saving package: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Images" },
    { number: 3, title: "Details" },
    { number: 4, title: "Itinerary" }
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{editPackage ? "Edit Tour Package" : "Add New Tour Package"}</h2>
          <button type="button" onClick={onClose} className={styles.closeBtn}>
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Progress Steps */}
        <div className={styles.steps}>
          {steps.map((step) => (
            <div
              key={step.number}
              className={`${styles.step} ${activeStep >= step.number ? styles.activeStep : ""}`}
              onClick={() => setActiveStep(step.number)}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          {/* Step 1: Basic Info */}
          {activeStep === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.formGroup}>
                <label>Package Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., A 12-Day Island Adventure Awaits"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the tour package..."
                  rows={4}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tour Type</label>
                <div className={styles.themeTags}>
                  {availableTourTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.themeTag} ${tourTypes.includes(type) ? styles.activeTag : ""}`}
                      onClick={() => toggleTourType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Days *</label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="12"
                    min="1"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Nights *</label>
                  <input
                    type="number"
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    placeholder="11"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1900"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Currency</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="LKR">LKR (Rs)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Min Pax</label>
                  <input
                    type="number"
                    value={minPax}
                    onChange={(e) => setMinPax(e.target.value)}
                    placeholder="2"
                    min="1"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Max Pax</label>
                  <input
                    type="number"
                    value={maxPax}
                    onChange={(e) => setMaxPax(e.target.value)}
                    placeholder="12"
                    min="1"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Themes</label>
                <div className={styles.themeTags}>
                  {availableThemes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      className={`${styles.themeTag} ${themes.includes(theme) ? styles.activeTag : ""}`}
                      onClick={() => toggleTheme(theme)}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Experiences</label>
                <div className={styles.themeTags}>
                  {availableExperiences.map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      className={`${styles.themeTag} ${experiences.includes(exp) ? styles.activeTag : ""}`}
                      onClick={() => toggleExperience(exp)}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Travel Period</label>
                <div className={styles.themeTags}>
                  {availableTravelPeriods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      className={`${styles.themeTag} ${travelPeriod.includes(period) ? styles.activeTag : ""}`}
                      onClick={() => toggleTravelPeriod(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {activeStep === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.formGroup}>
                <label>Cover Image (for tour cards) *</label>
                <div className={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    id="coverImage"
                    className={styles.fileInput}
                  />
                  <label htmlFor="coverImage" className={styles.uploadLabel}>
                    <i className="fa fa-cloud-upload"></i>
                    <span>Click to upload cover image</span>
                  </label>
                </div>
                {coverImagePreview && (
                  <div className={styles.coverPreview}>
                    <img src={coverImagePreview} alt="Cover preview" />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview(null);
                      }}
                      className={styles.removeImage}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Gallery Images</label>
                <div className={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
                    id="galleryImages"
                    className={styles.fileInput}
                  />
                  <label htmlFor="galleryImages" className={styles.uploadLabel}>
                    <i className="fa fa-images"></i>
                    <span>Click to upload gallery images</span>
                  </label>
                </div>
                {galleryPreviews.length > 0 && (
                  <div className={styles.galleryGrid}>
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className={styles.galleryItem}>
                        <img src={preview} alt={`Gallery ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className={styles.removeImage}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {activeStep === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.formGroup}>
                <label>Highlights</label>
                {highlights.map((highlight, index) => (
                  <div key={index} className={styles.listInput}>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateListItem(setHighlights, highlights, index, e.target.value)}
                      placeholder="e.g., Visit ancient temples"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(setHighlights, highlights, index)}
                      className={styles.removeBtn}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(setHighlights, highlights)}
                  className={styles.addItemBtn}
                >
                  <i className="fa fa-plus"></i> Add Highlight
                </button>
              </div>

              <div className={styles.formGroup}>
                <label>Inclusions</label>
                {inclusions.map((inclusion, index) => (
                  <div key={index} className={styles.listInput}>
                    <input
                      type="text"
                      value={inclusion}
                      onChange={(e) => updateListItem(setInclusions, inclusions, index, e.target.value)}
                      placeholder="e.g., Airport pickup and drop-off"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(setInclusions, inclusions, index)}
                      className={styles.removeBtn}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(setInclusions, inclusions)}
                  className={styles.addItemBtn}
                >
                  <i className="fa fa-plus"></i> Add Inclusion
                </button>
              </div>

              <div className={styles.formGroup}>
                <label>Exclusions</label>
                {exclusions.map((exclusion, index) => (
                  <div key={index} className={styles.listInput}>
                    <input
                      type="text"
                      value={exclusion}
                      onChange={(e) => updateListItem(setExclusions, exclusions, index, e.target.value)}
                      placeholder="e.g., International flights"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(setExclusions, exclusions, index)}
                      className={styles.removeBtn}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(setExclusions, exclusions)}
                  className={styles.addItemBtn}
                >
                  <i className="fa fa-plus"></i> Add Exclusion
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Itinerary */}
          {activeStep === 4 && (
            <div className={styles.stepContent}>
              <div className={styles.itineraryList}>
                {itinerary.map((day, dayIndex) => (
                  <div key={dayIndex} className={styles.itineraryDay}>
                    <div className={styles.dayHeader}>
                      <h4>Day {day.dayNumber}</h4>
                      {itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(dayIndex)}
                          className={styles.removeDayBtn}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      )}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Title</label>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => updateItineraryDay(dayIndex, "title", e.target.value)}
                          placeholder="e.g., Arrival & Beach Relaxation"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Location</label>
                        <input
                          type="text"
                          value={day.location}
                          onChange={(e) => updateItineraryDay(dayIndex, "location", e.target.value)}
                          placeholder="e.g., Negombo"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Description</label>
                      <textarea
                        value={day.description}
                        onChange={(e) => updateItineraryDay(dayIndex, "description", e.target.value)}
                        placeholder="Describe what happens on this day..."
                        rows={3}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Activities</label>
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className={styles.listInput}>
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => updateActivity(dayIndex, actIndex, e.target.value)}
                            placeholder="e.g., Beach walk"
                          />
                          <button
                            type="button"
                            onClick={() => removeActivity(dayIndex, actIndex)}
                            className={styles.removeBtn}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addActivity(dayIndex)}
                        className={styles.addItemBtn}
                      >
                        <i className="fa fa-plus"></i> Add Activity
                      </button>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Accommodation</label>
                        <input
                          type="text"
                          value={day.accommodation}
                          onChange={(e) => updateItineraryDay(dayIndex, "accommodation", e.target.value)}
                          placeholder="e.g., Cinnamon Grand Hotel"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Travel Time</label>
                        <input
                          type="text"
                          value={day.travelTime}
                          onChange={(e) => updateItineraryDay(dayIndex, "travelTime", e.target.value)}
                          placeholder="e.g., 3 hours from previous location"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Meals Included</label>
                      <div className={styles.mealTags}>
                        {availableMeals.map((meal) => (
                          <button
                            key={meal}
                            type="button"
                            className={`${styles.mealTag} ${day.meals.includes(meal) ? styles.activeTag : ""}`}
                            onClick={() => toggleMeal(dayIndex, meal)}
                          >
                            {meal}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Day Images</label>
                      <div className={styles.imageUploadSmall}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleItineraryImages(dayIndex, e)}
                          id={`dayImages${dayIndex}`}
                          className={styles.fileInput}
                        />
                        <label htmlFor={`dayImages${dayIndex}`} className={styles.uploadLabelSmall}>
                          <i className="fa fa-camera"></i> Add Images
                        </label>
                      </div>
                      {day.imagePreviews.length > 0 && (
                        <div className={styles.dayImagesGrid}>
                          {day.imagePreviews.map((preview, imgIndex) => (
                            <div key={imgIndex} className={styles.dayImageItem}>
                              <img src={preview} alt={`Day ${day.dayNumber} - ${imgIndex + 1}`} />
                              <button
                                type="button"
                                onClick={() => removeItineraryImage(dayIndex, imgIndex)}
                                className={styles.removeImage}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addItineraryDay}
                className={styles.addDayBtn}
              >
                <i className="fa fa-plus"></i> Add Day
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.formActions}>
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className={styles.prevBtn}
              >
                <i className="fa fa-arrow-left"></i> Previous
              </button>
            )}

            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className={styles.nextBtn}
              >
                Next <i className="fa fa-arrow-right"></i>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fa fa-spinner fa-spin"></i> {editPackage ? "Saving..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <i className="fa fa-check"></i> {editPackage ? "Save Changes" : "Create Package"}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
