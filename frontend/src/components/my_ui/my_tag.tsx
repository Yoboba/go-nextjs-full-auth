export default function MyTag({tag_name}: {tag_name: string}) {
    return (
        <div className="rounded-full bg-g5 px-2 py-1 hover:underline cursor-pointer">
            <p className=" font-medium text-sm text-g2">{tag_name}</p>
        </div>
    )
}