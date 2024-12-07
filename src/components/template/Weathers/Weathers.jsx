import React, { useEffect, useState } from "react";
import "./Weathers.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import IsLoading from "../IsLoading/IsLoading";
import swal from "sweetalert";

function Weathers() {
  const [search, setSearch] = useState(false);
  const [city , setCity] = useState("")
  const [dataWeather, setDataWeather] = useState(null);
  const [dataForecast , setDataForecast] = useState(null)
  const [dataWeatherSecond, setDataWeatherSecond] = useState(null);
  const [SecondCity, setSecondCity] = useState(false);
  const [loading , setLoading] =  useState(false);
  console.log("data => ", dataWeatherSecond)

  const handlerAddSecondCity = ()=>{
      setSecondCity(true)
  }
  const handlerShowExitSecond= ()=>{
    setSecondCity(false)
  }

  const key_api = "e71388857ca1f6798e51fed62c6c3a39";
  const handlerSearchSecondCity = async ()=>{
    setLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key_api}&units=metric`
    );
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("weatherSecond", JSON.stringify(data));
      setLoading(false);
      setSecondCity(false)
      location.reload()
    } else{
      setLoading(false);
      setSecondCity(false)
      swal({
        title:"شهر مورد نظر خود را اشتباه وارد کردید",
        icon:"error",
        buttons:"متوجه شدم"
      })
    }
  }

  const handlerChangeCity = ()=>{
    setLoading(true);
    swal(({
      title:`آیا از تغییر شهر ${dataWeather?.name} مطمن هستید ؟`,
      icon:"error",
      buttons:["نه","آره"],
    })).then(async (result)=>{
      if(result){
        localStorage.removeItem("forecastData");
        localStorage.removeItem("weatherData");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key_api}&units=metric`
        );
        if (res.status === 200) {
          const data = await res.json();
          const { lat, lon } = data.coord;
          localStorage.setItem("weatherData", JSON.stringify(data));
    
          const forecast = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key_api}&units=metric`
          );
          if (forecast.status === 200) {
            const forecastData = await forecast.json();
            localStorage.setItem("forecastData", JSON.stringify(forecastData));
            setLoading(false);
            setSearch(false)
            location.reload()
          }
        } else{
          setLoading(false);
          setSearch(false)
          swal({
            title:"شهر مورد نظر خود را اشتباه وارد کردید",
            icon:"error",
            buttons:"متوجه شدم"
          })
        }
      }else{
        setLoading(false);
        setSearch(false)
        setCity("")
      }
    })
  }

  const handlerRemovedSecondCity = ()=>{
    swal({
      title:"آیا از حذف شهر دوم اطمینان دارید ؟",
      icon:"error",
      buttons:["نه","آره"]
    }).then((result)=>{
      if(result){
        localStorage.removeItem("weatherSecond");
        swal({
          title:"شهر دوم با موفقیت حذف شد",
          icon:"success",
          buttons:"متوجه شدم"
        })
        location.reload()
      }
    })
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', locale: 'fa-IR' };
    return new Intl.DateTimeFormat('en', options).format(date);
  };

  useEffect(()=>{
    const getDataWeatherSecond= localStorage.getItem("weatherSecond");
    if(getDataWeatherSecond){
        setDataWeatherSecond(JSON.parse(getDataWeatherSecond))
      }
        const getDataForecast = localStorage.getItem("forecastData")|| [];
        if(getDataForecast){
          setDataForecast(JSON.parse(getDataForecast))
        }
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
                      {dataForecast?.list.slice(0 , 6).map((item , index)=>(
                           <li className="content_item" key={index}>
                           <span className="content_item_sky">{item?.weather[0]?.main}</span>
                           <img src="/assets/images/clear_day.webp" alt="sky" className="content_item_img" />
                           <span className="content_item_time">{new Date(item.dt * 1000).toLocaleTimeString(["fa-ir"], { hour: '2-digit', minute: '2-digit' })}</span>
                         </li>
                        ))}
                      </ul>
                    </div>
                        {dataWeatherSecond ? (
                           <div className="show_secondCity">
                           <span className="remove_secondCity"
                            onClick={handlerRemovedSecondCity}
                           ><FaTimes/></span>
                         <div className="content_city">
                           <img src="/assets/images/clear_day.webp" alt="clear" className="content_city_img" />
                           <div className="content_city_details">
                             <span className="content_city_name">{dataWeatherSecond?.name}</span>
                             <span className="content_city_sky">{dataWeatherSecond?.weather[0].description}</span>
                             <span className="content_city_temps">
                             {dataWeatherSecond?.main?.temp}
                             ° 
                             </span>
                           </div>
                       </div>
                       <div className="details">
                           <div className="details_row">
                             <div className="details_item">
                               <img src="/assets/images/wind.svg" alt="" className="details_item_img" />
                               <span className="details_item_text">باد : {dataWeatherSecond?.wind?.speed} کیلومتر</span>
                             </div>
                             <div className="details_item">
                               <img src="/assets/images/rain.svg" alt="" className="details_item_img" />
                               <span className="details_item_text">رطوبت : {dataWeatherSecond?.main?.humidity} %</span>
                             </div>
                           </div>
                           <div className="details_row">
                             <div className="details_item">
                               <img src="/assets/images/mxt.svg" alt="" className="details_item_img" />
                               <span className="details_item_text"> بیشترین دما : {dataWeatherSecond?.main?.temp_max}</span>
                             </div>
                             <div className="details_item">
                               <img src="/assets/images/mit.svg" alt="" className="details_item_img" />
                               <span className="details_item_text">کمترین دما : {dataWeatherSecond?.main?.temp_min}</span>
                             </div>
                           </div>
                       </div>
                         </div>
                        ) : (
                          <div className="addSecondCity">
                          <button className="addSecondCity_btn"
                            onClick={handlerAddSecondCity}
                          >
                            افزودن شهر جدید
                          </button>
                        </div>
                        )}
                        
                  
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
                       <span className="time_number"> {new Date(dataWeather?.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  </span>
                      </div>
                      <div className="date">
                          <span className="date_day">{formatDate(new Date())}</span>
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
            {SecondCity && (
              <div className="shadow">
                  <div className="weathers_boxSearch">
                   <span className="weather_search_exit"
                    onClick={handlerShowExitSecond}
                   >
                     <FaTimes />
                   </span>
                   <h6 className="weathers_boxSearch_title">
                     شهر جدید خود را وارد کنید{" "}
                   </h6>
                   <input
                     type="text"
                     value={city}
                     onChange={e=>setCity(e.target.value)}
                     className="weathers_boxSearch_input"
                     placeholder="tehran"
                   />
                   <button className="weathers_boxSearch_btn"
                    onClick={handlerSearchSecondCity}
                   >جستجو</button>
                 </div>
              </div>
            )}

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
                     value={city}
                     onChange={e=>setCity(e.target.value)}
                     className="weathers_boxSearch_input"
                     placeholder="tehran"
                   />
                   <button className="weathers_boxSearch_btn"
                   onClick={handlerChangeCity}
                   >جستجو</button>
                 </div>
               </div>
            )}
            {loading && (
              <div className="shadow">
                <IsLoading/>
              </div>
            )}
        </section>
    
  );
}

export default Weathers;
