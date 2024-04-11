import MobileSidebar from './mobileSidebar'
import NavbarRoutes from '../../../components/navbarRoutes'
const navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <MobileSidebar/>
        <NavbarRoutes/>
    </div>

  )
}

export default navbar