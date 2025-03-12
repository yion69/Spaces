"use client"

import TasksDashboard from "@/components/layout/dashboard/tasks";
import { CardsTeamMembers } from "@/components/layout/dashboard/team";
import Weather from "@/components/layout/dashboard/weather";
import { Calendar } from "@/components/ui/calendar";
import { Pencil } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function Dashboard () {

    const [currentTime, setCurrentTime] = useState('');
    const [date, setDate] = React.useState<Date | undefined>(new Date());
 
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentTime(moment().format("h:mm:ss a"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);         

    return (
        <div className="flex w-full h-full flex-1 p-10 gap-4">
            <div className="w-7/12 h-full bg-opacity-70 border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-950 rounded-lg">
                <TasksDashboard />
            </div>
            <div className="flex flex-col w-5/12 h-full gap-4">
                <div className="flex w-full h-1/2 border border-zinc-400 bg-zinc-50  dark:border-zinc-700 bg-opacity-100 dark:bg-opacity-80 dark:bg-zinc-950 rounded-lg">
                    <div className="flex-grow flex flex-col ps-2 py-2 gap-2">
                        <div className="flex flex-col items-center justify-center w-full h-fit py-4 bg-zinc-200  dark:bg-zinc-900 rounded-lg">
                            <span className="text-sm">Current Time</span>
                            <p className="text-3xl font-bold">{currentTime}</p>
                        </div>
                        <div className="flex flex-col w-full h-fit py-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg">
                            <Weather />
                        </div>
                        <div className="flex-grow bg-zinc-200 dark:bg-zinc-900 rounded-lg"></div>
                    </div>
                    <div className="p-2 box-border">
                        <Calendar 
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="bg-zinc-200 dark:bg-zinc-900 rounded-lg"
                        />
                    </div>
                </div>
                <div className="w-full h-1/2 border border-zinc-400 bg-zinc-50 dark:border-zinc-700 dark:bg-opacity-80 dark:bg-zinc-950 rounded-lg">
                    <CardsTeamMembers />
                </div>
            </div>
        </div>
    )
}
