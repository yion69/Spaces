import { CloudMoon, CloudSun } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Weather () {

    interface WeatherData {
        timezone: string;
        min_temperature: number;
        max_temperature: number;
    }
    const currentHour = moment().hour();
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
    const fetchWeatherData = async () => {
        const req = await fetch("/api/weather", {
            method: "GET"
        });
        const res = await req.json();
        console.log(res);
        setWeatherData({
            timezone: res.body.timezone,
            min_temperature: res.body.daily.temperature_2m_min[0],
            max_temperature: res.body.daily.temperature_2m_max[0],
        });
    }
    useEffect(()=>{
        fetchWeatherData();
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2 ">
            <div className="flex flex-col items-center justify-center">
                { currentHour >= 6 && currentHour < 18 ? 
                    <CloudSun size={65} /> :
                    <CloudMoon size={65} />
                }
            </div>
            <div className="flex flex-col items-center">
                <p className="text-lg">{weatherData?.min_temperature}°C / {weatherData?.max_temperature}°C</p>
                <p className="text-sm">{weatherData?.timezone}</p>
            </div>
        </div>
    )
}