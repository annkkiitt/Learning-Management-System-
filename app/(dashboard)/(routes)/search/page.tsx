import { db } from "@/lib/db"
import { Categories } from "./_components/categories"
import { SearchInput } from "@/components/searchInput"
import { getCourses } from "@/actions/getCourses"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { CoursesList } from "@/components/coursesList"

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const page = async({
  searchParams
}: SearchPageProps) => {
  const {userId} = auth();

  if(!userId) return redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const courses = await getCourses({
    userId,
    ...searchParams
  })
  
  return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
      <SearchInput/>
    </div>
    <div className="p-6 space-y-4">
      <Categories items={categories} />

      <CoursesList items={courses} />
    </div>
    </>
  )
}

export default page