import { Logo } from "../icons/Logo";
import { XIcon } from "../icons/TwitterIcon";
import { YTIcon} from "../icons/YtIcon";
import { SidebarItem } from "./SidebarItem";


export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
        <SidebarItem text="X" icon={<XIcon size="lg" />} />
        <SidebarItem text="Youtube" icon={<YTIcon size="lg" />} />
        </div>
    </div>
}