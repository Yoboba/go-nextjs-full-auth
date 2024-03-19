import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    icon : React.ReactNode;
    text : string;
    route : string;
}

export default function BackButton(props:BackButtonProps) {
    return (
        <Link href={props.route}>
                <Button variant='ghost' className="inline-flex items-center gap-2 text-[#949494] font-medium hover:bg-transparent">
                    {props.icon}
                    {props.text}
                </Button>
            </Link>
    )
}