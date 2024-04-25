"use client"

import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
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
import { Chapter } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { z } from "zod"

interface ChapterDescriptionFormProps{
    initialData: Chapter;
    courseId: string;
    chapterId: string
}

const formSchema = z.object({
    description: z.string().min(1)
})


const ChapterDescriptionForm = ({initialData, courseId, chapterId}: ChapterDescriptionFormProps) => {

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
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter Updated");
            toggleEdit();
            router.refresh();
        }catch{
            toast.error("Unable to save");
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter description
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
                <div className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                    {!initialData.description && "No Description"}
                    {initialData.description && (
                        <Preview value={initialData.description} />
                    )}
                </div>
            )
        }

        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="description" render={({field})=>
                        <FormItem>
                            <FormControl>
                                <Editor {...field}/>
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

export default ChapterDescriptionForm