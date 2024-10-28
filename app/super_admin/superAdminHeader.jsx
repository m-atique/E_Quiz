import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import '../../globals.css'
  import Link from "next/link"
  import { HiHome } from "react-icons/hi2";
import { BiExit, BiExitFullscreen } from "react-icons/bi";
import { DoorOpen } from "lucide-react";
import { MdExitToApp } from "react-icons/md";
  
  export function MenubarSuperAdmin() {
    return (
      <div className="flex w-full flex-row items-center justify-between p-5 bg-qblue">



 <div className='text-qwhite w-2/5  flex items-center   text-4xl font-sans font-semibold uppercase '>
  
    e_Quiz Respository
    </div>
  

   
      <Menubar className='menubar' >
     
      
        <MenubarMenu >
          <MenubarTrigger className='menubarItems'>
        <Link href={'/admin/epaper'}>
           e_Paper
        </Link>
            </MenubarTrigger>
          
        </MenubarMenu>
       
       <MenubarMenu>
    
    <MenubarTrigger>
      <Link href={'/auth/signout'} className="flex flex-row items-center"> Super Admin
    <MdExitToApp size ={30} color={"purple"} title="Logout" className=''/>
      </Link>
    </MenubarTrigger>
  </MenubarMenu>
      </Menubar>

    
      </div>
    )
  }
  
  