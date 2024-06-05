import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAnimation } from "@/constants/animation";

interface ITagFormField {
  form: UseFormReturn<any>;
  value: string;
  placeholder: string;
}

interface ITag {
  name: string;
}

export default function TagFormField(props: Readonly<ITagFormField>) {
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { errorPopUp } = useAnimation();

  useEffect(() => {
    props.form.setValue(props.value, tags);
  }, [tags, props.form, props.value]);

  useEffect(() => {
    const subscription = props.form.watch((value, { name }) => {
      if (name === undefined) {
        setTags([]);
        setInputValue("");
      }
    });
    return () => subscription.unsubscribe();
  }, [props.form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim()) {
      setTags([...tags, { name: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag.name !== tagToRemove));
  };

  const {
    formState: { errors },
  } = props.form;
  const error = errors[props.value];

  return (
    <FormField
      control={props.form.control}
      name={props.value}
      render={() => (
        <FormItem>
          <FormControl className="">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder={props.placeholder}
                  className="w-full h-10"
                  autoComplete={props.value}
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="h-10 bg-g2"
                >
                  Add
                </Button>
              </div>
              {error && (
                <motion.div
                  variants={errorPopUp}
                  initial={"hidden"}
                  animate={"visible"}
                >
                  <FormMessage className="text-red-500 text-[10px]" />
                </motion.div>
              )}
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, index) => (
                  <p
                    key={index}
                    className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md cursor-pointer"
                    onClick={() => handleRemoveTag(tag.name)}
                  >
                    {tag.name} &times;
                  </p>
                ))}
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
