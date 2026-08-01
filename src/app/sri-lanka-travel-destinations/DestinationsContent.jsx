"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import styles_1 from './navigation.module.css';
import styles_2 from './destinations_section.module.css';
import styles_9 from './footer_section.module.css';
import Link from 'next/link';

// Attraction / destination images ______________________________________________
import image_2 from "../../../public/Destinations_Image_1.webp";
import image_3 from "../../../public/Destinations_Image_2.webp";
import image_4 from "../../../public/Destinations_Image_3.webp";
import image_5 from "../../../public/Destinations_Image_4.webp";
import image_6 from "../../../public/Destinations_Image_5.webp";
import image_7 from "../../../public/Destinations_Image_6.webp";
import image_8 from "../../../public/Destinations_Image_7.webp";
import image_9 from "../../../public/Destinations_Image_8.webp";
import image_10 from "../../../public/Destinations_Image_9.webp";
import image_11 from "../../../public/Destinations_Image_10.webp";
import image_12 from "../../../public/Destinations_Image_11.webp";
import image_13 from "../../../public/Destinations_Image_12.webp";
import image_14 from "../../../public/Destinations_Image_17.webp";
import image_15 from "../../../public/Destinations_Image_18.webp";
import image_16 from "../../../public/Destinations_Image_19.webp";
import image_17 from "../../../public/Destinations_Image_20.webp";
import image_18 from "../../../public/Destinations_Image_21.webp";
import image_19 from "../../../public/Destinations_Image_22.webp";
import image_20 from "../../../public/SriLankan_Attractions.webp";
import image_21 from "../../../public/Destinations_Image_23.webp";
import image_22 from "../../../public/Destinations_Image_24.webp";
import image_23 from "../../../public/Destinations_Image_25.webp";
import image_24 from "../../../public/Destinations_Image_26.webp";
import image_25 from "../../../public/Destinations_Image_27.webp";
import image_26 from "../../../public/Destinations_Image_28.webp";
import image_27 from "../../../public/Destinations_Image_29.webp";
import image_28 from "../../../public/Destinations_Image_30.webp";
import image_29 from "../../../public/Destinations_Image_31.webp";
import image_30 from "../../../public/Destinations_Image_32.webp";
import image_31 from "../../../public/Destinations_Image_33.webp";
import image_32 from "../../../public/Destinations_Image_34.webp";
import image_33 from "../../../public/Destinations_Image_35.webp";
import image_34 from "../../../public/Destinations_Image_36.webp";
import image_35 from "../../../public/Destinations_Image_37.webp";
import image_36 from "../../../public/Destinations_Image_38.webp";
import image_37 from "../../../public/Destinations_Image_39.webp";
import image_38 from "../../../public/Destinations_Image_16.webp";
import image_39 from "../../../public/Destinations_Image_40.webp";
import image_40 from "../../../public/Destinations_Image_41.webp";
import image_41 from "../../../public/Destinations_Image_42.webp";
import image_42 from "../../../public/Destinations_Image_43.webp";
import image_43 from "../../../public/Destinations_Image_44.webp";
import image_44 from "../../../public/Destinations_Image_45.webp";
import image_45 from "../../../public/Destinations_Image_47.webp";
import image_46 from "../../../public/Destinations_Image_48.webp";
import image_47 from "../../../public/Destinations_Image_49.webp";
import image_48 from "../../../public/Destinations_Image_50.webp";
import image_49 from "../../../public/Destinations_Image_51.webp";
import image_50 from "../../../public/Destinations_Image_52.webp";
import image_51 from "../../../public/Destinations_Image_53.webp";
import image_52 from "../../../public/Destinations_Image_55.webp";
import image_53 from "../../../public/Destinations_Image_56.webp";
import image_54 from "../../../public/Destinations_Image_57.webp";
import image_55 from "../../../public/Destinations_Image_58.webp";
import image_56 from "../../../public/Destinations_Image_59.webp";
import image_57 from "../../../public/Destinations_Image_60.webp";
import image_58 from "../../../public/Destinations_Image_61.webp";
import useThemeToggle from '../lib/useThemeToggle';
import { FaTripadvisor } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
//  DESTINATIONS DATA
//  Every attraction now carries its own short description, used by the popup.
//  Add a new city by pushing another object into this array — the carousel,
//  map embed, and popup all wire themselves up automatically from this data.
// ─────────────────────────────────────────────────────────────────────────────
const DESTINATIONS = [
 {
  id: "galle",
  name: "GALLE",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63480.837541186236!2d80.17071117178111!3d6.055975343899013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1763042234517!5m2!1sen!2slk",
  description: "Discover Galle, a captivating coastal city where history meets tropical beauty. Explore the iconic Galle Fort, a UNESCO World Heritage Site filled with colonial charm, cobblestone streets, and ocean views. Enjoy golden beaches, boutique cafés, and vibrant culture along Sri Lanka's southern coast. Perfect for sightseeing, relaxation, and photography, Galle offers a unique blend of heritage and seaside tranquility — a must-visit destination for every traveler.",
  attractions: [
    {
      id: "galle-fort",
      image: image_6,
      name: "Galle Fort",
      description: "Step inside the historic Galle Fort, a magnificent UNESCO World Heritage Site where centuries of colonial history blend seamlessly with breathtaking coastal scenery. Originally built by the Portuguese in the 16th century and later fortified by the Dutch, the fortress features charming cobblestone streets, beautifully preserved colonial buildings, boutique hotels, cafés, museums, art galleries, and ancient churches. Walk along the oceanfront ramparts, admire spectacular sunsets over the Indian Ocean, and immerse yourself in one of Sri Lanka's most iconic cultural and architectural treasures."
    },
    {
      id: "jungle-beach",
      image: image_8,
      name: "Jungle Beach",
      description: "Hidden between lush tropical forest and rocky headlands, Jungle Beach is a peaceful escape just a few minutes from Galle Fort. Its calm turquoise waters are perfect for swimming and snorkeling, while the secluded atmosphere makes it ideal for relaxing away from busy tourist beaches. Surrounded by greenery and offering stunning coastal scenery, this hidden gem is perfect for nature lovers seeking tranquility."
    },
    {
      id: "hikkaduwa-beach",
      image: image_9,
      name: "Hikkaduwa Beach",
      description: "Hikkaduwa Beach is one of Sri Lanka's most vibrant coastal destinations, renowned for its golden sands, crystal-clear waters, colorful coral reefs, and lively atmosphere. Visitors can enjoy surfing, snorkeling, scuba diving, glass-bottom boat rides, and unforgettable sunsets. With beachfront restaurants, cafés, nightlife, and marine life including sea turtles, Hikkaduwa offers the perfect blend of relaxation and adventure."
    },
    {
      id: "unawatuna-beach",
      image: image_7,
      name: "Unawatuna Beach",
      description: "Unawatuna Beach is a beautiful palm-fringed bay famous for its calm turquoise waters, soft golden sand, and relaxed tropical atmosphere. Ideal for swimming throughout most of the year, the beach is lined with restaurants, cafés, boutique hotels, and beach bars. Visitors can also enjoy snorkeling, diving, paddleboarding, and spectacular sunsets, making Unawatuna one of Sri Lanka's most popular beach destinations."
    },
    {
      id: "thalpe-beach",
      image: image_14,
      name: "Thalpe Beach",
      description: "Thalpe Beach is a peaceful stretch of coastline known for its luxury boutique villas, natural rock pools, and uncrowded shoreline. Unlike busier beaches nearby, Thalpe offers a quiet atmosphere where visitors can relax beside the Indian Ocean while enjoying scenic coastal views. The famous natural swimming pools carved into the reef make this beach a unique destination for photography and relaxation."
    },
    {
      id: "kottawa-forest-reserve",
      image: image_15,
      name: "Kottawa Forest Reserve",
      description: "Kottawa Forest Reserve is a protected lowland rainforest rich in biodiversity and native wildlife. Elevated canopy walkways allow visitors to experience the forest from above while spotting colorful birds, butterflies, reptiles, and endemic plant species. The peaceful walking trails, dense tropical vegetation, and refreshing natural surroundings make it an excellent destination for eco-tourism and nature enthusiasts."
    },
  ],
},

{
  id: "nuwara-eliya",
  name: "NUWARA ELIYA",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63333.87737385!2d80.73936!3d6.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3067d75e3e4c5555%3A0x2b6a6f6f6f6f6f6f!2sNuwara%20Eliya!5e0!3m2!1sen!2slk!4v1763042234517!5m2!1sen!2slk",
  description: "Discover Nuwara Eliya, Sri Lanka's cool-climate hill station affectionately known as 'Little England.' Wander through rolling emerald tea estates, breathe in the crisp mountain air, and admire colonial-era architecture, manicured gardens, and misty lakes. From fragrant tea factories to scenic waterfalls and pine forests, Nuwara Eliya offers a refreshing escape into nature, history, and highland charm — a must-visit destination for every traveler.",
  attractions: [
    {
      id: "gregory-lake",
      image: image_46,
      name: "Gregory Lake",
      description: "Nestled in the heart of Nuwara Eliya, Gregory Lake is one of the region's most popular recreational attractions. Surrounded by misty mountains and beautifully landscaped gardens, the lake offers boating, kayaking, cycling, horse riding, and lakeside walking paths. The cool climate and scenic surroundings create the perfect setting for relaxing with family while enjoying spectacular highland views."
    },
    {
      id: "moon-plains",
      image: image_51,
      name: "Moon Plains",
      description: "Moon Plains is a breathtaking highland grassland offering panoramic views of Sri Lanka's central mountains. The journey includes scenic jeep rides through rolling meadows before reaching Mini World's End, where visitors can admire peaks such as Pidurutalagala, Kirigalpotta, and Great Western Mountain. Early mornings provide the clearest views and unforgettable photography opportunities."
    },
    {
      id: "horton-plains",
      image: image_49,
      name: "Horton Plains National Park",
      description: "A UNESCO World Heritage Site, Horton Plains National Park is a spectacular cloud forest and montane grassland ecosystem famous for World's End, Baker's Falls, and its unique biodiversity. Visitors can hike the scenic circular trail while encountering endemic wildlife, colorful birds, and breathtaking landscapes that make this one of Sri Lanka's finest nature experiences."
    },
    {
      id: "victoria-park",
      image: image_45,
      name: "Victoria Park",
      description: "Victoria Park is one of Sri Lanka's most beautifully maintained public gardens, showcasing colorful seasonal flowers, towering trees, ornamental shrubs, and peaceful walking paths. Originally established during the British colonial period, the park is also an excellent destination for birdwatching, offering sightings of several rare migratory and endemic bird species."
    },
    {
      id: "ambewela",
      image: image_48,
      name: "Ambewela",
      description: "Often referred to as 'Little New Zealand,' Ambewela is a picturesque farming region surrounded by rolling green hills and cool mountain air. Famous for its dairy farms, horse ranches, and endless grasslands, the area offers visitors beautiful countryside scenery and a peaceful escape into Sri Lanka's scenic hill country."
    },
    {
      id: "hakgala-botanical-garden",
      image: image_47,
      name: "Hakgala Botanical Garden",
      description: "Situated on the slopes of Hakgala Mountain, this historic botanical garden is the second largest in Sri Lanka and home to thousands of species of flowers, roses, orchids, ferns, and exotic plants. The cool climate allows vibrant seasonal blooms throughout the year, making it one of the country's most beautiful gardens for nature lovers and photographers."
    },
    {
      id: "bomburu-ella-waterfall",
      image: image_50,
      name: "Bomburu Ella Waterfall",
      description: "Bomburu Ella is Sri Lanka's widest waterfall, hidden within lush forests and tea plantations near Nuwara Eliya. A scenic hiking trail leads visitors through peaceful countryside before revealing multiple cascading streams flowing over rocky cliffs into natural pools below. Its untouched surroundings and tranquil atmosphere make it a rewarding destination for adventure seekers and nature enthusiasts."
    },
  ],
},
{
  id: "ella",
  name: "ELLA",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63333.87737385!2d81.0466!3d6.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4652b4b4b4b4b%3A0x2b6a6f6f6f6f6f6f!2sElla!5e0!3m2!1sen!2slk!4v1763042234517!5m2!1sen!2slk",
  description: "Discover Ella, a laid-back hill country haven cradled among misty mountains and emerald tea plantations. Famous for the iconic Nine Arch Bridge, breathtaking hikes to Little Adam's Peak and Ella Rock, and the world-renowned scenic train ride through rolling highlands, Ella is a favorite among backpackers and nature lovers alike. With its cool climate, cascading waterfalls, and relaxed village charm, Ella offers the perfect blend of adventure and tranquility in the heart of Sri Lanka's tea country.",
  attractions: [
    {
      id: "nine-arch-bridge",
      image: image_55,
      name: "Nine Arch Bridge",
      description: "The Nine Arch Bridge is one of Sri Lanka's most photographed landmarks, gracefully stretching across a lush green valley surrounded by tea plantations and tropical forest. Built entirely from stone and brick during the British colonial era without the use of steel, this architectural masterpiece showcases remarkable engineering and timeless beauty. Visitors often gather to witness the famous blue train crossing the bridge, creating one of the country's most iconic travel experiences and unforgettable photography opportunities."
    },
    {
      id: "little-adams-peak",
      image: image_52,
      name: "Little Adam's Peak",
      description: "Little Adam's Peak is one of Ella's most rewarding and accessible hiking destinations, offering spectacular panoramic views of rolling tea plantations, mist-covered mountains, and deep green valleys. The gentle trail winds through peaceful tea estates before reaching the summit, where visitors can enjoy breathtaking sunrise or sunset scenery. Perfect for hikers of all experience levels, this scenic viewpoint captures the natural beauty that makes Ella one of Sri Lanka's most beloved hill country destinations."
    },
    {
      id: "ella-rock",
      image: image_54,
      name: "Ella Rock",
      description: "Ella Rock is a challenging yet unforgettable hiking adventure leading through railway tracks, eucalyptus forests, and scenic tea plantations before reaching a dramatic mountain summit. The reward is a breathtaking 360-degree panorama of the Ella Gap, surrounding mountain ranges, waterfalls, and lush valleys stretching far into the distance. Ideal for adventure seekers and photography enthusiasts, the hike offers one of the finest viewpoints in Sri Lanka's hill country."
    },
    {
      id: "ravana-falls",
      image: image_53,
      name: "Ravana Falls",
      description: "Ravana Falls is one of Sri Lanka's most spectacular waterfalls, cascading down multiple rocky tiers amidst dense tropical greenery just outside Ella. According to ancient legend, the waterfall is connected to King Ravana from the Ramayana epic, adding cultural significance to its natural beauty. Easily accessible from the main road, it is a favorite stop for visitors looking to admire the scenery, enjoy the refreshing mountain atmosphere, and capture stunning photographs."
    },
    {
      id: "adisham-bungalow",
      image: image_56,
      name: "Adisham Bungalow",
      description: "Adisham Bungalow is a beautifully preserved English-style country mansion built during the British colonial era and now maintained as a Benedictine monastery. Surrounded by peaceful gardens, towering trees, and scenic mountain landscapes, the estate offers visitors a glimpse into Sri Lanka's colonial heritage and tea plantation history. Its elegant architecture, tranquil atmosphere, and homemade products make it a unique cultural attraction near Ella."
    },
    {
      id: "liptons-seat",
      image: image_57,
      name: "Lipton's Seat",
      description: "Lipton's Seat is a legendary viewpoint where Scottish tea pioneer Sir Thomas Lipton once stood to oversee his vast tea empire. Perched high above endless emerald tea plantations, the viewpoint offers breathtaking panoramic vistas across Sri Lanka's central highlands. The scenic drive or early morning hike to the summit provides unforgettable sunrise views, cool mountain air, and a fascinating insight into the history of world-famous Ceylon Tea."
    },
    {
      id: "rawana-cave",
      image: image_58,
      name: "Rawana Cave",
      description: "Rawana Cave is an ancient rock cave steeped in mythology and believed to have been one of King Ravana's legendary hideouts during the Ramayana period. Reached by climbing a series of stone steps through lush hillside vegetation, the cave features fascinating rock formations and cool natural chambers. Beyond its historical and cultural significance, the surrounding landscape offers impressive views of Ella's beautiful mountain scenery."
    },
  ],
},

{
  id: "kandy",
  name: "KANDY",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.41806474999!2d80.58449557380983!3d7.294628565342877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy!5e0!3m2!1sen!2slk!4v1763046530285!5m2!1sen!2slk",
  description: "Experience Kandy, Sri Lanka's scenic hill capital and a sacred city rich in culture and tradition. Home to the Temple of the Sacred Tooth Relic, this UNESCO World Heritage Site blends spiritual heritage with natural beauty. Surrounded by misty mountains, lush tea gardens, and the serene Kandy Lake, it's an ideal destination for culture lovers and nature enthusiasts alike. Discover traditional dance, vibrant festivals, and timeless charm in the heart of Sri Lanka.",
  attractions: [
    {
      id: "kandy-temple",
      image: image_10,
      name: "Kandy Temple",
      description: "The Temple of the Sacred Tooth Relic is Sri Lanka's most revered Buddhist shrine and one of the country's most important UNESCO World Heritage Sites. Believed to house the sacred tooth relic of Lord Buddha, the temple attracts thousands of pilgrims and visitors every year. Admire its beautifully decorated halls, golden roof, traditional Kandyan architecture, and daily religious ceremonies while experiencing the spiritual heart of Sri Lankan Buddhism."
    },
    {
      id: "peradeniya-botanical-garden",
      image: image_11,
      name: "Peradeniya Royal Botanical Garden",
      description: "The Royal Botanical Garden at Peradeniya is one of Asia's finest botanical gardens, covering over 147 acres of beautifully landscaped grounds. Home to thousands of exotic plants, orchids, towering palm avenues, giant bamboo groves, medicinal herbs, and flowering trees, it offers a peaceful escape into nature. Visitors can enjoy leisurely walks while discovering an extraordinary collection of tropical flora from around the world."
    },
    {
      id: "elephant-orphanage",
      image: image_13,
      name: "Elephant Orphanage",
      description: "The Pinnawala Elephant Orphanage provides a safe sanctuary for orphaned, injured, and rescued Asian elephants. Visitors have the unique opportunity to observe elephants being bottle-fed, roaming freely, and bathing together in the nearby river. The experience offers valuable insight into elephant conservation while creating unforgettable encounters with one of Sri Lanka's most iconic and beloved wildlife species."
    },
    {
      id: "ambuluwawa",
      image: image_12,
      name: "Ambuluwawa",
      description: "Ambuluwawa Biodiversity Complex is famous for its remarkable white spiral tower rising high above the surrounding mountains. Adventurous visitors can climb the narrow staircase to enjoy spectacular 360-degree panoramic views of Kandy, lush forests, distant mountain ranges, and surrounding valleys. The complex also promotes religious harmony with temples, churches, mosques, and shrines representing multiple faiths in one peaceful location."
    },
    {
      id: "bahirawakanda-temple",
      image: image_16,
      name: "Bahirawakanda Temple",
      description: "Bahirawakanda Temple is best known for its towering white Buddha statue that overlooks the city of Kandy from a peaceful hilltop. Visitors can climb to the temple for magnificent panoramic views of Kandy Lake, the Temple of the Tooth, and the surrounding mountain landscape. The calm atmosphere and stunning scenery make it an ideal location for both spiritual reflection and photography."
    },
    {
      id: "nelligala-temple",
      image: image_17,
      name: "Nelligala Temple",
      description: "Perched on a scenic mountain ridge, Nelligala International Buddhist Center is one of the most beautiful modern temples in Sri Lanka. The temple features a magnificent golden stupa, elegant statues, beautifully landscaped gardens, and breathtaking viewpoints overlooking the surrounding highlands. Visitors are rewarded with peaceful surroundings, cool mountain breezes, and unforgettable panoramic views of the Kandy countryside."
    },
  ],
},
{
  id: "dambulla",
  name: "DAMBULLA",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252936.28695222916!2d80.5343989678028!3d7.881518540860323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!5e0!3m2!1sen!2slk!4v1763054062512!5m2!1sen!2slk",
  description: "Experience the Dambulla–Sigiriya region, the cultural heart of Sri Lanka's ancient kingdom where history, nature, and wildlife come together. Home to the sacred Dambulla Cave Temple, this UNESCO World Heritage Site features stunning rock-carved shrines, ancient murals, and centuries-old Buddhist artistry. Nearby stands the majestic Sigiriya Rock Fortress, an iconic citadel rising dramatically above the plains with breathtaking views and rich archaeological significance. Surrounded by the rural charm of Habarana village, the adventurous Pidurangala Rock, and the wildlife-rich Minneriya National Park, this region offers a perfect blend of culture, adventure, and nature. Discover ancient heritage, unforgettable landscapes, and wild encounters in the heart of Sri Lanka's Cultural Triangle.",
  attractions: [
    {
      id: "dambulla-cave-temple",
      image: image_3,
      name: "Cave Temple",
      description: "The Dambulla Cave Temple, a UNESCO World Heritage Site, is the largest and best-preserved cave temple complex in Sri Lanka. Dating back over 2,000 years, the temple consists of five magnificent caves adorned with more than 150 Buddha statues, vibrant ancient murals, and beautifully preserved religious artwork. Carved into a massive granite rock overlooking the surrounding countryside, this sacred pilgrimage site offers visitors a fascinating journey through Sri Lanka's rich Buddhist heritage and remarkable architectural history."
    },
    {
      id: "sigiriya-fortress",
      image: image_2,
      name: "Sigiriya Fortress",
      description: "Rising nearly 200 meters above the surrounding plains, Sigiriya Rock Fortress is one of Sri Lanka's most iconic UNESCO World Heritage Sites. Built in the 5th century by King Kashyapa, this extraordinary royal citadel features beautifully landscaped water gardens, the famous Mirror Wall, ancient frescoes, and the impressive Lion's Gate. The climb to the summit rewards visitors with breathtaking panoramic views and an unforgettable journey through one of Asia's greatest archaeological masterpieces."
    },
    {
      id: "pidurangala-rock",
      image: image_5,
      name: "Pidurangala Rock",
      description: "Pidurangala Rock is one of Sri Lanka's most rewarding hiking destinations, offering spectacular panoramic views of Sigiriya Rock Fortress and the surrounding forests. The adventurous climb passes an ancient Buddhist temple, rocky stairways, and giant boulders before reaching a dramatic summit. Particularly popular at sunrise and sunset, Pidurangala provides one of the country's most breathtaking viewpoints and is a favorite among photographers and nature lovers."
    },
    {
      id: "minneriya",
      image: image_4,
      name: "Minneriya",
      description: "Minneriya National Park is internationally renowned for 'The Gathering,' one of the world's largest seasonal congregations of wild Asian elephants. During the dry season, hundreds of elephants gather around the ancient Minneriya Reservoir alongside deer, monkeys, crocodiles, and countless bird species. Jeep safaris through the park offer unforgettable wildlife encounters, making Minneriya one of Sri Lanka's premier safari destinations."
    },
    {
      id: "hiriwadunna-village",
      image: image_18,
      name: "Hiriwadunna Village",
      description: "Experience authentic rural life in Hiriwadunna Village, where traditional Sri Lankan customs have remained unchanged for generations. Visitors can enjoy bullock cart rides through peaceful countryside, catamaran rides across scenic lakes, walks through rice fields, and demonstrations of traditional cooking using locally grown ingredients. This immersive cultural experience offers a genuine glimpse into village life beyond the country's popular tourist attractions."
    },
    {
      id: "kaludiya-pokuna",
      image: image_19,
      name: "Kaludiya Pokuna",
      description: "Hidden within a tranquil forest, Kaludiya Pokuna is an ancient Buddhist monastery surrounded by fascinating archaeological ruins and a peaceful rock pool that gives the site its name. The serene atmosphere, centuries-old stone structures, and rich biodiversity make it an ideal destination for history enthusiasts, birdwatchers, and visitors seeking a quiet escape into Sri Lanka's cultural and natural heritage."
    },
  ],
},

{
  id: "polonnaruwa",
  name: "POLONNARUWA",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63225.99689403916!2d80.97197874238707!3d7.934196286263252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb44ba3b16ce27%3A0xc34997a2b3032b7c!2sPolonnaruwa!5e0!3m2!1sen!2slk!4v1779038774853!5m2!1sen!2slk",
  description: "Discover Polonnaruwa, one of Sri Lanka's most fascinating ancient kingdoms and a UNESCO World Heritage Site rich in history and archaeological wonders. Explore beautifully preserved ruins, ancient temples, royal palaces, massive stone Buddha statues, and intricate carvings that reflect the grandeur of Sri Lanka's medieval past. Surrounded by peaceful reservoirs and lush greenery, Polonnaruwa offers a unique blend of culture, heritage, and natural beauty, making it a must-visit destination for history lovers and cultural explorers.",
  attractions: [
    {
      id: "gal-vihara",
      image: image_21,
      name: "Gal Vihara",
      description: "Gal Vihara is one of the finest examples of ancient Sinhalese stone craftsmanship, featuring four magnificent Buddha statues carefully carved into a single granite rock face. Dating back to the 12th century during the reign of King Parakramabahu I, these remarkable sculptures display extraordinary artistic precision and spiritual significance. The peaceful surroundings and exceptional preservation make Gal Vihara one of Sri Lanka's most treasured archaeological monuments."
    },
    {
      id: "sacred-quadrangle",
      image: image_22,
      name: "The Sacred Quadrangle",
      description: "The Sacred Quadrangle is the spiritual heart of the ancient city of Polonnaruwa, containing some of its most impressive religious monuments within a compact archaeological complex. Visitors can admire beautifully preserved temples, intricately carved stone structures, moonstones, and shrines that demonstrate the architectural brilliance of Sri Lanka's medieval kingdom. Every corner reveals centuries of remarkable history and craftsmanship."
    },
    {
      id: "rankoth-vehera",
      image: image_23,
      name: "Rankoth Vehera",
      description: "Standing proudly above the ancient city, Rankoth Vehera is the largest stupa in Polonnaruwa and one of the most significant Buddhist monuments in Sri Lanka. Constructed during the reign of King Nissanka Malla, this enormous brick dagoba remains an active place of worship today. Visitors can walk around the impressive structure while appreciating its scale, peaceful surroundings, and deep religious significance."
    },
    {
      id: "lanka-thilaka-vihara",
      image: image_24,
      name: "Lanka Thilaka Vihara",
      description: "Lanka Thilaka Vihara is an impressive image house renowned for its towering brick walls and the remains of a colossal standing Buddha statue. Built during the golden age of Polonnaruwa, the temple showcases remarkable ancient engineering and intricate decorative carvings. Exploring its massive interior provides a fascinating insight into the architectural achievements of Sri Lanka's medieval Buddhist civilization."
    },
    {
      id: "aukana-buddha-statue",
      image: image_25,
      name: "Aukana Buddha Statue",
      description: "The Aukana Buddha Statue is one of Sri Lanka's most magnificent stone sculptures, standing gracefully at over 12 meters tall and carved from a single granite rock. Believed to date back to the 5th century, the statue is celebrated for its perfect proportions, detailed craftsmanship, and serene expression. It remains an important pilgrimage site and one of the country's greatest artistic masterpieces."
    },
    {
      id: "parakrama-samudra-lake",
      image: image_26,
      name: "Parakrama Samudra Lake",
      description: "Parakrama Samudra is a vast ancient reservoir created by King Parakramabahu I as part of an advanced irrigation system that transformed the surrounding region into fertile farmland. Today, the peaceful lake offers stunning waterside scenery, beautiful sunsets, abundant birdlife, and opportunities to appreciate the remarkable engineering achievements of Sri Lanka's ancient civilization while exploring the nearby archaeological city."
    },
  ],
},

  {
    id: "colombo",
    name: "COLOMBO",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.803921889186!2d79.81500564084803!3d6.921922085258426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1779120150007!5m2!1sen!2slk",
    description: "Explore Colombo, Sri Lanka's vibrant commercial capital where modern city life meets rich colonial heritage and coastal charm. From bustling markets and luxury shopping malls to historic landmarks, cultural temples, and scenic oceanfront views, Colombo offers a dynamic travel experience for every visitor. Discover lively streets, diverse cuisine, beautiful seaside promenades, and a blend of tradition and contemporary lifestyle in the heart of Sri Lanka's urban culture.",
    attractions: [
      { id: "red-mosque", image: image_27, name: "Red Mosque", description: "Also known as Jami-Ul-Alfar, this candy-striped red-and-white mosque is one of Colombo's most photographed landmarks." },
      { id: "gangarama-temple", image: image_28, name: "Gangarama Temple", description: "An eclectic Buddhist temple complex blending Sri Lankan, Thai, Indian, and Chinese architectural influences with a museum of artefacts." },
      { id: "lotus-tower", image: image_29, name: "Lotus Tower", description: "South Asia's tallest self-supported tower, offering observation decks with sweeping views over the capital's skyline." },
      { id: "independence-square", image: image_30, name: "Independence Square", description: "A grand memorial hall commemorating Sri Lanka's independence, set within landscaped gardens popular for evening walks." },
      { id: "pettah-market", image: image_31, name: "Pettah Local Market", description: "A bustling, chaotic bazaar of narrow streets and specialty markets selling everything from spices to electronics." },
      { id: "port-city", image: image_32, name: "Port City", description: "A modern waterfront development reclaimed from the sea, envisioned as Colombo's new financial and lifestyle district." },
      { id: "urban-wetland-park", image: image_33, name: "Urban Wetland Park", description: "A protected wetland sanctuary within the city offering boardwalk trails, birdwatching, and a rare green escape in Colombo." },
      { id: "viharamahadevi-park", image: image_34, name: "Viharamahadevi Park", description: "Colombo's oldest and largest park, featuring open lawns, a Buddha statue, and a small zoo near the city center." },
      { id: "one-galleface-mall", image: image_35, name: "One Galleface Mall", description: "A modern shopping and lifestyle destination on the Galle Face seafront, home to retail brands, dining, and entertainment." },
    ],
  },
  {
    id: "matara",
    name: "MATARA",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89792.13882122049!2d80.4884159873891!3d5.954808029750211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d151937cd9%3A0x1d711f45897009a3!2sMatara!5e0!3m2!1sen!2slk!4v1779731765100!5m2!1sen!2slk",
    description: "Discover Matara, a beautiful coastal city in southern Sri Lanka known for its golden beaches, rich history, and relaxed tropical atmosphere. From the historic Dutch Fort and ancient temples to stunning ocean views and vibrant local culture, Matara offers a perfect mix of heritage and seaside charm. Explore nearby surfing hotspots, peaceful lagoons, and scenic coastal landscapes while experiencing the authentic beauty of Sri Lanka's southern coastline.",
    attractions: [
      { id: "coconut-tree-hill", image: image_36, name: "Coconut Tree Hill", description: "A photogenic hillside of leaning coconut palms overlooking the ocean near Mirissa, a favorite sunset spot." },
      { id: "pegion-island", image: image_37, name: "Pegion Island", description: "A small marine sanctuary off the coast, popular for snorkeling among coral reefs and colorful reef fish." },
      { id: "mirissa-beach", image: image_38, name: "Mirissa Beach", description: "A crescent bay renowned for whale watching, surfing, and a laid-back beach scene along the southern coast." },
      { id: "weligama-port", image: image_39, name: "Weligama Port", description: "A working fishing harbor giving a glimpse of local coastal life alongside boats heading out to sea." },
      { id: "matara-beach", image: image_40, name: "Matara Beach", description: "A wide sandy beach in Matara town offering relaxed coastal views and easy access to the historic Dutch fort." },
      { id: "dondra-lighthouse", image: image_41, name: "Dondra Light House", description: "Sri Lanka's tallest lighthouse, marking the island's southernmost point with sweeping ocean views." },
      { id: "weligama-beach", image: image_42, name: "Weligama Beach", description: "A long, gentle bay famous for its beginner-friendly surf breaks and iconic stilt fishermen." },
      { id: "dikwella-beach", image: image_43, name: "Dikwella Beach", description: "A quieter southern beach known for its dramatic blowhole, Hoo-maniya Kanda, and relaxed coastal charm." },
      { id: "parrot-rock", image: image_44, name: "Parrot Rock", description: "A small rocky islet connected to Matara's Beach by a footbridge, offering coastal views and a peaceful lookout point." },
    ],
  },
];

// ── Attraction popup ──────────────────────────────────────────────────────────
function AttractionPopup({ attraction, onClose }) {
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
    <div className={styles_2.popup_overlay} onClick={onClose}>
      <div className={styles_2.popup_card} onClick={(e) => e.stopPropagation()}>
        <button className={styles_2.popup_close} onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className={styles_2.popup_image_col}>
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
        <div className={styles_2.popup_content_col}>
          <p className={styles_2.popup_category}>{attraction.cityName}</p>
          <h2 className={styles_2.popup_title}>{attraction.name}</h2>
          <div className={styles_2.popup_divider}></div>
          <p className={styles_2.popup_description}>{attraction.description}</p>
        </div>
      </div>
    </div>
  );
}

function DestinationsContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme, handleThemeToggle } = useThemeToggle();
  const [activeAttraction, setActiveAttraction] = useState(null);

  // Jump to the destinations from home page destination cards ____________________________________________________________________
  const searchParams = useSearchParams();

  useEffect(() => {
    const targetId = searchParams.get("scroll");

    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);

        if (element) {
          const elementTop = element.offsetTop;
          const windowHeight = window.innerHeight;

          const scrollTo =
            elementTop - windowHeight / 7;

          window.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, [searchParams]);

  //MAP View___________________________________________________________________________________________________________

  const [showMaps, setShowMaps] = useState(() => DESTINATIONS.map(() => false));

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
      {/*Navigation Section_____________________________________________________________________________*/}
      <Link href="/sri-lanka-travel-tips"><div className={styles_1.travel_tips}><h3>Travel Tips</h3><i className="fa fa-lightbulb"></i></div></Link>
      <div className={styles_1.navigation}>
        <Link href="/"><h2 className={styles_1.heading}>PELICAN TOURS</h2></Link>
        <ul className={styles_1.navigation_ul}>
          <li className={styles_1.navigation_desktop}><Link href="/"><h2>HOME</h2></Link></li>
          <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link></li>
          <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link></li>
          <li className={styles_1.navigation_desktop}><Link href="/sri-lanka-travel-destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link></li>
          <li className={styles_1.navigation_desktop}><Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link></li>
          <li onClick={handleThemeToggle} className={styles_1.theme_toggle}><i className={`fa ${isLightTheme ? "fa-toggle-on" : "fa-toggle-off"}`}></i></li>
          <li className={styles_1.navigation_mobile} onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa fa-bars"></i></li>
        </ul>

        {isMenuOpen && (
          <div className={`${styles_1.mobile_navigation_menu} ${styles_1.fadeInDown}`}>
            <Link href="/"><h2>HOME</h2></Link>
            <Link href="/sri-lanka-tour-packages"><h2>PACKAGES</h2></Link>
            <Link href="/sri-lanka-tour-services"><h2>SERVICES</h2></Link>
            <Link href="/sri-lanka-travel-destinations"><h2 id={styles_1.active}>DESTINATIONS</h2></Link>
            <Link href="/contact-sri-lanka-tour-agent"><h2>CONTACT</h2></Link>
          </div>
        )}
      </div>

      {/*Destination Section_____________________________________________________________________________*/}
      <div className={styles_2.destinatons_section}>
        <p className={styles_2.destinatons_section_description}>
          "Every destination below can be woven into your own{" "}
          <Link href="/">private Sri Lanka tour</Link> <br /> tell us where you want to go
          and we'll build the itinerary around it."
        </p>

        {DESTINATIONS.map((dest, destIndex) => (
          <div className={styles_2.destinaton} id={dest.id} key={dest.id}>
            <div className={styles_2.city}>
              <div className={`${styles_2.div_left} ${showMaps[destIndex] ? styles_2.show_map : ""}`}>
                <iframe
                  src={dest.mapSrc}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className={styles_2.div_right}>
                <h1 className={styles_2.city_name}>{dest.name}</h1>
                <p className={styles_2.city_description}>{dest.description}</p>

                <div className={styles_2.attraction_section}>
                  <h1 className={styles_2.sub_topic}>ATTRACTIONS IN {dest.name}</h1>

                  <div className={styles_2.attraction_section}>
                    <div className={styles_2.overlayers}>
                      <div className={styles_2.fade_overlay_right}></div>
                      <div className={styles_2.fade_overlay_left}></div>
                      <div className={styles_2.solid_right}></div>
                      <div className={styles_2.solid_left}></div>
                      <button className={`${styles_2.nav_arrow} ${styles_2.left}`} onClick={() => handleRightClick(destIndex)}>
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button className={`${styles_2.nav_arrow} ${styles_2.right}`} onClick={() => handleLeftClick(destIndex)}>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>

                    <div
                      className={styles_2.attraction_container}
                      ref={(el) => (containerRefs.current[destIndex] = el)}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd(destIndex)}
                    >
                      {dest.attractions.map((attraction) => (
                        <div
                          className={styles_2.attraction}
                          key={attraction.id}
                          onClick={() => setActiveAttraction({ ...attraction, cityName: dest.name })}
                        >
                          <Image src={attraction.image} alt={attraction.name} width={400} height={280} quality={75} placeholder="blur" loading="lazy" sizes="(max-width: 820px) 100vw, 25vw" />
                          <h2 className={styles_2.attraction_name}>{attraction.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className={styles_2.map_button} onClick={() => handleMapButtonClick(destIndex)}>VIEW MAP</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeAttraction && (
        <AttractionPopup attraction={activeAttraction} onClose={() => setActiveAttraction(null)} />
      )}

      {/*Footer Section_____________________________________________________________________________*/}
      <h2 className={styles_9.topic_text}><span style={{ color: "rgb(235, 130, 10)" }}>CONTACT</span> PELICAN TOURS</h2>
      <div className={styles_9.footer_section}>
        <div className={styles_9.footer_buttons}>
          <Link href="https://web.facebook.com/pelicantravels.lk" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_1}><i className="fa-brands fa-facebook"></i></button></Link>
          <Link href="https://www.linkedin.com/in/pelican-travels-and-tours-a35a45409?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_1}><i className="fa-brands fa-linkedin"></i></button></Link>
          <button className={styles_9.footer_button_2}><i className="fa-brands fa-instagram"></i></button>
          <Link href="https://www.tripadvisor.com/Attraction_Review-g293962-d17700816-Reviews-PELICAN_TRAVELS_SRI_LANKA-Colombo_Western_Province.html" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_3}><FaTripadvisor className={styles_9.tripadvisor_icon} /></button></Link>
          <Link href="https://wa.me/+94782436606" target="_blank" rel="noopener noreferrer"><button className={styles_9.footer_button_4}><i className="fa-brands fa-whatsapp"></i></button></Link>
        </div>

        <div className={styles_9.footer_phone_numbers}>
          <i className="fa-solid fa-phone"></i>
          <a href="https://wa.me/94764705440" target="_blank" rel="noopener noreferrer">+94764705440</a>
          <span> | </span>
          <a href="https://wa.me/94719015403" target="_blank" rel="noopener noreferrer">+94719015403</a>
        </div>

        <div className={styles_9.footer_email}>
          <i className="fa-solid fa-envelope"></i>
          <a href="mailto:hello@pelicantravelsandtours.com">
            hello@pelicantravelsandtours.com
          </a>
        </div>

        <div className={styles_9.footer_address}>
          <i className="fa-solid fa-location-dot"></i>
          <p>Dodangoda Toll Booth, Dodangoda Entrance, Kalutara</p>
        </div>

        <div className={styles_9.footer_bottomline}>
          <p>© 2026 Pelican Travels & Tours | All rights reserved</p>
          <p></p>
        </div>
        <Image src={image_20} alt="Sri Lankan Attractions" />
      </div>
    </>
  )
}

export default DestinationsContent
