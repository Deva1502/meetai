"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { NewMeetingDialog } from "./New-meeting-dialog";

const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
    <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl text-slate-500">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> New Meeting
          </Button>
        </div>
        <div
          className=" flex items-center gap-x-2 p1
        "
        >
          {/* TODO filters */}
        </div>
      </div>
    </>
  );
};

export default MeetingListHeader;
