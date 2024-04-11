import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : {params: {courseId: string}}
){
    try{
        const {userId} = auth();
        const {courseId} = params;
        const values = await req.json();

        if(!userId) return new NextResponse("Unauthorized User",{status: 401});

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course);

    }catch(error){
        console.log("[CourseID]", error);
        return new NextResponse("Internal Error ");
    }
}