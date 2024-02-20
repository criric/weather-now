import { useState } from "react"
import { WeatherChart } from "./WeatherChart"

type WeatherProps = {
    weatherData: WeatherData
}

type ForecastDayType = {
    date: string,
    day: {
        avg_humidity: number,
        maxtemp_c: number,
        maxtemp_f: number,
        mintemp_c: number,
        mintemp_f: number,
        condition: {
            text: string,
            icon: string
        }
    }
}

type WeatherData = {
    current: {
        temp_c: number,
        temp_f: number,
        feelslike_c: number,
        condition: {
            text: string,
            icon: string
        },
        last_updated: string,
        humidity: number,
        wind_kph: number,
        wind_mph: number
    },
    location: {
        name: string,
        region: string,
        country: string,
        localtime: string
    },
    forecast: {
        forecastday: ForecastDayType[]
    }
}

export function Weather({weatherData}: WeatherProps){   
    const [locale, setLocale] = useState('world')

    const handleLocale = (locale: string) => {
        setLocale(locale)        
    }

    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so we add 1
    const todayDay = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${todayYear}-${todayMonth}-${todayDay}`;    
    
    const date = weatherData.location.localtime.split(' ')[0]
    const time = weatherData.location.localtime.split(' ')[1]

    const [year, month, day] = date.split('-')

    return (
        <div className="w-full text-base-label bg-base-subtitle bg-opacity-40 rounded p-4 mt-6">
            <div className="text-base-input text-xl">
                <h1>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h1>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={weatherData.current.condition.icon} alt="weather icon"/>
                    <div className="flex gap-1">
                        <h1 className="text-5xl text-base-input">{locale === 'world' ? weatherData.current.temp_c : weatherData.current.temp_f}</h1>
                        <div>
                            <span 
                            className={`cursor-pointer ${locale === 'world' ? 'text-base-input' : ''}`}
                            onClick={() => handleLocale('world')}
                            >
                                °C
                            </span>
                            |
                            <span 
                            className={`cursor-pointer ${locale === 'america' ? 'text-base-input' : ''}`} 
                            onClick={() => handleLocale('america')}
                            >
                                °F
                            </span>
                        </div>
                    </div>
                    <div className="text-xs">
                        <h2>Humidity: {weatherData.current.humidity}%</h2>
                        <h2>
                            Wind: {locale === 'world' ? weatherData.current.wind_kph + ' km/h' : weatherData.current.wind_mph + ' mph'}
                        </h2>
                    </div>
                </div>
                <div className="text-end">
                    <h1 className="text-base-input text-lg">Weather</h1>
                    <h1>{month}/{day}/{year} {time}</h1>
                    <h1>{weatherData.current.condition.text}</h1>
                </div>
            </div>
            <WeatherChart data={weatherData.forecast.forecastday} locale={locale}/>
            <div className="flex justify-between">
                {
                   weatherData.forecast.forecastday.map(day => {
                    return (
                        <div key={day.date} className={`flex flex-col items-center p-2 ${formattedDate === day.date ? 'bg-base-text rounded' : ''}`}>
                            <div className="text-base-input text-sm">{day.date.split('-').reverse().join('/')}</div>
                            <img src={day.day.condition.icon} alt="" />
                            <div className="flex gap-1 text-xs">
                                <span className="text-base-input">{locale === 'world' ? day.day.maxtemp_c : day.day.maxtemp_f}°</span>
                                <span>{locale === 'world' ? day.day.mintemp_c : day.day.mintemp_f}°</span>
                            </div>
                        </div>
                    )
                   })
                }
            </div>
        </div>
    )
}