"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format";
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

interface PriceFormProps{
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number()
})


const PriceForm = ({initialData, courseId}: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit= () =>{
        setIsEditing(currValue=> !currValue);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
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
            Course Price
                <Button variant='ghost' onClick={toggleEdit}>
                    {
                        isEditing ? (
                            <>Cancel</>
                        ):
                        
                        (
                        <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit price
                        </>
                        )
                    }
                </Button>
        </div>

        {
            !isEditing && (
                <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>
                    {initialData.price? formatPrice(initialData.price) : "No Price"}
                </p>
            )
        }

        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="price" render={({field})=>
                        <FormItem>
                            <FormControl>
                                <Input type="number" step="100" disabled={isSubmitting} placeholder="Set the price of the course in INR" {...field}/>
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

export default PriceForm