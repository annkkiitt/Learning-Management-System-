"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { z } from "zod"

interface DescriptionFormProps{
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    description: z.string().min(1,{
        message: "Description is required",
    })
})


const DescriptionForm = ({initialData, courseId}: DescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit= () =>{
        setIsEditing(currValue=> !currValue);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course Updated");
            toggleEdit();
            router.refresh();
        }catch{
            toast.error("Unable to save");
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Course description
                <Button variant='ghost' onClick={toggleEdit}>
                    {
                        isEditing ? (
                            <>Cancel</>
                        ):
                        
                        (
                        <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit description
                        </>
                        )
                    }
                </Button>
        </div>

        {
            !isEditing && (
                <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                    {initialData.description || "No Description"}
                </p>
            )
        }

        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="description" render={({field})=>
                        <FormItem>
                            <FormControl>
                                <Textarea disabled={isSubmitting} placeholder="E.g. 'This course about...' " {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}>
                        </FormField>
                        
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} >Save</Button>
                        </div>
                    </form>
                </Form>
            )
        }
    </div>
  )
}

export default DescriptionForm