"use client"
import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    icon : React.ReactNode;
    text : string;
    route : string;
    onClick? : () => void 
}

export default function BackButton(props:BackButtonProps) {
    return (
        <Link href={props.route} onClick={props.onClick}>
                <Button variant='ghost' className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium hover:bg-transparent">
                    {props.icon}
                    {props.text}
                </Button>
            </Link>
    )
}