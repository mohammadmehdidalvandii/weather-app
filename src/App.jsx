import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes";
import WeatherContext from "./Context/weatherContext";

function App() {
  const router = useRoutes(routes)
  const [weather , setWeather] = useState([])
  return (
  <>
  <WeatherContext.Provider
    value={{
      weather,
      setWeather
    }}
  >
  {router}
  </WeatherContext.Provider>
  </>
  )
}

export default App
