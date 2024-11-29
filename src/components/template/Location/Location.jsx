import { useState } from "react";
import "./Location.css";
import IsLoading from "../IsLoading/IsLoading";
import swal from "sweetalert";

function Location() {
  const [loading , setLoading] = useState(false);
  const [city , setCity ] = useState("")

  const handlerSearchCity = ()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },4000)
  };

  const handlerGetLocation = async () => {
    swal({
      title:"آیا کشور شما ایران هستید ؟",
      icon:"warning",
      buttons:["نه","آره"]
    }).then((result)=>{
      if(result){
        swal({
          title:"متاسفانه در ایران این قابلیت دردسترس نیست",
          icon:"error",
          buttons:"متوجه شدم"
        })
      }else{
        setLoading(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;    
              fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
              .then(res=>res.json())
              .then(data=>{
                console.log("data" ,data.address.city)
                setCity(data.address.city)
                setLoading(false);
              })
            },
            
          );
        } 
      }
    })
  
  };

  return (
    <section className="location">
        <div className="container">
            <div className="location_wrapper">
                <h4 className="location_title">وضعیت آب و هوا</h4>
                <p className="location_text">لطفا شهر مورد نظر خود را به انگلیسی وارد کنید </p>
                {city.length >  0 && (
                  <span className="location_city">نام شهر شما : {city}</span>
                )}
                <input type="text" className="location_input"  placeholder=" tehran "
                value={city}
                />
                <div className="location_buttons">
                  <button className="location_btn"
                  onClick={handlerSearchCity}
                  >جستجو</button>
                  <button className="location_btn"
                  onClick={handlerGetLocation}
                  >یافتن لوکیشن</button>
                </div>
            </div>
        </div>
        {loading && (
        <div className="shadow">
          <IsLoading/>
        </div>
        )}
    </section>
  )
}

export default Location