import Link from "next/link";

interface MyTagProps {
    id : number
    name : string
}
export default function MyTag(props: Readonly<MyTagProps>) {
    return (
        <Link href={`/tag/${props.id}/${props.name}`}className="rounded-full bg-g5 px-2 py-1 hover:underline cursor-pointer ">
            <p className=" font-medium text-sm text-g2">{props.name}</p>
        </Link>
    )
}