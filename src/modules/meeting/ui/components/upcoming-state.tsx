import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    meetingId:string;
    onCancelMeeting:()=>void;
    isCancelling?:boolean

}


export const UpcomingState = ({meetingId,onCancelMeeting,isCancelling}:Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started Yet"
        description="Once Yoou start meeting A summary will Display here"
      />
      <div className=" flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
        onClick={onCancelMeeting}
        disabled={isCancelling}
        variant={"secondary"}>Cancel Meeting</Button>
        <Button disabled={isCancelling} asChild className=" w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
