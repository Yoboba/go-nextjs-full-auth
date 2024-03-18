import { useEffect, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { useAnimation } from "@/constants/animation";
import { Textarea } from "../ui/textarea";

interface IMyFormField {
    form:UseFormReturn<any>;
    value: string;
    placeholder: string;
    type?: string;
}

export default function MyFormTextArea(props:Readonly<IMyFormField>) {
    const [value, setValue] = useState(true);
    const {errorPopUp} = useAnimation();
    
    useEffect(() => {
        setValue(!props.form.formState.errors[props.value])
    },[props.form.formState.errors[props.value]])

    return (
        <FormField control={props.form.control} name={props.value} render={({ field }) => (
            <FormItem>
                <FormControl>
                    <div className="relative">
                        <Textarea placeholder={props.placeholder} className="w-full h-64" autoComplete={props.value} {...field}/>
                    </div>
                </FormControl>
                {!value && (
                    <motion.div variants={errorPopUp} initial={"hidden"} animate={"visible"}>
                        <FormMessage className="text-red-500 text-[10px]"/>
                    </motion.div>
                )}
            </FormItem>
        )}/>
    )
}