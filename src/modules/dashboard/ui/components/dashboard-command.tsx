"use client";
import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import React, { Dispatch } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const DashBoardCommand = ({open,setOpen}: Props) => {
  return (
    <div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a Meeting or Agent" />
      <CommandList>
        <CommandItem>
            test
        </CommandItem>
      </CommandList>
      </CommandDialog>
    </div>
  );
};

export default DashBoardCommand;
