import { useEffect, useState } from "react";
import "./Location.css";
import IsLoading from "../IsLoading/IsLoading";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Location() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  useEffect(() => {
    const getDataWeather = localStorage.getItem("weatherData") || null;
    if (getDataWeather) {
      navigate("/Weather");
    }
  }, []);

  const key_api = "e71388857ca1f6798e51fed62c6c3a39";
  const handlerGetWeather = async () => {
    setLoading(true);
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
        navigate("/Weather");
      }
    } else{
      setLoading(false);
      swal({
        title:"شهر مورد نظر خود را اشتباه وارد کردید",
        icon:"error",
        buttons:"متوجه شدم"
      })
    }
  };

  useEffect(()=>{
      handlerGetWeather();
      const inrevalid = setInterval(()=>{
        handlerGetWeather();
      },60000)
      return ()=>clearInterval(inrevalid)
  },[])

  const handlerGetLocation = async () => {
    swal({
      title: "آیا کشور شما ایران هستید ؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        swal({
          title: "متاسفانه در ایران این قابلیت دردسترس نیست",
          icon: "error",
          buttons: "متوجه شدم",
        });
      } else {
        setLoading(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log("data", data.address.city);
                setCity(data.address.city);
                setLoading(false);
              });
          });
        }
      }
    });
  };

  return (
    <section className="location">
      <div className="container">
        <div className="location_wrapper">
          <h4 className="location_title">وضعیت آب و هوا</h4>
          <p className="location_text">
            لطفا شهر مورد نظر خود را به انگلیسی وارد کنید{" "}
          </p>
          {city.length > 0 && (
            <span className="location_city">نام شهر شما : {city}</span>
          )}
          <input
            type="text"
            className="location_input"
            placeholder=" tehran "
            onChange={(event) => setCity(event.target.value)}
            value={city}
          />
          <div className="location_buttons">
            <button className="location_btn" onClick={handlerGetWeather}>
              جستجو
            </button>
            <button className="location_btn" onClick={handlerGetLocation}>
              یافتن لوکیشن
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="shadow">
          <IsLoading />
        </div>
      )}
    </section>
  );
}

export default Location;
