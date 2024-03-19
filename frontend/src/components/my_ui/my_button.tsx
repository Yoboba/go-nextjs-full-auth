import { Button } from "../ui/button";

interface MyButtonProps {
    text : string;
}

export default function MyButton(props:MyButtonProps) {
    return (
        <Button type="submit" className="w-full text-white text-md rounded-lg bg-gradient-to-r from-g3 to-g2 hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-200">
            {props.text}
        </Button>
    )
}