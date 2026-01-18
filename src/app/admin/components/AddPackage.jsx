"use client";
import React, { useState } from "react";
import styles from "./AddPackage.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";

export default function AddPackage({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Basic Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tourType, setTourType] = useState("Round Tour");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [minPax, setMinPax] = useState("2");
  const [maxPax, setMaxPax] = useState("12");

  // Images
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Highlights/Themes
  const [highlights, setHighlights] = useState([""]);
  const [themes, setThemes] = useState([]);
  const availableThemes = ["Culture", "History", "Nature", "Wildlife", "Beach", "Adventure", "Wellness", "Food & Cuisine"];

  // Inclusions & Exclusions
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);

  // Itinerary
  const [itinerary, setItinerary] = useState([{
    dayNumber: 1,
    title: "",
    location: "",
    description: "",
    activities: [""],
    accommodation: "",
    meals: [],
    travelTime: "",
    images: [],
    imagePreviews: []
  }]);

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
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
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
      imagePreviews: []
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
    updated[dayIndex].images = updated[dayIndex].images.filter((_, i) => i !== imageIndex);
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

    try {
      console.log("Step 1: Starting package creation...");

      // Upload cover image
      let coverImageUrl = "";
      if (coverImage) {
        console.log("Step 2: Uploading cover image...");
        coverImageUrl = await uploadImage(
          coverImage,
          `packages/${Date.now()}_cover_${coverImage.name}`
        );
        console.log("Step 2: Cover image uploaded:", coverImageUrl);
      }

      // Upload gallery images
      console.log("Step 3: Uploading gallery images...");
      const galleryUrls = await Promise.all(
        galleryImages.map((file, index) =>
          uploadImage(file, `packages/${Date.now()}_gallery_${index}_${file.name}`)
        )
      );
      console.log("Step 3: Gallery images uploaded:", galleryUrls.length);

      // Upload itinerary images
      console.log("Step 4: Processing itinerary...");
      const itineraryWithUrls = await Promise.all(
        itinerary.map(async (day, dayIndex) => {
          const imageUrls = await Promise.all(
            day.images.map((file, imgIndex) =>
              uploadImage(file, `packages/${Date.now()}_day${dayIndex + 1}_${imgIndex}_${file.name}`)
            )
          );
          return {
            dayNumber: day.dayNumber,
            title: day.title,
            location: day.location,
            description: day.description,
            activities: day.activities.filter(a => a.trim() !== ""),
            accommodation: day.accommodation,
            meals: day.meals,
            travelTime: day.travelTime,
            images: imageUrls
          };
        })
      );
      console.log("Step 4: Itinerary processed");

      // Create package document
      const packageData = {
        title,
        description,
        tourType,
        duration: {
          days: parseInt(days),
          nights: parseInt(nights)
        },
        price: parseFloat(price),
        currency,
        pax: {
          min: parseInt(minPax),
          max: parseInt(maxPax)
        },
        coverImage: coverImageUrl,
        galleryImages: galleryUrls,
        highlights: highlights.filter(h => h.trim() !== ""),
        themes,
        inclusions: inclusions.filter(i => i.trim() !== ""),
        exclusions: exclusions.filter(e => e.trim() !== ""),
        itinerary: itineraryWithUrls,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log("Step 5: Saving to Firestore...", packageData);
      await addDoc(collection(db, "packages"), packageData);
      console.log("Step 6: Package created successfully!");

      onSuccess && onSuccess();
      onClose && onClose();
    } catch (error) {
      console.error("Error creating package:", error);
      console.error("Error details:", error.message, error.code);
      alert(`Error creating package: ${error.message}`);
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
          <h2>Add New Tour Package</h2>
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Tour Type</label>
                  <select value={tourType} onChange={(e) => setTourType(e.target.value)}>
                    <option value="Round Tour">Round Tour</option>
                    <option value="Day Excursion">Day Excursion</option>
                    <option value="Beach Holiday">Beach Holiday</option>
                    <option value="Wildlife Safari">Wildlife Safari</option>
                    <option value="Cultural Tour">Cultural Tour</option>
                    <option value="Adventure Tour">Adventure Tour</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Tailor Made">Tailor Made</option>
                  </select>
                </div>

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
                    <i className="fa fa-spinner fa-spin"></i> Creating...
                  </>
                ) : (
                  <>
                    <i className="fa fa-check"></i> Create Package
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
