'use client'
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
  import '../globals.css'
  import Link from "next/link"
  import { HiHome } from "react-icons/hi2";
import { BiExit, BiExitFullscreen } from "react-icons/bi";
import { DoorOpen } from "lucide-react";
import { MdExitToApp } from "react-icons/md";
import { Modal } from "@/components/ui/alert";
import { useState } from "react";
import { signOut,useSession } from "next-auth/react";
import { Heading } from "../super_admin/superAdminHeader";
  export function MenubarUser() {
    const [showmodal,setshowModal] = useState(false)
    const {data} = useSession()
  
  
    
    return (
      <div className="flex w-full items-center justify-between pl-5 py-3 h-20 bg-[#132066]">
        <Heading  pathname='/user'/>
  
        {/* Align Menubar to the right */}
        <Menubar className="menubar  shadow-none bg-transparent outline-none border-none ml-auto  p-0">

        <MenubarMenu  >
            <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
              <Link href={'/user/'}>
                <div className="flex items-center space-x-1 text-qfocus ">
                 
                  <span>Home</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

        <MenubarMenu  >
            <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
              <Link href={'/user/addCourse'}>
                <div className="flex items-center space-x-1 text-qfocus ">
                 
                  <span>Add Course</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>


        <MenubarMenu  >
            <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
              <Link href={'/user/addSubject'}>
                <div className="flex items-center space-x-1 text-qfocus ">
                 
                  <span>Add Subjects</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
       
          <MenubarMenu  >
            <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
              <Link href={'/user/addMcq'}>
                <div className="flex items-center space-x-1 text-qfocus ">
                 
                  <span>Add MCQs</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
  
          <MenubarMenu  >
          <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
              <Link href={'/user/viewMcq'}>
                <div className="flex items-center space-x-1 text-qfocus h">
                 
                  <span>View Quiz</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
      
      <MenubarTrigger className="  bg-qfocus h-10 rounded-l-full " onClick={()=>{
                  setshowModal(true)
                }}>
      <div className="flex items-center space-x-2  rounded-l-full p-1 px-3 text-[#132066] hover:text-indigo-800 hover:scale-110" >
                  <span className="">{data?.user?.role}</span>
                  <MdExitToApp size={20}  />
                </div>
      </MenubarTrigger>
    </MenubarMenu>
  
        </Menubar>
        <Modal  open={showmodal} 
          onClose={() => {setshowModal(false)}}
          title='Log Out'
          detail='Are you sure to Log out'
          onOk={() => {signOut(); setshowModal(false)}}
          ok="Yes"
          cancel="Cancel"
          type ='Sign Out'
          />
      </div>
    );
  }
  