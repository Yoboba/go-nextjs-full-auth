import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { motion } from "framer-motion";
import { useAnimation } from "../../constants/animation";

interface IMyFormCheckBox {
    form:UseFormReturn<any>;
    value: string;
    text: string;
    description?: string;
}

export default function MyFormCheckBox(props:Readonly<IMyFormCheckBox>) {
    const [value, setValue] = useState(true);
    const {errorPopUp} = useAnimation();
    
    useEffect(() => {
        setValue(!props.form.formState.errors[props.value])
    },[props.form.formState.errors[props.value]])

    return (
        <FormField control={props.form.control} name={props.value} render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
                <FormControl>
                    <Checkbox
                        className=" border-grey-100"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs text-[#6F6F6F] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {props.text}
                    </FormLabel>
                    <FormDescription className="text-[10px] text-muted-foreground underline cursor-pointer">
                        {props.description}
                    </FormDescription>
                    {!value && ( 
                        <motion.div variants={errorPopUp} initial={"hidden"} animate={"visible"}>
                            <FormMessage className="text-red-500 text-[10px] pt-1"/>
                        </motion.div>
                    )}
                </div>
            </FormItem>
        )}/>
    )
}