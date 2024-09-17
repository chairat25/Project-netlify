import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Showuser from "./Showuser";
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [datasearch, setDatasearch] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [displayedShopIds, setDisplayedShopIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState({ shops: [], foods: [] });
  const [language, setLanguage] = useState("th");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/shops/")
      .then((res) => res.json())
      .then((data) => {
        const uniqueShops = data.filter(
          (shop, index, self) =>
            index === self.findIndex((s) => s.shop_id === shop.shop_id)
        );
        setfilterData(uniqueShops);
        setDatasearch(uniqueShops);
        setOriginalData((prev) => ({ ...prev, shops: uniqueShops }));
      })
      .catch((err) => console.log(err));

    fetch("http://127.0.0.1:8000/show_all_food/")
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
        setOriginalData((prev) => ({ ...prev, foods: data }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (value) => {
    setSearchTerm(value);
    const filteredShops = filterData.filter((shop) =>
      shop.shop_name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredFoods = foodData.filter((food) =>
      food.Food_name.toLowerCase().includes(value.toLowerCase())
    );
    const shopIds = new Set(filteredFoods.map((food) => food.shop_id));
    const filteredShopsWithFood = filterData.filter((shop) =>
      shopIds.has(shop.shop_id)
    );
    const result = [...filteredShops, ...filteredShopsWithFood];
    const uniqueResult = result.filter(
      (shop, index, self) =>
        index === self.findIndex((s) => s.shop_id === shop.shop_id)
    );
    setDatasearch(uniqueResult);
  };

  const handleShopClick = (shopId) => {
    if (!displayedShopIds.includes(shopId)) {
      setDisplayedShopIds([...displayedShopIds, shopId]);
    }
  };

  const handleTranslate = () => {
    const fromLang = language === "th" ? "th" : "en";
    const toLang = language === "th" ? "en" : "th";

    const shopNames = originalData.shops
      .map((shop) => shop.shop_name)
      .join(",");
    const shopLocations = originalData.shops
      .map((shop) => shop.shop_location)
      .join(",");
    const shopTimes = originalData.shops
      .map((shop) => shop.shop_time)
      .join(",");
    const foodNames = originalData.foods
      .map((food) => food.Food_name)
      .join(",");

    const translateShopNames = fetch(
      `http://127.0.0.1:8000/translate/${fromLang}-${toLang}/?sentences=${encodeURIComponent(
        shopNames
      )}`
    );
    const translateShopLocations = fetch(
      `http://127.0.0.1:8000/translate/${fromLang}-${toLang}/?sentences=${encodeURIComponent(
        shopLocations
      )}`
    );
    const translateShopTimes = fetch(
      `http://127.0.0.1:8000/translate/${fromLang}-${toLang}/?sentences=${encodeURIComponent(
        shopTimes
      )}`
    );
    const translateFoodNames = fetch(
      `http://127.0.0.1:8000/translate/${fromLang}-${toLang}/?sentences=${encodeURIComponent(
        foodNames
      )}`
    );

    Promise.all([
      translateShopNames,
      translateShopLocations,
      translateShopTimes,
      translateFoodNames,
    ])
      .then((responses) =>
        Promise.all(
          responses.map((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
        )
      )
      .then(([namesData, locationsData, timesData, foodNamesData]) => {
        const translatedNames = namesData.translated_text.split(",");
        const translatedLocations = locationsData.translated_text.split(",");
        const translatedTimes = timesData.translated_text.split(",");
        const translatedFoodNames = foodNamesData.translated_text.split(",");

        const translatedShops = originalData.shops.map((shop, index) => ({
          ...shop,
          shop_name: translatedNames[index],
          shop_location: translatedLocations[index],
          shop_time: translatedTimes[index],
        }));

        const translatedFoods = originalData.foods.map((food, index) => ({
          ...food,
          Food_name: translatedFoodNames[index],
        }));

        setDatasearch(translatedShops);
        setFoodData(translatedFoods);

        setLanguage(toLang);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    handleTranslate();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <>
      <Showuser />

      <div className="containerhome">
      <div className="custom-select666">
      <select
        className="TranslateHome666"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="th" className="thai666">
          ไทย
        </option>
        <option value="en" className="eng666">
          English
        </option>
      </select>
      {language === 'en' && (
        <img src="https://www.tornok.com/wp-content/uploads/2015/03/uk-flag.png" alt="Thailand"  />
      )}
       {language === 'th' && (
       <img src="https://cdn.pixabay.com/photo/2013/07/12/17/58/thailand-152711_1280.png" alt="Thailand" />
      )}
    </div>
        <div className="boxsearch">
          <input
            className="inputsearch"
            type="text"
            id="default-search"
            placeholder={language === "th" ? "🔍  ค้นหา" : "🔍Search "}
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        <div className="shopfood007 text-3xl font-bold text-center  text-white ">
          {language === "th" ? "ร้านอาหาร" : "Restaurants"}
        </div>

        <div className="whatthehall">
          {Array.isArray(datasearch) &&
            datasearch.map((d, i) => (
              <div
                key={i}
                className="custom-backgroundhome1111"
              >
                <div className="container-storewtf">
                  <div className="card1111">
                    <img
                      src={d.shop_picture}
                      alt={d.shop_name}
                      className="picture-home rounded-lg"
                    />
                    <div className="card-outdatastore">
                      <div className="data-storehome">
                        <div className="shop_id">
                          {language === "th" ? "ไอดีร้าน" : "Shop ID"}:
                          {searchTerm &&
                          String(d.shop_id)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_id}
                            </span>
                          ) : (
                            d.shop_id
                          )}
                        </div>
                        <div className="shop_id">
                          {language === "th" ? "ชื่อร้านค้า" : "Shop Name"}:
                          {searchTerm &&
                          d.shop_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_name}
                            </span>
                          ) : (
                            d.shop_name
                          )}
                        </div>
                        <div className="shop_id">
                          {language === "th" ? "สถานที่" : "Location"}:
                          {searchTerm &&
                          d.shop_location
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_location}
                            </span>
                          ) : (
                            d.shop_location
                          )}
                        </div>
                        <div className="shop_id">
                          {language === "th" ? "เบอร์โทรศัพท์" : "Phone"}:{" "}
                          {searchTerm &&
                          d.shop_phone
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_phone}
                            </span>
                          ) : (
                            d.shop_phone
                          )}
                        </div>
                        <div className="shop_id">
                          {language === "th"
                            ? "วันเวลาเปิด-ปิด"
                            : "Opening Hours"}
                          :
                          {searchTerm &&
                          d.shop_time
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_time}
                            </span>
                          ) : (
                            d.shop_time
                          )}
                        </div>
                        <div className="shop_id">
                          {language === "th" ? "ตราสัญลักษณ์" : "Symbol"}:{" "}
                          {searchTerm &&
                          d.shop_text
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {d.shop_text}
                            </span>
                          ) : (
                            d.shop_text
                          )}
                          {d.shop_text.toLowerCase().includes("halal") && (
                            <div className="halal-image">
                              <img
                                src="https://www.lsfpackaging.com/images/editor/21-%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AE%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%A5%E0%B8%84%E0%B8%B7%E0%B8%AD_Pic.jpg"
                                alt="Halal"
                              />
                            </div>
                          )}
                          {d.shop_text.toLowerCase().includes("vegetarian") && (
                            <div className="vegetarian-image">
                              <img
                                src="https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-icon-for-vegan-food-vector-illustration-symbols-isolated-on-white-background-png-image_1870591.jpg"
                                alt="Vegetarian"
                              />
                            </div>
                          )}
                          {d.shop_text.toLowerCase().includes("mangswirat") && (
                            <div className="mangswirat-image">
                              <img
                                src="https://msnbcnewslive.com/wp-content/uploads/2023/10/201508141447.jpeg"
                                alt="Mangswirat"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h2 className="underline underline-offset-4 pt-3 text-2xl">
                          {language === "th" ? "รายการอาหาร" : "Food List"}{" "}
                        </h2>
                        <Slider {...settings}>
                          {foodData
                            .filter((food) => food.shop_id === d.shop_id)
                            .map((food, index) => (
                              <div key={index}>
                                
                                <Link
                                  to={{
                                    pathname: "/Fooddetails",
                                    search: `?food_id=${
                                      food.food_id
                                    }&Food_name=${food.Food_name}&Food_price=${
                                      food.Food_price
                                    }&Food_picture=${encodeURIComponent(
                                      food.Food_picture
                                    )}&Food_element=${
                                      food.Food_element
                                    }&food_elements=${food.food_elements.join(
                                      ", "
                                    )}`,
                                  }}
                                >
                                  <h3 className=" underline-offset-4 pt-3 text-2xl">
                                    {searchTerm &&
                                    food.Food_name.toLowerCase().includes(
                                      searchTerm.toLowerCase()
                                    ) ? (
                                      <span
                                        style={{ backgroundColor: "yellow" }}
                                      >
                                        {food.Food_name}
                                      </span>
                                    ) : (
                                      food.Food_name
                                    )}
                                  </h3>
                                  <div className="picturefood">
                                    <img
                                      className="rounded-lg mt-3 w-3 h-55"
                                      src={`${food.Food_picture}`}
                                      alt={food.Food_name}
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </Link>
                                </div>
                              
                            ))}
                        </Slider>
                      </div>
                    </div>
                    <div className="buttongostore">
                    <Link
                      to={{
                        pathname: `/Store_information`,
                        search: `?shop_id=${d.shop_id}&shop_name=${
                          d.shop_name
                        }&shop_picture=${encodeURIComponent(
                          d.shop_picture
                        )}&shop_location=${d.shop_location}&shop_phone=${
                          d.shop_phone
                        }&shop_time=${d.shop_time}&shop_text=${d.shop_text}`,
                      }}
                      className="bg-amber-500 py-2 px-4 text-white font-bold rounded-full"
                      onClick={() => handleShopClick(d.shop_id)}
                    >
                      {language === "th" ? "ไปยังร้านค้า" : "Shop"}:{" "}
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
