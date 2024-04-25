import { Menu } from "lucide-react"
import Sidebar from './sidebar'
import { Sheet,SheetTrigger,SheetContent } from '@/components/ui/sheet'


const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu/>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 bg-white">
            <Sidebar/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar