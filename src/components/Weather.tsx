import { useState } from "react"

type WeatherProps = {
    weatherData: WeatherData
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
    }
}

export function Weather({weatherData}: WeatherProps){   
    const [locale, setLocale] = useState('world')

    const handleLocale = (locale: string) => {
        setLocale(locale)        
    }
    
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
                    <h1>Weather</h1>
                    <h1>{month}/{day}/{year} {time}</h1>
                    <h1>{weatherData.current.condition.text}</h1>
                </div>
            </div>
        </div>
    )
}