import { useEffect, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useAnimation } from "@/constants/animation";

interface IMyFormField {
    form:UseFormReturn<any>;
    value: string;
    placeholder: string;
    icon: React.ReactNode;
}

export default function MyFormField(props:Readonly<IMyFormField>) {
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
                        <Input placeholder={props.placeholder} className="w-full" autoComplete={props.value} {...field}/>
                        {props.icon}
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