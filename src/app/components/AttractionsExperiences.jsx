"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from './attractionsexperiences.module.css';

// ─────────────────────────────────────────────────────────────────────────────
//  THINGS TO SEE — add your image imports here and set image: yourImport
//  e.g.  import img_tropical_beaches from "../../../public/attractions/tropical_beaches.jpg";
//  then  { id: "tropical-beaches", image: img_tropical_beaches, ... }
//
//  Until you replace them, each entry falls back to SriLankan_Attractions.png
// ─────────────────────────────────────────────────────────────────────────────
import fallbackImage from "../../../public/SriLankan_Attractions.png";

// ── Individual image imports (replace null with your import when ready) ───────
// THINGS TO SEE
import img_tropical_beaches    from "../../../public/things_to_see_4.jpg";
import img_national_parks      from "../../../public/things_to_see_3.jpg";
import img_rainforests         from "../../../public/things_to_see_9.jpg";
import img_waterfalls          from "../../../public/things_to_see_13.jpg";
import img_botanical_gardens   from "../../../public/things_to_see_11.jpg";
import img_sacred_places       from "../../../public/things_to_see_2.jpg";
import img_ancient_kingdoms    from "../../../public/things_to_see_5.jpg";
import img_museums             from "../../../public/things_to_see_14.png";
import img_tea_plantations     from "../../../public/things_to_see_1.jpg";
import img_mountains           from "../../../public/things_to_see_6.jpg";
import img_scenic_viewpoints   from "../../../public/things_to_see_7.jpg";
import img_lakes_rivers        from "../../../public/things_to_see_8.jpg";
import img_caves               from "../../../public/things_to_see_12.jpg";
import img_cities_towns        from "../../../public/things_to_see_10.jpg";
import img_colonial_buildings from "../../../public/things_to_see_15.jpg";
// THINGS TO DO
import img_train_rides         from "../../../public/things_to_do_7.jpg";
import img_wildlife_safaris    from "../../../public/things_to_do_3.jpg";
import img_whale_watching      from "../../../public/things_to_do_15.jpg";
import img_surfing             from "../../../public/things_to_do_8.jpg";
import img_water_sports        from "../../../public/things_to_do_17.jpg";
import img_scuba_diving        from "../../../public/things_to_do_18.jpg";
import img_hiking              from "../../../public/things_to_do_6.jpg";
import img_white_water_rafting from "../../../public/things_to_do_19.jpg";
import img_bird_watching       from "../../../public/things_to_do_5.jpg";
import img_cycling             from "../../../public/things_to_do_2.jpg";
import img_fishing             from "../../../public/things_to_do_11.jpg";
import img_camping             from "../../../public/things_to_do_13.jpg";
import img_cultural_festivals  from "../../../public/things_to_do_1.jpg";
import img_village_experiences from "../../../public/things_to_do_9.jpg";
import img_tea_estate_tours    from "../../../public/things_to_do_10.jpg";
import img_food_culinary       from "../../../public/things_to_do_4.jpg";
import img_cooking_classes     from "../../../public/things_to_do_12.jpg";
import img_ayurveda            from "../../../public/things_to_do_16.jpg";
import img_yoga                from "../../../public/things_to_do_14.jpg";
import img_nightlife           from "../../../public/things_to_do_20.webp";
import img_shopping           from "../../../public/things_to_do_21.jpg";


// ─────────────────────────────────────────────────────────────────────────────
const THINGS_TO_SEE = [
  { id: "tropical-beaches",   image: img_tropical_beaches,   title: "TROPICAL BEACHES",                        description: "Discover Sri Lanka's stunning tropical beaches stretching from golden sand shores in the south to palm-fringed bays in the east. Unwind at Mirissa, Unawatuna, Arugam Bay, and Pasikuda — each offering crystal-clear waters, vibrant sunsets, and serene coastal escapes perfect for relaxation, snorkelling, and unforgettable seaside moments." },
  { id: "national-parks",     image: img_national_parks,     title: "NATIONAL PARKS",                          description: "Explore Sri Lanka's legendary national parks, home to leopards, elephants, sloth bears, and exotic birdlife. Yala, Wilpattu, Udawalawe, and Minneriya offer thrilling wildlife encounters within diverse ecosystems ranging from dry scrublands to lush jungle reserves — some of Asia's most biodiverse protected wilderness areas." },
  { id: "rainforests",        image: img_rainforests,        title: "RAINFORESTS & FOREST RESERVES",           description: "Wander through ancient rainforests and biodiversity hotspots like Sinharaja, Knuckles, and Kanneliya. These UNESCO-listed and protected reserves shelter endemic species of flora and fauna found nowhere else on Earth, offering immersive eco-tourism experiences and extraordinary opportunities for nature photography and wildlife discovery." },
  { id: "waterfalls",         image: img_waterfalls,         title: "WATERFALLS",                              description: "Marvel at Sri Lanka's breathtaking waterfalls cascading through lush highland landscapes. From Bambarakanda — the island's tallest — to Diyaluma, Ravana Falls, and Laxapana, each waterfall offers a spectacular natural spectacle surrounded by scenic hill country beauty, creating perfect moments for photography and refreshing dips in natural pools." },
  { id: "botanical-gardens",  image: img_botanical_gardens,  title: "BOTANICAL GARDENS",                       description: "Stroll through world-class botanical gardens showcasing tropical flora, rare orchids, and towering trees. The Royal Botanic Gardens in Peradeniya and Hakgala Botanical Garden in Nuwara Eliya are must-visit attractions offering tranquil beauty and rich horticultural heritage spanning centuries of botanical research and conservation." },
  { id: "sacred-places",      image: img_sacred_places,      title: "SACRED PLACES & TEMPLES",                 description: "Experience Sri Lanka's profound spiritual heritage through sacred temples, ancient shrines, and pilgrimage sites. The Temple of the Tooth Relic in Kandy, Adam's Peak, Kataragama, and Kelaniya Raja Maha Viharaya are iconic landmarks of deep cultural and religious significance, attracting pilgrims and visitors from around the world." },
  { id: "ancient-kingdoms",   image: img_ancient_kingdoms,   title: "ANCIENT KINGDOMS & ARCHAEOLOGICAL SITES", description: "Step back in time at Sri Lanka's magnificent UNESCO World Heritage Sites. Explore the royal citadel of Sigiriya, ancient kingdoms of Anuradhapura and Polonnaruwa, and the cave temples of Dambulla — extraordinary archaeological treasures spanning over 2,500 years of remarkable civilization, artistry, and royal heritage." },
  { id: "museums",            image: img_museums,            title: "MUSEUMS",                                 description: "Discover Sri Lanka's rich history, culture, and natural heritage through world-class museums. The National Museum of Colombo, Dutch Period Museum in Galle, and Kandy National Museum house priceless artefacts, royal regalia, and exhibitions tracing the island's extraordinary past from prehistoric times through colonial eras to independence." },
  { id: "tea-plantations",    image: img_tea_plantations,    title: "TEA PLANTATIONS",                         description: "Journey through endless emerald tea estates blanketing Sri Lanka's misty central highlands. Explore iconic plantation regions in Nuwara Eliya, Ella, Haputale, and Dimbula — where you can visit working tea factories, learn about Ceylon Tea production, and savour freshly brewed cups with sweeping mountain views." },
  { id: "mountains",          image: img_mountains,          title: "MOUNTAINS & HILL COUNTRY",                description: "Discover Sri Lanka's dramatic mountain landscapes and cool highland retreats. The Central Highlands encompass Pidurutalagala — the island's highest peak — Horton Plains, Knuckles Range, and the misty valleys of Nuwara Eliya, offering spectacular scenery, refreshing alpine air, and exceptional trekking and sightseeing opportunities." },
  { id: "scenic-viewpoints",  image: img_scenic_viewpoints,  title: "SCENIC VIEWPOINTS",                       description: "Soak in panoramic vistas from Sri Lanka's most breathtaking viewpoints. World's End at Horton Plains, Ella Rock, Lipton's Seat, and Little Adam's Peak offer sweeping views of valleys, waterfalls, and rolling tea estates — creating unforgettable moments and extraordinary photography opportunities for every traveller." },
  { id: "lakes-rivers",       image: img_lakes_rivers,       title: "LAKES, RIVERS & LAGOONS",                 description: "Experience the serene beauty of Sri Lanka's lakes, rivers, and coastal lagoons. Kandy Lake, Nuwara Eliya Lake, Bolgoda, and the Madu River estuary offer scenic boat rides, birdwatching, and peaceful natural escapes amid lush tropical and highland surroundings throughout the year." },
  { id: "caves",              image: img_caves,              title: "CAVES & ROCK FORMATIONS",                 description: "Explore Sri Lanka's fascinating caves and dramatic rock formations shaped by millions of years of natural history. Dambulla Cave Temple, Pidurangala Rock, Pahiyangala, and Ritigala ruins offer extraordinary geological wonders and sacred cultural heritage set within stunning natural environments." },
  { id: "cities-towns",       image: img_cities_towns,       title: "CITIES & COASTAL TOWNS",                  description: "Discover the vibrant character of Sri Lanka's cities and charming coastal towns. From Colombo's cosmopolitan energy and Galle's Dutch colonial grandeur to the cultural heartland of Kandy and the heritage streets of Jaffna, each destination reveals a unique and captivating side of the island's rich history and living culture." },
  { id: "colonial-buildings", image: img_colonial_buildings, title: "COLONIAL ARCHITECTURE & HERITAGE BUILDINGS", description: "Explore Sri Lanka's remarkable colonial-era landmarks, from Dutch forts and British hill-country estates to historic churches, lighthouses, and government buildings that showcase centuries of Portuguese, Dutch, and British influence across the island."},
];

const THINGS_TO_DO = [
  { id: "scenic-train-rides",    image: img_train_rides,         title: "SCENIC TRAIN RIDES",             description: "Experience one of the world's most iconic railway journeys through Sri Lanka's breathtaking highlands. The Kandy to Ella train route winds through misty mountains, emerald tea estates, and ancient tunnels, offering spectacular views that have made it a legendary must-do and unforgettable highlight for every visitor to Sri Lanka." },
  { id: "wildlife-safaris",      image: img_wildlife_safaris,    title: "WILDLIFE SAFARIS",               description: "Embark on thrilling jeep safaris through Sri Lanka's premier national parks. Spot the world's highest density of leopards at Yala, vast elephant herds at Minneriya, sloth bears at Wilpattu, and diverse wildlife at Udawalawe — extraordinary encounters with majestic animals in their natural, unspoiled habitats." },
  { id: "whale-watching",        image: img_whale_watching,      title: "WHALE & DOLPHIN WATCHING",       description: "Set sail on unforgettable whale and dolphin watching excursions off Sri Lanka's southern coast. Mirissa and Trincomalee are world-renowned hotspots for blue whales — the largest animals on Earth — along with sperm whales, spinner dolphins, and playful pods in spectacular open ocean waters." },
  { id: "surfing",               image: img_surfing,             title: "SURFING",                        description: "Ride world-class waves at Sri Lanka's legendary surf spots. Arugam Bay on the east coast is renowned among global surfers for its consistent, powerful swells, while Hikkaduwa, Mirissa, and Weligama offer excellent breaks for all skill levels — from first-time beginners to seasoned wave riders." },
  { id: "water-sports",          image: img_water_sports,        title: "WATER SPORTS",                   description: "Enjoy a thrilling array of water sports along Sri Lanka's stunning coastline and inland waters. Kitesurfing at Kalpitiya, jet skiing at Bentota, windsurfing, banana boat rides, and kayaking offer non-stop aquatic adventure and excitement for travellers of all ages seeking unforgettable experiences." },
  { id: "scuba-diving",          image: img_scuba_diving,        title: "SCUBA DIVING & SNORKELING",      description: "Discover the vibrant underwater world of Sri Lanka's coral reefs and historic shipwrecks. Dive sites at Pigeon Island, Bar Reef, Hikkaduwa, and Trincomalee offer extraordinary encounters with colourful reef fish, sea turtles, rays, and rare marine life in crystal-clear tropical waters." },
  { id: "hiking",                image: img_hiking,              title: "HIKING & NATURE TRAILS",         description: "Trek through Sri Lanka's stunning highland landscapes and jungle trails. Hike to the summit of Ella Rock, Sri Pada (Adam's Peak), Knuckles Mountain Range, and World's End — rewarding trails leading to dramatic viewpoints, hidden waterfalls, and breathtaking panoramic vistas." },
  { id: "white-water-rafting",   image: img_white_water_rafting, title: "WHITE WATER RAFTING",            description: "Experience the adrenaline rush of white water rafting on Sri Lanka's Kelani and Mahaweli rivers. The rapids near Kitulgala offer exhilarating Grade III and IV whitewater challenges surrounded by lush tropical rainforest — one of the island's most thrilling adventure activities." },
  { id: "bird-watching",         image: img_bird_watching,       title: "BIRD WATCHING",                  description: "Sri Lanka is a world-class birdwatching destination with over 430 recorded species including 33 endemic birds. Sinharaja Rainforest, Bundala National Park, Victoria Reservoir, and Kumana offer exceptional birding experiences attracting enthusiasts from around the globe." },
  { id: "cycling",               image: img_cycling,             title: "CYCLING TOURS",                  description: "Explore Sri Lanka's diverse landscapes on two wheels through scenic cycling tours. Pedal through ancient cultural triangle ruins, rural village countryside, coastal roads, and lush paddy fields — immersive eco-friendly experiences that reveal the authentic beauty of the island at a personal pace." },
  { id: "fishing",               image: img_fishing,             title: "FISHING TRIPS",                  description: "Cast your line on memorable fishing excursions along Sri Lanka's coastline and inland waterways. Deep-sea fishing off Hikkaduwa and Mirissa offers marlin, tuna, and sailfish, while the iconic stilt fishing tradition at Koggala provides a uniquely cultural Sri Lankan experience." },
  { id: "camping",               image: img_camping,             title: "CAMPING",                        description: "Sleep under the stars in Sri Lanka's most stunning natural settings. Camp on the Horton Plains, beside jungle streams in Knuckles, near wildlife-rich national parks, or along pristine beaches — immersive overnight experiences that connect you deeply with the island's extraordinary natural environment." },
  { id: "cultural-festivals",    image: img_cultural_festivals,  title: "CULTURAL FESTIVALS & EVENTS",    description: "Immerse yourself in the vibrant colour and tradition of Sri Lanka's cultural festivals. The Kandy Esala Perahera, Vesak Poya celebrations, Duruthu Perahera, and colourful Hindu Kovil festivals offer extraordinary spectacles of music, dance, illuminated processions, and centuries-old ritual traditions." },
  { id: "village-experiences",   image: img_village_experiences, title: "VILLAGE EXPERIENCES",            description: "Discover authentic rural Sri Lanka through immersive village experiences. Visit traditional farming communities, join local families for home-cooked meals, observe age-old crafts like pottery and weaving, and experience the warm hospitality of the island's countryside — a genuine window into Sri Lankan life." },
  { id: "tea-estate-tours",      image: img_tea_estate_tours,    title: "TEA ESTATE TOURS",               description: "Go behind the scenes of Sri Lanka's world-famous Ceylon Tea industry with guided estate tours. Walk the tea fields alongside pickers, tour historic factories, learn the production process from leaf to cup, and sample fresh brews at historic plantation bungalows in the cool highlands." },
  { id: "food-culinary",         image: img_food_culinary,       title: "FOOD & CULINARY EXPERIENCES",    description: "Savour the bold and aromatic flavours of authentic Sri Lankan cuisine on food tours and culinary journeys. From spicy rice and curry spreads and fresh coastal seafood to street food markets in Colombo — every meal celebrates the island's rich culinary heritage and tropical ingredients." },
  { id: "cooking-classes",       image: img_cooking_classes,     title: "COOKING CLASSES",                description: "Learn to prepare authentic Sri Lankan dishes with hands-on cooking classes led by local chefs and home cooks. Master the art of curry pastes, coconut gravies, hoppers, and kottu — taking home skills and recipes to recreate the unforgettable flavours of Sri Lanka long after your journey ends." },
  { id: "ayurveda",              image: img_ayurveda,            title: "AYURVEDA & WELLNESS TREATMENTS", description: "Rejuvenate mind, body, and spirit with traditional Ayurvedic wellness treatments at Sri Lanka's renowned retreat centres. From therapeutic herbal oil massages and Shirodhara treatments to personalised detox programmes, the island offers authentic healing rooted in thousands of years of ancient wisdom." },
  { id: "yoga",                  image: img_yoga,                title: "YOGA RETREATS",                  description: "Find inner peace at Sri Lanka's serene yoga retreats set amid breathtaking natural landscapes. Practice sunrise yoga overlooking misty mountains in Ella, meditate beside the ocean in Mirissa, or join immersive residential retreats blending yoga, meditation, Ayurveda, and mindful living in paradise." },
  { id: "nightlife",             image: img_nightlife,           title: "NIGHTLIFE & ENTERTAINMENT",      description: "Experience Sri Lanka's vibrant nightlife and entertainment scene. Colombo's cosmopolitan bars, rooftop lounges, live music venues, and beach clubs in Hikkaduwa and Arugam Bay offer lively after-dark experiences from cocktails with ocean views to energetic live performances and cultural shows." },
  { id: "shopping",              image: img_shopping,            title: "SHOPPING & SOUVENIR HUNTING",    description: "Explore vibrant markets, artisan workshops, and stylish shopping districts across Sri Lanka. Shop for world-renowned Ceylon Tea, precious gemstones, spices, batik clothing, handcrafted wooden masks, jewellery, and authentic local souvenirs. From bustling city malls in Colombo to traditional craft centres and street markets, shopping in Sri Lanka offers a unique blend of culture, craftsmanship, and discovery."},
];

const ALL_ITEMS = [...THINGS_TO_SEE, ...THINGS_TO_DO];

// ── Popup Modal ────────────────────────────────────────────────────────────────
function CardPopup({ item, onClose }) {
  const category = THINGS_TO_SEE.find(i => i.id === item.id) ? "THINGS TO SEE" : "THINGS TO DO";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className={styles.popup_overlay} onClick={onClose}>
      <div className={styles.popup_card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.popup_close} onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className={styles.popup_image_col}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
        <div className={styles.popup_content_col}>
          <p className={styles.popup_category}>{category}</p>
          <h2 className={styles.popup_title}>{item.title}</h2>
          <div className={styles.popup_divider}></div>
          <p className={styles.popup_description}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Single Carousel ────────────────────────────────────────────────────────────
function Carousel({ items, label, onCardClick }) {
  const containerRef  = useRef(null);
  const isAnimating   = useRef(false);
  const startX        = useRef(0);
  const currentX      = useRef(0);
  const isSwiping     = useRef(false);

  const getCardStep = () => {
    const c = containerRef.current;
    if (!c || !c.children[0]) return 0;
    return c.children[0].offsetWidth + 16;
  };

  const slideNext = useCallback(() => {
    const c = containerRef.current;
    if (isAnimating.current || !c) return;
    const first = c.children[0];
    const step  = getCardStep();
    isAnimating.current = true;
    c.style.transition = "none";
    c.style.transform  = "translateX(0)";
    c.offsetHeight;
    c.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
    c.style.transform  = `translateX(-${step}px)`;
    setTimeout(() => {
      c.appendChild(first);
      c.style.transition = "none";
      c.style.transform  = "translateX(0)";
      isAnimating.current = false;
    }, 450);
  }, []);

  const slidePrev = useCallback(() => {
    const c = containerRef.current;
    if (isAnimating.current || !c) return;
    const last = c.lastElementChild;
    const step = getCardStep();
    isAnimating.current = true;
    c.insertBefore(last, c.firstChild);
    c.style.transition = "none";
    c.style.transform  = `translateX(-${step}px)`;
    c.offsetHeight;
    requestAnimationFrame(() => {
      c.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
      c.style.transform  = "translateX(0)";
    });
    setTimeout(() => { isAnimating.current = false; }, 450);
  }, []);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; isSwiping.current = false; };
  const handleTouchMove  = (e) => { currentX.current = e.touches[0].clientX; if (Math.abs(startX.current - currentX.current) > 15) isSwiping.current = true; };
  const handleTouchEnd   = () => {
    if (!isSwiping.current) return;
    const diff = startX.current - currentX.current;
    if (Math.abs(diff) < 50) return;
    diff > 0 ? slideNext() : slidePrev();
  };

  return (
    <div className={styles.carousel_block}>
      <h3 className={styles.sub_heading}>{label}</h3>
      <div className={styles.carousel_wrapper} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className={styles.overlayers}>
          <div className={styles.solid_left}></div>
          <div className={styles.fade_overlay_left}></div>
          <div className={styles.fade_overlay_right}></div>
          <div className={styles.solid_right}></div>
          <button className={`${styles.nav_arrow} ${styles.left}`}  onClick={slidePrev} aria-label="Previous">←</button>
          <button className={`${styles.nav_arrow} ${styles.right}`} onClick={slideNext} aria-label="Next">→</button>
        </div>

        <div className={styles.cards_container} ref={containerRef}>
          {items.map((item) => (
            <div key={item.id} className={styles.card} onClick={() => onCardClick(item)}>
              <div className={styles.card_image}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="310px"
                />
              </div>
              <div className={styles.card_details}>
                <div className={styles.card_details_sub}>
                <h2 className={styles.card_title}>{item.title}</h2>
                <p className={styles.card_description}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function AttractionsExperiences() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className={styles.section_wrapper}>

      <p className={styles.section_description}>
        Sri Lanka is one of Asia's most diverse and rewarding travel destinations, offering an extraordinary range of attractions and experiences within a compact island. Explore ancient UNESCO World Heritage Sites, pristine tropical beaches, lush rainforests, and mist-covered tea plantations — then dive deeper with thrilling wildlife safaris, scenic highland train rides, whale watching excursions, surfing, Ayurvedic wellness retreats, and authentic village encounters. Whether you are visiting Sri Lanka for the first time or returning to discover more, every corner of the island reveals a unique and unforgettable experience waiting to be explored.
      </p>

      <Carousel items={THINGS_TO_SEE} label="THINGS TO SEE" onCardClick={setActiveCard} />
      <Carousel items={THINGS_TO_DO}  label="THINGS TO DO"  onCardClick={setActiveCard} />

      {activeCard && (
        <CardPopup item={activeCard} onClose={() => setActiveCard(null)} />
      )}

    </div>
  );
}