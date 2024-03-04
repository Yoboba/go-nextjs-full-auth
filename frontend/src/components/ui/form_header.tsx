interface IFormHeader {
    title: string;
    description: string;
    icon: React.ReactNode
}

export default function FormHeader(props: Readonly<IFormHeader>) {
    return (
        <div className="flex flex-col gap-4 items-center">
            {props.icon}
            <div className="flex flex-col gap-1 items-center w-full">
                <h1 className="text-neutral-700 text-[32px] font-semibold">{props.title}</h1>
                <p className="text-[#909090] text-xs font-semibold text-center">{props.description}</p> 
            </div>
        </div>
    )
}