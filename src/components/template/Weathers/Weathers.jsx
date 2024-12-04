import React, { useEffect, useState } from "react";
import "./Weathers.css";
import { FaSearch, FaTimes } from "react-icons/fa";

function Weathers() {
  const [search, setSearch] = useState(false);
  const [dataWeather, setDataWeather] = useState(null);

  useEffect(()=>{
    const getDataWeather = localStorage.getItem("weatherData") ||[];
    if(getDataWeather){
      setDataWeather(JSON.parse(getDataWeather))
    }
  },[])

  const handlerShowSearch = () => {
    setSearch(true);
  };

  const handlerShowExitSearch = ()=>{
    setSearch(false)
  }

  return (
    
        <section className="weathers">
          <div className="container">
            <div className="weathers_wrapper">
              <div className="weathers_top">
               
                <div className="weathers_right">
                  <h3 className="weathers_title">وضعیت آب و هوا</h3>
                  <span className="weathers_city">اسم شهر :{dataWeather?.name} </span>
               </div>

                <div className="weathers_left">
                  <span className="weathers_search" onClick={handlerShowSearch}>
                    <FaSearch />
                  </span>
                </div>
              </div>
              <div className="weathers_content">
                <div className="content_right">
                    <div className="content_box">
                      <h6 className="content_boxTitle">امروز</h6>
                      <ul className="content_items">
                        <li className="content_item">
                          <span className="content_item_sky">صاف</span>
                          <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                          <span className="content_item_time">09:00</span>
                        </li>
                        <li className="content_item">
                          <span className="content_item_sky">صاف</span>
                          <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                          <span className="content_item_time">09:00</span>
                        </li>
                        <li className="content_item">
                          <span className="content_item_sky">صاف</span>
                          <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                          <span className="content_item_time">09:00</span>
                        </li>
                        <li className="content_item">
                          <span className="content_item_sky">صاف</span>
                          <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                          <span className="content_item_time">09:00</span>
                        </li>
                        <li className="content_item">
                          <span className="content_item_sky">صاف</span>
                          <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                          <span className="content_item_time">09:00</span>
                        </li>
                          <li className="content_item">
                            <span className="content_item_sky">صاف</span>
                            <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                            <span className="content_item_time">09:00</span>
                          </li>
                          <li className="content_item">
                            <span className="content_item_sky">صاف</span>
                            <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                            <span className="content_item_time">09:00</span>
                          </li>
                      </ul>
                    </div>
                    <div className="addSecondCity">
                      <button className="addSecondCity_btn">
                        افزودن شهر جدید
                      </button>
                    </div>
                </div>
                <div className="content_left">
                  <div className="content_city">
                      <img src="/assets/images/clear_day.webp" alt="clear" className="content_city_img" />
                      <div className="content_city_details">
                        <span className="content_city_name">{dataWeather?.name}</span>
                        <span className="content_city_sky">{dataWeather?.weather[0].description}</span>
                        <span className="content_city_temps">
                        {dataWeather?.main?.temp}
                        ° 
                        </span>
                      </div>
                  </div>
                  <div className="date_time">
                      <div className="time">
                        <span className="time_number">00</span>
                        :
                        <span className="time_number">00</span>
                        :
                        <span className="time_number">00</span>
                      </div>
                      <div className="date">
                          <span className="date_text">2024-12-03</span>
                          /
                          <span className="date_day">Tuesday</span>
                      </div>
                  </div>
                  <div className="details">
                      <div className="details_row">
                        <div className="details_item">
                          <img src="/assets/images/wind.svg" alt="" className="details_item_img" />
                          <span className="details_item_text">باد : {dataWeather?.wind?.speed} کیلومتر</span>
                        </div>
                        <div className="details_item">
                          <img src="/assets/images/rain.svg" alt="" className="details_item_img" />
                          <span className="details_item_text">رطوبت : {dataWeather?.main?.humidity} %</span>
                        </div>
                      </div>
                      <div className="details_row">
                        <div className="details_item">
                          <img src="/assets/images/mxt.svg" alt="" className="details_item_img" />
                          <span className="details_item_text"> بیشترین دما : {dataWeather?.main?.temp_max}</span>
                        </div>
                        <div className="details_item">
                          <img src="/assets/images/mit.svg" alt="" className="details_item_img" />
                          <span className="details_item_text">کمترین دما : {dataWeather?.main?.temp_min}</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
                
            </div>
          </div>
            {search && (
                 <div className="shadow"
                 >
                 <div className="weathers_boxSearch">
                   <span className="weather_search_exit"
                    onClick={handlerShowExitSearch}
                   >
                     <FaTimes />
                   </span>
                   <h6 className="weathers_boxSearch_title">
                     شهر جدید خود را وارد کنید{" "}
                   </h6>
                   <input
                     type="text"
                     className="weathers_boxSearch_input"
                     placeholder="tehran"
                   />
                   <button className="weathers_boxSearch_btn">جستجو</button>
                 </div>
               </div>
            )}

        </section>
    
  );
}

export default Weathers;
