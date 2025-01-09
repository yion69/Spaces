"use client"

import TasksDashboard from "@/components/layout/dashboard/tasks";
import { CardsTeamMembers } from "@/components/layout/dashboard/team";
import { Calendar } from "@/components/ui/calendar";
import { Pencil } from "lucide-react";
import React from "react";

export default function Dashboard () {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    return (
        <div className="flex w-full h-full flex-1 p-10 gap-4">
            <div className="w-7/12 h-full bg-opacity-70 border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-950 rounded-lg">
                <TasksDashboard />
            </div>
            <div className="flex flex-col w-5/12 h-full gap-4">
                <div className="flex w-full h-1/2 border border-zinc-400 bg-zinc-50  dark:border-zinc-700 bg-opacity-100 dark:bg-opacity-80 dark:bg-zinc-950 rounded-lg">
                    <div className="flex-grow">
                        <div className="flex flex-col items-center justify-center w-full h-2/6">
                            <span className="text-sm">Current Time</span>
                            <p className="text-4xl font-bold">07:26 PM</p>
                        </div>
                        <div className="flex flex-col w-full h-4/6">
                            <div className="flex items-center justify-between w-full h-fit px-4 text-sm">
                                <p className="w-fit h-full">Upcoming Events</p>
                                <button className="w-fit h-full" title="edit" type="button"><Pencil size={15} /></button>
                            </div>
                            <div className="flex-grow grid grid-flow-row py-2 gap-2">
                                {
                                    [...Array(4)].map((e,i) => (
                                        <div className="w-11/12 rounded-md flex mx-auto items-center justify-between text-xs px-4 bg-zinc-100 dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-300">
                                            <p>Final Exam</p>
                                            <p>10.Jan</p>
                                        </div>                        
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Calendar 
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md bg-transparent w-fit h-full"
                    />
                </div>
                <div className="w-full h-1/2 border border-zinc-400 bg-zinc-50 dark:border-zinc-700 dark:bg-opacity-80 dark:bg-zinc-950 rounded-lg">
                    <CardsTeamMembers />
                </div>
            </div>
        </div>
    )
}
