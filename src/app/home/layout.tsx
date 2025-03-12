import SidebarDynamicWrapper from "@/components/layout/sidebar/sidebar-dynamic-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { loginIsRequiredServer, authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    await loginIsRequiredServer();
    
    const userSession = await getServerSession(authOptions);
    const userEmail = userSession?.user?.email as string;
    const userUsername = userSession?.user?.name as string;
    const userAvatar = userSession?.user?.avatar as string;

    return (
        <div className="flex">
            <TooltipProvider>
                <SidebarDynamicWrapper user={{name: userUsername, email: userEmail, avatar: userAvatar}} />
                <div className="flex-1">{children}</div>
            </TooltipProvider>
        </div>
        
    );
}