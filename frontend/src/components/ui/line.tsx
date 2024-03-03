interface ILine {
    height: number;
    color: string;
}
export default function Line(props:Readonly<ILine>) {
    return (
        <div className={`w-full h-[${props.height}px] rounded-full ${props.color}`}/>
    )
}