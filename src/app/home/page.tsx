"use client";

import { useEffect } from "react";

export default function Home () {
    
    const handleFetch = async () => {
        const req = await fetch(`/api/account?email=thutan@gmail.com`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const res = await req.json();

        if(!res?.action_complete) { console.log(res.error) };

        console.log(res);
    }
        
    useEffect(() => {
        handleFetch();
        // console.log(userData);
    },[])

    return (
        <div className="flex h-screen items-center justify-center">
        </div>
)}