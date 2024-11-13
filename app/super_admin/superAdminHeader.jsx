
'use client'
import { Modal } from "@/components/ui/alert";
import {
  Menubar,
  MenubarTrigger,
  MenubarMenu,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useState } from "react";
import { MdExitToApp, MdLogin, MdAppRegistration, MdPassword } from "react-icons/md";
import {  signOut, useSession } from "next-auth/react";



export const Heading= ({ pathname }) => {
  return (
    <div className="text-3xl font-sans text-qfocus font-semibold uppercase flex flex-row gap-3 items-center justify-start">
      <Link href={pathname} className="bg-[url('/logo.png')] w-8 h-8 bg-cover">
        {/* This div acts as a logo icon */}
      </Link>
      <span className=" lowercase font-mutka text-4xl -rotate-[25deg] ">e</span>
      <span>Quiz Repository</span>
    </div>
  );
};

export default function SuperAdminHeader() {
  const [showmodal,setshowModal] = useState(false)
  const {data} = useSession()


  
  return (
    <div className="flex w-full items-center justify-between pl-5 py-3 h-20 bg-[#132066]">
      <Heading pathname ='/super_admin'/>

      {/* Align Menubar to the right */}
      <Menubar className="menubar  shadow-none bg-transparent outline-none border-none ml-auto  p-0">

     
        <MenubarMenu  >
          <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
            <Link href={'/super_admin/epaper'}>
              <div className="flex items-center space-x-1 text-qfocus ">
               
                <span>Quiz Maker</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu  >
        <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
            <Link href={'/super_admin/create_user'}>
              <div className="flex items-center space-x-1 text-qfocus h">
               
                <span>Registration</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
    
    <MenubarTrigger className="  bg-qfocus h-10 rounded-l-full  " onClick={()=>{
                setshowModal(true)
              }}>
    <div className="flex items-center space-x-2  rounded-l-full p-1 px-3 text-[#132066] hover:text-indigo-800 " >
                <span className="capitalize">{data?.user?.role}</span>
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
        cancel="cancel"
        type ='signout'
        />
    </div>
  );
}
