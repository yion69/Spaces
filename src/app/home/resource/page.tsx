"use client"

import Item, { ResourceItem } from "@/components/layout/resource/item";
import FormBuilder from "@/components/layout/resource/form";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { Type } from "@/lib/types";

export default function Resources () {
    
    const { data: session, status} = useSession();
    const [tag, setTag] = useState("");
    const [dialogOpened, setDialogOpened] = useState(false);
    const [type, setType] = useState<Type>(Type.BOOK);
    const [formContent, setFormContent] = useState<Record<string, string>>({});
    const [fetchResource, setFetchResource] = useState<ResourceItem<Record<string, any>>[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormContent((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleTypeSelect = (value:string) => {
        setFormContent({});
        setType(prev => value as Type);
    }

    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => { setTag(prev => e.target.value) };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(tag.trim() === "" || Object.keys(formContent).length === 0){
            toast({
                title: "Input fields cannot left empty",
            })
        }

        const req = await fetch("/api/resource",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resource_author: session?.user.name || "user_undefined",
                resource_type: type,
                resource_content: formContent,
                resource_tag: tag
            })
        })
 
        const res = await req.json();

        if(res.action_complete) {
            setDialogOpened(prev => false);
            toast({
                title: "Resource Added Successfully",
                description: "Your resource has been added to your collection successfully!",
            })
            handleFetch();
        }
    }

    const handleFetch = async () => {
         const req = await fetch("/api/resource",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const res = await req.json();
        setFetchResource(prev => res.body);
        console.log(res.body);
    }
    
    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <div className="relative flex h-screen w-full">
            <div className="flex flex-col w-full h-full p-4 rounded-lg box-border gap-4 overflow-y-scroll">
                { 
                    fetchResource.map((e,i) => (
                        <Item key={i} _id={e._id} resource_author={e.resource_author} resource_content={e.resource_content} resource_type={e.resource_type} resource_tag={e.resource_tag} />
                    ))

                }
            </div>
            <div className="flex items-center justify-center absolute bottom-5 right-10 size-24 p-4 bg-zinc-200 dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-800">
                <Dialog open={dialogOpened}>
                    <DialogTrigger className="flex flex-col items-center justify-center gap-2" onClick={() => setDialogOpened(prev => !prev)}>
                        <FolderPlus /> 
                        <span className="text-sm">Create</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col w-full h-fit gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="source">Type of Source</label>
                                <Select onValueChange={handleTypeSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Book" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={Type.BOOK}>Book</SelectItem>
                                        <SelectItem value={Type.JOURNAL}>Journal</SelectItem>
                                        <SelectItem value={Type.WEBSITE}>Website</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <form method="post" className="flex flex-col gap-2 text-sm" onSubmit={handleSubmit}>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="Author" className="w-2/12">Author(s)</label>
                                    <Input className="w-10/12" onChange={handleInputChange} name="author" />
                                </div>
                                { type == Type.BOOK ? 
                                    <>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Title" className="w-2/12">Title</label>
                                            <Input className="w-10/12" name="title" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Year" className="w-2/12">Year</label>
                                            <Input className="w-10/12" name="year" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="City" className="w-2/12">City</label>
                                            <Input className="w-10/12" name="city" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Publisher" className="w-2/12">Publisher</label>
                                            <Input className="w-10/12" name="publisher" onChange={handleInputChange} />
                                        </div>
                                    </> : type == Type.JOURNAL ?
                                    <>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Title" className="w-2/12">Title</label>
                                            <Input className="w-10/12" name="title" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Year" className="w-2/12">Journal Name</label>
                                            <Input className="w-10/12" name="name" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="City" className="w-2/12">Year</label>
                                            <Input className="w-10/12" name="year" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Publisher" className="w-2/12">Pages</label>
                                            <Input className="w-10/12" name="pages" onChange={handleInputChange} />
                                        </div>
                                    </> : 
                                    <>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Webpage" className="w-2/12">Webpage</label>
                                            <Input className="w-10/12" name="webpage" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Website" className="w-2/12">Website</label>
                                            <Input className="w-10/12" name="website" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Year" className="w-2/12">Year</label>
                                            <Input className="w-10/12" name="year" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Month" className="w-2/12">Month</label>
                                            <Input className="w-10/12" name="month" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Day" className="w-2/12">Day</label>
                                            <Input className="w-10/12" name="day" onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="Url" className="w-2/12">Url</label>
                                            <Input className="w-10/12" name="url" onChange={handleInputChange} />
                                        </div>
                                    </>
                                }
                                <div className="flex items-center mt-4 gap-2">
                                    <div className="flex items-center gap-4 w-1/2">
                                        <label htmlFor="tag" className="w-4/12">Tag</label>
                                        <Input className="w-8/12" name="tag" onChange={handleTagInput} />
                                    </div>
                                    <div className="grid grid-cols-2  gap-2 w-1/2">
                                        <Button type="submit" variant={"destructive"} onClick={()=>setDialogOpened(prev => false)}>Cancel</Button>
                                        <Button type="submit">Create</Button>
                                    </div>
                                </div>
                            </form >
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}