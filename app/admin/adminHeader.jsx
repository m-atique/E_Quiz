'use client'
import {
  Menubar,
  MenubarTrigger,
  MenubarMenu,
} from "@/components/ui/menubar";
import Link from "next/link";
import { MdExitToApp, MdLogin, MdAppRegistration, MdPassword } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Modal } from "@/components/ui/alert";


export default function MenubarAdmin() {
  const [showmodal,setshowModal] = useState(false)
  return (
    <div className="flex w-full items-center justify-between p-2 bg-qblue">
      <div className="text-qwhite text-4xl font-sans font-semibold uppercase">
        e_Quiz Repository
      </div>

      {/* Align Menubar to the right */}
      <Menubar className="menubar ml-auto">

        {/* Sign In Menu Item */}
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'/auth/signin'}>
              <div className="flex items-center space-x-1 text-purple-500">
                <MdLogin size={25} />
                <span>Sign In</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* Sign Up Menu Item */}
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'/auth/signup'}>
              <div className="flex items-center space-x-1 text-purple-500">
                <MdAppRegistration size={25} />
                <span>Sign Up</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* Change Password Menu Item */}
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'/auth/changePassword'}>
              <div className="flex items-center space-x-1 text-purple-500">
                <MdPassword size={25} />
                <span>Change Password</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* Sign Out Menu Item updated by ateeq*/}
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
        onOk={() => {setshowModal(false);signOut()}}
        ok="Yes"
        cancel="cancel"
        type ='signout'
        />
    </div>
  );
}
