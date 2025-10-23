import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { PrivateLayoutSidebar } from "./sidebar";
import usersGlobalStore, { IUsersGlobalStore } from "@/global-store/users-store";
import Link from "next/link";

export function PrivateLayoutHeader() {
    const {user} = usersGlobalStore() as IUsersGlobalStore;
  const [openSideBar, setOpenSideBar] = useState(false);
  

  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      <h1 className="font-bold text-2xl text-yellow-500"><Link href="/">Portfolio Builder</Link></h1>

      <div className="flex gap-5 items-center">
        <span className="text-sm text-white">{user?.name}</span>
        <Button onClick={() => setOpenSideBar(true)}>
          <Menu size={15} className="text-white" />
        </Button>
      </div>

      {openSideBar && (
        <PrivateLayoutSidebar
          openSidebar={openSideBar}
          onClose={() => setOpenSideBar(false)}
        />
      )}
    </div>
  );
}
