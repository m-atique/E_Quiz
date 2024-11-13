
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

export default function SuperAdminHeader() {
  const [showmodal,setshowModal] = useState(false)
  const {data} = useSession()

  console.log(data)
  
  return (
    <div className="flex w-full items-center justify-between pl-5 py-3 bg-qblue">
      <div className=" text-4xl font-sans font-semibold uppercase">
        e_Quiz Repository
      </div>

      {/* Align Menubar to the right */}
      <Menubar className="menubar  shadow-none bg-transparent outline-none border-none ml-auto">

     
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'./super_admin/epaper'}>
              <div className="flex items-center space-x-1 text-black">
               
                <span>E Paper</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'./auth/signup'}>
              <div className="flex items-center space-x-1 text-black">
               
                <span>Registration</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu className="hover:bg-transparent">
    
    <MenubarTrigger className="hover:bg-transparent" onClick={()=>{
                setshowModal(true)
              }}>
    <div className="flex items-center space-x-2 bg-qash rounded-l-full p-1 px-3 text-black" >
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
        cancel="cancel"
        type ='signout'
        />
    </div>
  );
}
