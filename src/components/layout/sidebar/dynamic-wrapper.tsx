import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoggedOut () {

    return (
        <Link href={"/login"} className="flex border">
            <Button className="flex-1">Sign In</Button>
        </Link>
    )
}