'use client'
import {
  Menubar,
  MenubarTrigger,
  MenubarMenu,
} from "@/components/ui/menubar";
import Link from "next/link";
import { MdExitToApp, MdLogin, MdAppRegistration, MdPassword } from "react-icons/md";
import { signOut,useSession } from "next-auth/react";
import { useState } from "react";
import { Modal } from "@/components/ui/alert";
import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import { Heading } from "../super_admin/superAdminHeader";


export default function MenubarAdmin() {
  const [showmodal,setshowModal] = useState(false)

  const {data} = useSession()


  
  return (
    <div className="flex w-full items-center justify-between pl-5 py-3 h-20 bg-[#132066]">
     <Heading pathname ='/admin'/>

      {/* Align Menubar to the right */}
      <Menubar className="menubar  shadow-none bg-transparent outline-none border-none ml-auto  p-0">

     
        <MenubarMenu  >
          <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-2 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
            <Link href={'/admin/signup'}>
            <div className="flex items-center space-x-1 text-qfocus ">
            <BiSolidUser size={25} />
                <span>Create User</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* Change Password Menu Item */}
        <MenubarMenu>
        <MenubarTrigger className = 'data-[state=open]:bg-transparent data-[state=open]:border-b-4 data-[state=open]:border-b-yellow-500 data-[state=open]:h-20 hover:text-yellow-200 rounded-none' >
            <Link href={'/admin/changePassword'}>
            <div className="flex items-center space-x-1 text-qfocus ">
                <MdPassword size={25} />
                <span>Change Password</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* Sign Out Menu Item updated by ateeq*/}
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
{/* modal added by ateeq */}
<Modal  open={showmodal} 
        onClose={() => {setshowModal(false)}}
        title='Log Out'
        detail='Are you sure to Log out'
        onOk={() => {setshowModal(false);signOut()}}
        ok="Yes"
        cancel="cancel"
        type ='signout'
        />
    </div>
  );
}

