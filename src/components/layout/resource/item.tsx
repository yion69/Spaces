import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { BookText, Copy, Globe, Newspaper, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Type } from "@/lib/types"

export interface ResourceItem<T> {
    _id: string,
    resource_type: string,
    resource_author: string,
    resource_content: T,
    resource_tag: string  
}

export default function Item ({ _id, resource_type, resource_author, resource_content, resource_tag }:ResourceItem<Record<string,any>>) {

    const [dialogOpened, setDialogOpened] = useState(false);
    const handleClick = () => {
        toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
        })
    }
    const handleDelete = async () => {
        const req = await fetch(`/api/resource?id=${_id}`,{
            method: "DELETE",
        })
        const res = await req.json();
        if(res.action_completed) {
            setDialogOpened(prev => false);     
            toast({
                title: "Resource Deleted Successfully",
                description: "Your resource has been deleted from your collection successfully!",
            })
            window.location.reload();
        }
        console.log(res.body);
    }
    return(
        <div className="relative flex w-full h-44 min-h-44 p-4 gap-10 box-border rounded-lg bg-zinc-100 dark:bg-zinc-950 shadow-2xl border-2 border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-center h-full w-52 p-4 bg-zinc-300 dark:bg-zinc-900 rounded-lg ">
                { 
                    resource_type == Type.BOOK ? <img src="/resource_type/Book.png" alt="book" /> : 
                    resource_type == Type.JOURNAL ? <img src="/resource_type/Evaluation.png" alt="book" />: 
                    <img src="/resource_type/Video.png" alt="book" />
                }
            </div>
            <div className="flex flex-col w-1/2 h-full gap-4">
                <div className="flex flex-col w-full h-fit">
                    {
                        resource_type == Type.BOOK ? (
                            <>
                                <h1 className="text-lg font-semibold font-serif">{resource_content["title"]} | {resource_content["author"]}</h1>
                                <p className="text-sm">{resource_content["city"]}</p>
                                <p className="text-sm">{resource_content["publisher"]}</p>
                                <p className="text-sm">Year • {resource_content["year"]}</p>
                            </>
                        ) : resource_type == Type.JOURNAL ? (
                            <>
                                <h1 className="text-lg font-semibold font-serif">{resource_content["title"]} | {resource_content["name"]}</h1>
                                <p className="text-sm">{resource_content["author"]}</p>
                                <p className="text-sm">pages • {resource_content["pages"]}</p>
                                <p className="text-sm">Year • {resource_content["year"]}</p>
                            </>
                        ) : <>
                                <h1 className="text-lg font-semibold font-serif">{resource_content["webpage"]} | {resource_content["website"]}</h1>
                                <p className="text-sm">Accessed Date ( {resource_content["day"]} • {resource_content["month"]} • {resource_content["year"]} ) </p>
                                <p className="text-sm">URL [ {resource_content["url"]} ]</p>
                                
                            </>
                    }
                </div>
                <div className="w-full h-fit flex items-center justify-start gap-2">
                    <div className="w-fit h-fit px-3 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-700">
                        {resource_type}
                    </div>
                    <div className="w-fit h-fit px-3 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-700">
                        { resource_tag }
                    </div>
                </div>
            </div>
            <button type="button" title="copy" className="flex items-center justify-center size-fit p-2 border absolute top-4 right-16 rounded-md bg-zinc-950 dark:bg-zinc-800 text-zinc-50 "><Copy size={20} /></button>
            <Dialog open={dialogOpened}>
                <DialogTrigger className="flex items-center justify-center size-fit p-2 border absolute top-4 right-4 rounded-md bg-red-700" onClick={()=>setDialogOpened(prev => true)}>
                    <Trash size={20} />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4">
                        This action cannot be undone. This will permanently delete your resource item our database.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-end gap-4 w-full h-fit">
                        <Button variant={"destructive"} onClick={() => setDialogOpened(prev => false)}>Cancel</Button>
                        <Button variant={"default"} onClick={handleDelete}>Confirm</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}