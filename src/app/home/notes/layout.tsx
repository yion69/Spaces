import NoteSidebar from "@/components/layout/notes/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            {children}
            <div className="h-screen w-fit bg-red-500">
                {/* <SidebarProvider>
                    <NoteSidebar side="right" />
                </SidebarProvider> */}
            </div>
        </div>
    )
}