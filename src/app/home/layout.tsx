import SidebarDynamicWrapper from "@/components/layout/sidebar/sidebar-dynamic-wrapper";
import { loginIsRequiredServer, authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    await loginIsRequiredServer();
    
    const userSession = await getServerSession(authOptions);
    const userData = { 
        name: userSession?.user?.name as string, 
        email: userSession?.user?.email as string, 
        avatar: userSession?.user?.image as string}
        
    return (
        <div className="flex">
            <SidebarDynamicWrapper user={userData} />
            <div className="flex-1">{children}</div>
        </div>
        
    );
}