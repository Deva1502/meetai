"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import DashBoardCommand from "./dashboard-command";

const DashboardNavbar = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  return (
    <>
    <DashBoardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 items-center py-3 border-b bg-background">
        <Button
          className=" size-9 cursor-pointer"
          variant={"outline"}
          onClick={toggleSidebar}
        >
          {isMobile || state === "collapsed" ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:to-muted-foreground  "
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen((open)=>!open)}
        >
          <SearchIcon />
          Search
          {/* <kbd>
            <span>&#8984;</span>
            </kbd> */}
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
