"use client";
import React from "react";
import styles from './food.module.css';
import Image from "next/image";

// Images for "What Travelers Should Know About Sri Lankan Food" — replace with your actual files
import know_1 from "../../../public/sl_food_2.webp";
import know_2 from "../../../public/sl_food_1.webp";
import know_3 from "../../../public/sl_food_4.webp";
import know_4 from "../../../public/sl_food_3.webp";
import know_5 from "../../../public/sl_food_5.webp";
import know_6 from "../../../public/sl_food_6.webp";

// Images for "Popular Sri Lankan Dishes to Try" — replace with your actual files
import dish_1 from "../../../public/food_to_try_2.webp";
import dish_2 from "../../../public/food_to_try_3.webp";
import dish_3 from "../../../public/food_to_try_1.webp";
import dish_5 from "../../../public/food_to_try_4.webp";
import dish_6 from "../../../public/food_to_try_5.webp";
import dish_7 from "../../../public/food_to_try_6.webp";
import dish_8 from "../../../public/food_to_try_7.webp";
import dish_9 from "../../../public/food_to_try_8.webp";
import dish_10 from "../../../public/food_to_try_9.webp";
import dish_11 from "../../../public/food_to_try_10.webp";

function Food() {

  const knowItems = [
    {
      image: know_1,
      title: "Expect Bold Flavors and Spices",
      text: "Sri Lankan cuisine is known for its rich flavors, fragrant spices, and coconut-based dishes. While many local foods are mildly spiced, some traditional curries and sambols can be quite hot by international standards. If you prefer less spice, simply ask for \"less spicy\" when ordering.",
    },
    {
      image: know_2,
      title: "Rice and Curry Is More Than One Dish",
      text: "Unlike a single curry meal found elsewhere, a Sri Lankan rice and curry typically includes rice served with several curries, vegetables, sambols, and optional meat or seafood, creating a diverse and flavorful dining experience.",
    },
    {
      image: know_3,
      title: "Fresh Seafood Is Widely Available",
      text: "Coastal regions offer an excellent selection of freshly caught fish, prawns, crab, squid, and lobster. Seafood restaurants are especially popular in beach destinations along the southern, western, and eastern coasts.",
    },
    {
      image: know_4,
      title: "Vegetarian Options Are Common",
      text: "Many Sri Lankan dishes are naturally vegetarian. Lentils, jackfruit, breadfruit, eggplant, pumpkin, and various leafy greens are commonly used in local cooking, making vegetarian dining easy throughout the country.",
    },
    {
      image: know_5,
      title: "International Cuisine Is Readily Available",
      text: "Major tourist destinations such as Colombo, Kandy, Galle, Negombo, and Ella offer a wide variety of international restaurants serving Western, Indian, Chinese, Japanese, Middle Eastern, and fusion cuisine.",
    },
    {
      image: know_6,
      title: "Street Food Is Worth Trying",
      text: "Street food is widely available across Sri Lanka, offering authentic local flavors such as kottu roti, isso wade, roti varieties, short eats, and tropical fruits. Travelers are advised to choose busy vendors that prepare food fresh and maintain good hygiene standards.",
    },
  ];

  const dishes = [
    { image: dish_1, name: "Hoppers", text: "Bowl-shaped rice pancakes with a crisp edge and soft, spongy center, often served with an egg cracked into the middle." },
    { image: dish_2, name: "String Hoppers", text: "Delicate steamed rice noodle nests, typically paired with curry and sambol for breakfast or dinner." },
    { image: dish_3, name: "Kottu Roti", text: "Chopped roti stir-fried with vegetables, egg, and your choice of meat or seafood, a popular street food favorite." },
    { image: know_2, name: "Rice and Curry", text: "The island's staple meal, rice served with an array of curries, vegetables, and sambols." },
    { image: dish_5, name: "Fish Curry", text: "Fresh fish simmered in a fragrant, spiced coconut-milk gravy." },
    { image: dish_6, name: "Crab Curry", text: "Whole crab cooked in a rich, spicy curry sauce, a coastal specialty." },
    { image: dish_7, name: "Lamprais", text: "Rice, meat curry, and accompaniments baked together in a banana leaf parcel, a Dutch Burgher classic." },
    { image: dish_8, name: "Pittu", text: "Steamed cylinders of rice flour and grated coconut, usually eaten with curry or coconut milk." },
    { image: dish_9, name: "Pol Sambol", text: "A fresh relish of grated coconut, chili, lime, and onion that accompanies almost every Sri Lankan meal." },
    { image: dish_10, name: "Watalappan", text: "A traditional steamed coconut custard dessert, sweetened with jaggery and spiced with cardamom." },
    { image: dish_11, name: "Curd and Treacle", text: "Creamy buffalo curd drizzled with golden kithul treacle, a simple and beloved dessert." },
  ];

  const costRows = [
    { type: "Street Food", cost: "USD 1–3" },
    { type: "Local Restaurant Meal", cost: "USD 2–8" },
    { type: "Mid-Range Restaurant", cost: "USD 8–20" },
    { type: "Seafood Restaurant", cost: "USD 10–30" },
    { type: "Fine Dining Restaurant", cost: "USD 20–60+" },
    { type: "Coffee", cost: "USD 1–4" },
    { type: "Bottled Water", cost: "Less than USD 1" },
  ];

  const quickTips = [
    "Try local cuisine at least once during your trip.",
    "Carry some cash when visiting smaller eateries.",
    "Ask for less spice if preferred.",
    "Bottled water is widely available.",
    "Vegetarian options are plentiful.",
    "Seafood lovers will find excellent choices along the coast.",
    "International cuisine is available in most major tourist destinations.",
    "Food is generally affordable and accessible throughout the island.",
  ];

  return (
    <div className={styles.food_container}>

      <p className={styles.food_intro}>
        Sri Lanka offers a rich culinary experience shaped by centuries of cultural influences and an
        abundance of fresh local ingredients. Rice and curry form the foundation of daily meals,
        accompanied by a variety of vegetables, seafood, meats, sambols, and aromatic spices. Travelers
        can enjoy everything from traditional village cuisine and street food to contemporary restaurants
        and international dining options.
      </p>

      {/* What Travelers Should Know____________________________________ */}
      <h4 className={styles.food_subheading}>What Travelers Should Know About Sri Lankan Food</h4>
      <div className={styles.know_list}>
        {knowItems.map((item, index) => (
          <div className={styles.know_item} key={index}>
            <div className={styles.know_item_image}>
              <Image src={item.image} alt={item.title} />
            </div>
            <div className={styles.know_item_description}>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Food Accessibility____________________________________ */}
      <h4 className={styles.food_subheading}>Food Accessibility</h4>
      <p>One of the advantages of traveling in Sri Lanka is the widespread availability of food.</p>

      <div className={styles.access_grid}>
        <div className={styles.access_block}>
          <h5>Restaurants and Cafés</h5>
          <ul>
            <li>Luxury hotel restaurants</li>
            <li>Fine dining establishments</li>
            <li>Family restaurants</li>
            <li>Beachfront cafés</li>
            <li>Local eateries</li>
            <li>Street food vendors</li>
            <li>Food courts in major cities</li>
          </ul>
          <p>Food outlets are available in nearly every town and tourist destination.</p>
        </div>

        <div className={styles.access_block}>
          <h5>Dietary Requirements</h5>
          <ul>
            <li>Vegetarian diets</li>
            <li>Vegan diets</li>
            <li>Gluten-free requests</li>
            <li>Dairy-free options</li>
            <li>Seafood-based diets</li>
          </ul>
          <p>Travelers with severe food allergies should clearly communicate their dietary requirements, particularly in smaller local restaurants where ingredient labeling may be limited.</p>
        </div>
      </div>

      <h5 className={styles.food_minorheading}>Drinking Water</h5>
      <p>
        Bottled drinking water is widely available throughout Sri Lanka and is inexpensive. Visitors are
        generally advised to drink bottled or properly filtered water rather than untreated tap water.
      </p>

      {/* Popular Dishes____________________________________ */}
      <h4 className={styles.food_subheading}>Popular Sri Lankan Dishes to Try</h4>
      <div className={styles.dish_list}>
        {dishes.map((dish, index) => (
          <div className={styles.dish_item} key={index}>
            <div className={styles.dish_item_image}>
              <Image src={dish.image} alt={dish.name} />
            </div>
            <div className={styles.dish_item_description}>
              <h5>{dish.name}</h5>
              <p>{dish.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p>These dishes offer an excellent introduction to Sri Lanka's culinary heritage.</p>

      {/* Typical Food Costs____________________________________ */}
      <h4 className={styles.food_subheading}>Typical Food Costs</h4>
      <p>Food in Sri Lanka is generally affordable compared to many Western destinations.</p>

      <div className={styles.cost_table_wrapper}>
        <table className={styles.cost_table}>
          <thead>
            <tr>
              <th>Dining Type</th>
              <th>Typical Cost Per Person</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Prices vary depending on location, season, and restaurant category. Tourist areas and luxury hotels generally charge higher prices than local establishments.</p>

      {/* Quick Tips____________________________________ */}
      <h4 className={styles.food_subheading}>Quick Tips</h4>
      <ul className={styles.quick_tips_list}>
        {quickTips.map((tip, index) => (
          <li key={index}><i className="fa-solid fa-check"></i>{tip}</li>
        ))}
      </ul>

    </div>
  );
}

export default Food;
