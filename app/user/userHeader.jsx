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
import { signOut } from "next-auth/react";
  
  export function MenubarUser() {
    const [showmodal,setshowModal] = useState(false)
    return (
      <div className="flex w-full flex-row items-center justify-between p-5 bg-qblue">



 <div className='text-qwhite w-2/5  flex items-center   text-4xl font-sans font-semibold uppercase '>
    {/* <Link href={'/admin'} className="    bg-cover   w-10 h-12 mr-5 drop-shadow drop " /> */}
     e_Quiz Repository
    </div>
  

   
      <Menubar className='menubar' >
     
      
        <Link href={'/user/addMcq'}>
        <MenubarMenu >
          <MenubarTrigger className='menubarItems'>
           ADD QUIZ
            </MenubarTrigger>
          
        </MenubarMenu>
        </Link>

        <Link href={'/user/viewMcq'}>
        <MenubarMenu >
          <MenubarTrigger className='menubarItems'>
           View Quiz
            </MenubarTrigger>
          
        </MenubarMenu>
        </Link>
       
       <MenubarMenu>
    
    <MenubarTrigger>
    <button className="flex items-center space-x-1 text-purple-500" onClick={()=>{
                setshowModal(true)
              }}>
                <MdExitToApp size={25} />
                <span>Logout</span>
              </button>
    </MenubarTrigger>
  </MenubarMenu>
      </Menubar>

    {/* modal added by ateeq */}
    <Modal  open={showmodal} 
        onClose={() => {setshowModal(false)}}
        title='Log Out'
        detail='Are you sure to Log out'
        onOk={() => {signOut();setshowModal(false)}}
        ok="Yes"
        cancel="cancel"
        type ='signout'
        />
      </div>
    )
  }
  
  