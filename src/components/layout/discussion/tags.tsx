"use Client"

import { ReactElement } from "react";

export interface TagI { icon:ReactElement, title:string | null | undefined }
export interface TagInputProps<T> { 
    state: string, 
    setState: React.Dispatch<React.SetStateAction<string>>,
    name:string, 
    tag_list:T[]}

export default function Tag ({ title, icon }:TagI) {
    return (
        <span className="flex items-center justify-center w-fit h-10 px-4 gap-1 rounded-md border">
            { icon } { title }
        </span>
    )
}

export function TagInput ({ state, setState, name, tag_list }:TagInputProps<TagI>) {
    return (
        <span className="flex flex-wrap justify-start h-fit w-fit gap-4 py-4">
            { 
                tag_list.map((e,i) => (
                    <span key={ i } className="flex flex-wrap w-fit h-fit">
                        <input onChange={ () => {setState( prev => prev = e.title as string)} } type="radio" name={name} id={`id_${i}`} hidden className="peer"/>
                        <label htmlFor={ `id_${i}` } className="flex w-full h-full  peer-checked:scale-110 cursor-pointer transition-all duration-150">
                            <Tag icon={ e.icon } title={e.title} />
                        </label>
                    </span>
                )) 
            }
        </span>
    )
}
