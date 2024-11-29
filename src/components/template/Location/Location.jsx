import { useState } from "react";
import "./Location.css";
import IsLoading from "../IsLoading/IsLoading";

function Location() {
  const [loading , setLoading] = useState(false);

  const handlerSearchCity = ()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },4000)
  }

  return (
    <section className="location">
        <div className="container">
            <div className="location_wrapper">
                <h4 className="location_title">وضعیت آب و هوا</h4>
                <p className="location_text">لطفا شهر مورد نظر خود را به انگلیسی وارد کنید </p>
                <input type="text" className="location_input"  placeholder=" tehran "/>
                <div className="location_buttons">
                  <button className="location_btn"
                  onClick={handlerSearchCity}
                  >جستجو</button>
                  <button className="location_btn">یافتن لوکیشن</button>
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