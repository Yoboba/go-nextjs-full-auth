interface HeaderSectionProps {
    tagName : string
}
export default function HeaderSection(props:Readonly<HeaderSectionProps>) {
    const decodedTagName = decodeURIComponent(props.tagName);

    return (
        <header className="w-full h-1/4 flex items-center justify-center text-4xl font-bold text-g1 ">
            &quot;{decodedTagName}&quot;
        </header>
    )
}