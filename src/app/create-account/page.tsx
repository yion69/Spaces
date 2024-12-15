"use client" 

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Blend, Container, Eye, EyeClosed } from "lucide-react"
import { FormEventHandler, useEffect, useState } from "react"
import { GithubSignInButton, GoogleSignInButton } from "@/components/layout/loginform/login-buttons"

export interface UserDataI {
    username: string,
    email: string,
    password: string,
    avatar: string | undefined | null
}

export default function AccountCreate() {

    const [userData, setUserData] = useState<UserDataI>({
        username: "",
        email: "",
        password: "",
        avatar: null,
    });
    
    const [togglePassword, setTogglePassword] = useState(true);
    const [passwordType, setPasswordType] = useState("password");

    const handleToggle = () => { 
        setTogglePassword(prev => !prev); 
        setPasswordType(prev => prev === "password" ? prev = "text" : "password");
    };

    const [terms, setTerms] = useState(true);

    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            const request = await fetch("/api/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_data: userData
                })
            })
            
            const response = await request.json();

            if(!response.action_complete) { console.log(response.message); return }
            
            console.log(response.message);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(userData);
    }, [userData])

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen bg-zinc-950">
            <div className="relative bg-muted lg:block">
                <h3 className="w-fit flex items-center gap-2 relative top-10 left-10 text-3xl"><Container />Hello there</h3>
                <p className="flex flex-col gap-2 absolute bottom-14 left-10 w-11/12 text-lg">
                    " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam minus est a illo possimus esse, similique pariatur fugit enim adipisci non cum facilis. Iste, maxime? "
                    <span className="text-sm font-semibold">Lorem Ipsum</span>
                </p>
                {/* <Image
                    src="/placeholder.svg"
                    alt=""
                    width="1920"
                    height="720"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                /> */}
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Create Account</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            Enter your information below to create your account
                        </p>
                    </div>
                    <form className="grid gap-4" onSubmit={handleSubmit} autoComplete="off" method="POST">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="username"
                                type="username"
                                placeholder="johndoe123"
                                required
                                onChange={(e)=>setUserData({...userData, username: e.currentTarget.value})}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e)=>setUserData({...userData, email: e.currentTarget.value})}
                            />
                        </div>
                        <div className="relative grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" type={passwordType} autoComplete="off" autoCorrect="off" required
                                onChange={(e)=>setUserData({...userData, password: e.currentTarget.value})}
                             />
                            <button type="button" title="toggle" onClick={handleToggle} className="absolute top-1/2 right-6 size-4">
                                { togglePassword ? <Eye/> : <EyeClosed /> }
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-xs">I agreed with Terms, Privacy Policy and Cookies Policy</p>
                            <input type="checkbox" title="ToS" onChange={() => setTerms(prev => !prev)} />
                        </div>
                        <Button type="submit" className="w-full" disabled={terms}>
                            Create
                        </Button>
                        <div className="relative flex items-center gap-4 w-full h-full">
                            <span className="border flex-grow w-auto h-[1px]"></span>
                            <p>or</p>
                            <span className="border flex-grow w-auto h-[1px]"></span>
                        </div>
                        <GoogleSignInButton />
                        <GithubSignInButton />
                    </form>
                    <div className="-mt-2 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}