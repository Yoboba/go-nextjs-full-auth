import { IconSquareForbid2 } from "@tabler/icons-react";

export default function Logo() {
    return (
        <div className="flex justify-end items-end gap-1">
            <IconSquareForbid2 size={50} className="text-g2"/>
            <h2 className=" font-bold text-2xl text-g2">L O C K</h2>
        </div>
    )
}