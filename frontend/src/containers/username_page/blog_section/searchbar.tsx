"use client"
import { Input } from "@/components/ui/input"
import { IconSearch } from '@tabler/icons-react';
import { useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState("")
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(search)
    }
    return (
        <div className="flex items-center w-64 max-w-sm rounded-lg border border-g2/50 bg-white dark:bg-gray-900 ">
            <IconSearch size={20} className=" text-g2  ml-3 mr-0"/>
            <form onSubmit={handleSubmit} className=" w-full">
                <Input className="w-full border-0 h-8 focus:border-white shadow-none focus-visible:ring-0" placeholder="article's name" type="text" value={search} onChange={handleChange}/>
            </form>
        </div>
    )
}