"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string
}

const SidebarItem = ({icon: Icon, label, href} : SidebarItemProps) => {
    const pathName = usePathname(); //usePathname is a Client Component hook that lets you read the current URL's
    const router = useRouter(); //The useRouter hook allows you to programmatically change routes inside Client

    const isActive = (pathName ==="/" && href==="/") || pathName === href || pathName?.startsWith(`${href}/`) ;

    const onClick = () =>{
        router.push(href);
    }

  return (
    <button onClick={onClick} type="button" className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
    )}>
        <div className="flex items-center gap-x-2 py-4">
            <Icon size={22} className={cn("text-slate-500", isActive && "text-slate-700")}/>
            {label}
        </div>

        <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-all", isActive && "opacity-80")} />

    </button>
  )
}

export default SidebarItem