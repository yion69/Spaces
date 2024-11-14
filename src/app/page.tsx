"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <nav></nav>
      <main>
        <Button onClick={()=>router.push("/login")}>Login</Button>
      </main>
      <footer></footer>
    </div>
  );
}
