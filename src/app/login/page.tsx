"use client"
    
import Link from "next/link";
import { LoginForm } from "@/components/layout/loginform/login-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Container, Eye, EyeClosed } from "lucide-react";
import { GithubSignInButton, GoogleSignInButton } from "@/components/layout/loginform/login-buttons";
import { signIn } from "next-auth/react";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const [userAuth, setUserAuth] = useState({ email: "", password: ""});
    const [togglePassword, setTogglePassword] = useState(true);
    const [passwordType, setPasswordType] = useState("password");

    const router = useRouter();

    const handleToggle = () => { 
        setTogglePassword(prev => !prev); 
        setPasswordType(prev => prev === "password" ? prev = "text" : "password");
    };
    
    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: userAuth.email,
                password: userAuth.password
            })

            if(response?.error) { console.log("Err: During Sign In", response.error); return };
            
            if(response === null) { console.log('Login Failed incorrect credentials'); return };

            console.log(response);

            router.push("/home/dashboard");

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(userAuth);
    }, [userAuth])

    return(
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen bg-zinc-950">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e)=> {setUserAuth({...userAuth , email: e.currentTarget.value})}}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input 
                                    id="password" type={passwordType} required
                                    onChange={(e)=> {setUserAuth({...userAuth , password: e.currentTarget.value})}}
                                />
                                <button type="button" title="toggle" onClick={handleToggle} className="absolute top-2 right-6 size-4">
                                    { togglePassword ? <Eye/> : <EyeClosed /> }
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <GoogleSignInButton />
                        <GithubSignInButton />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/create-account" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
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
        </div>
    )
}