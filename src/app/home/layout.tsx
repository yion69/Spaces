import SidebarDynamicWrapper from "@/components/layout/sidebar/sidebar-dynamic-wrapper";
import { loginIsRequiredServer, authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    await loginIsRequiredServer();
    
    const userSession = await getServerSession(authOptions);
    const userEmail = userSession?.user?.email as string;

    const userFetch = await fetch(`http://localhost:3000/api/account?email=${userEmail}`, {
        method: "GET",
    });
    const response = await userFetch.json();
    const { body } = response;
    console.log(response);

    return (
        <div className="flex">
            <SidebarDynamicWrapper user={{name:body.user_username, email: body.user_email, avatar: body.avatar}} />
            <div className="flex-1">{children}</div>
        </div>
        
    );
}