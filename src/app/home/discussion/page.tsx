import Item from "@/components/layout/discussion/item";
import { Info, Plus, Search } from "lucide-react";
    
export default function Chat () {
    
    // const router = useRouter();
    const tempData = {
        user_photo: null,
        username: "User000001",
        timestamp: "3 days ago",
        post_title: "Where can I read more about C+++?",
        post_content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, deleniti vitae! Eius sequi numquam quidem voluptatum in ipsa quos ratione recusandae vel quia, impedit consequuntur necessitatibus, debitis, odit quas. Totam.",
        post_reactions: 22,
        post_comment: 4
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-grow h-[90%] w-full box-border">
                <div className="h-full w-10/12 p-0 box-border bg-zinc-950 overflow-scroll">
                    {
                        [...Array(4)].map((e,i) => (
                            <Item post_data={tempData} key={i} />
                        ))
                    }
                </div>
                <div className="flex flex-col h-full w-2/12 px-2 py-6 gap-4 bg-zinc-900">
                    <h1 className="w-full text-3xl">Discussion Board</h1>
                    <div className="relative flex items-center w-full h-12 mt-4 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
                        <Search className="absolute left-3" size={20} />
                        <input className="w-full h-full ps-10 bg-zinc-950" type="text" title="input" placeholder="Search" />
                    </div>
                    <div className="flex items-center w-full h-fit">
                        <button className="flex items-center justify-center w-1/2 h-10 gap-1" type="button" title="button">
                            <Plus /> Create
                        </button>

                        <button className="flex items-center justify-center w-1/2 h-10 gap-1" type="button" title="button">
                            <Info />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}