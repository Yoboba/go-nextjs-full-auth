interface ILine {
    height: string;
    color: string;
}
export default function Line(props:Readonly<ILine>) {
    return (
        <div className={`w-full ${props.height} rounded-full ${props.color}`}/>
    )
}