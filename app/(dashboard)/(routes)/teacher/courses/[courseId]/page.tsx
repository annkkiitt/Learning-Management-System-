
import { IconBadge } from "@/components/iconBadge";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { DollarSign, File, IndianRupee, LayoutDashboard, ListChecks, ReceiptIndianRupeeIcon } from "lucide-react";
import { redirect, usePathname } from "next/navigation"
import TitleForm from './_components/titleForm'
import DescriptionForm from './_components/descriptionForm'
import PriceForm from './_components/priceForm'
import CategoryForm from './_components/categoryForm'
import ImageForm from './_components/imageForm'
import AttachmentForm from './_components/attachmentForm'


const CourseIdPage = async ({params}: {params: {courseId: string}}) => {

    const {userId} = auth();
    if(!userId) return redirect("/");

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },

        include: {
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    const categories = await db.category.findMany({
        orderBy : {
            name: "asc"
        }
    })

    console.log('Categories',categories)

    if(!course) return redirect("/");

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6 ">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Course Setup</h1>
                <span className="text-sm text-slate-700">
                    Complete all fields {completionText}
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard}/>
                    <h2 className="text-xl">
                        Customize your course
                    </h2>
                </div>

                <TitleForm initialData={course} courseId={course.id} />

                <DescriptionForm initialData={course} courseId={course.id} />

                <ImageForm initialData={course} courseId={course.id} />

                <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                }))} />


            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={ListChecks}/>
                        <h2 className="text-xl">
                            Course Chapter
                        </h2>
                    </div>
                    <div>
                        Todo Chapters
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={IndianRupee}/>
                        <h2 className="text-xl">
                            Sell your course
                        </h2>

                    </div>
                    <PriceForm initialData={course} courseId={course.id} />
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                            <IconBadge icon={File}/>
                            <h2 className="text-xl">
                                Resources & Attachments
                            </h2>

                        </div>
                    
                <AttachmentForm initialData={course} courseId={course.id} />

                </div>

            </div>
        </div>


    </div>
  )
}

export default CourseIdPage