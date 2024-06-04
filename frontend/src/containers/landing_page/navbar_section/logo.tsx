import { routes } from "@/constants/routes";
import { IconSquareForbid2 } from "@tabler/icons-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={routes.ROOT} className="flex justify-end items-center gap-1">
            <IconSquareForbid2 size={50} className="text-g2"/>
            <h2 className=" font-bold text-2xl text-g2">B L O C K</h2>
        </Link>
    )
}