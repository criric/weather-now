import axios from "axios"
import { useState } from "react"
import { Weather } from "./components/Weather"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [city, setCity] = useState('')

  console.log(forecastData);
  

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=49bdd87cefee485081214505241902&q=${city}/`)

      const forecast = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=49bdd87cefee485081214505241902&q=${city}&days=7&aqi=no&alerts=no/`)     
      
      console.log(forecast.data);
      
      
      setWeatherData(response.data);
      setForecastData(forecast.data)
    } catch (err) {
      console.log(err);
    }
  }

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value.normalize('NFD'))    
  }

  const handleSubmitCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!city) return
    setCity('')
    getWeatherData()
  }

  return (
    <div className="flex flex-col items-center w-[650px] mx-auto">
      <form action="" onSubmit={handleSubmitCity} className="flex gap-2">
        <input type="text" id="city-input" value={city} onChange={handleCityInputChange} className="bg-beige p-2 border rounded bg-opacity-70 text-grayish focus:border-yellow focus:outline-none focus:ring-0" placeholder="ex. London"/>
        <input type="submit" value="Buscar" className="cursor-pointer bg-yellow p-2 rounded"/>
      </form>
      {
        weatherData && <Weather weatherData={weatherData} />
      }
    </div>
  )
}

export default App