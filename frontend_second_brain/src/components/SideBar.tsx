import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DocumentIcon } from "../icons/DocumentIcon"; 
import { All } from "../icons/AllIcon";

import { SidebarItem } from "./SidebarItem";

export function Sidebar({ setFilterType }: { setFilterType: (type: "youtube" | "twitter" | "all" |"document") => void }) {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
              <SidebarItem text="All" icon={<All/>} onClick={() => setFilterType("all")} />
                <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilterType("twitter")} />
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => setFilterType("youtube")} />
                <SidebarItem text="Document" icon={<DocumentIcon />} onClick={() => setFilterType("document")} />

            </div>
        </div>
    
}