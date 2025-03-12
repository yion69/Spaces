import { NextResponse } from "next/server";

export const GET = async (res:NextResponse) => {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=16.8053&longitude=96.1561&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1"
        );

        const data = await response.json();
        return NextResponse.json({
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: data
        })
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch weather data" }),
            { status: 500 }
        );
    }
}