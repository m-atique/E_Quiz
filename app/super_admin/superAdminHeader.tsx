
'use client'
import {
  Menubar,
  MenubarTrigger,
  MenubarMenu,
} from "@/components/ui/menubar";
import Link from "next/link";
import { MdExitToApp, MdLogin, MdAppRegistration, MdPassword } from "react-icons/md";

export default function SuperAdminHeader() {
  return (
    <div className="flex w-full items-center justify-between p-2 bg-qblue">
      <div className="text-qwhite text-4xl font-sans font-semibold uppercase">
        e_Quiz Repository
      </div>

      {/* Align Menubar to the right */}
      <Menubar className="menubar ml-auto">

     
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={'./super_admin/epaper'}>
              <div className="flex items-center space-x-1 text-purple-500">
               
                <span>E Paper</span>
              </div>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

      </Menubar>
    </div>
  );
}
