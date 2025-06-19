"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loadiing-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/Update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/Active-state";
import { CancelledState } from "../components/Cancelled-state";
import { ProcessingState } from "../components/Processing-state";

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are You Sure??",
    `This will permanently remove the Meeting ${data.name}`
  );
  const queryClient = useQueryClient();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to remove Meeting");
      },
    })
  );
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };
  const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false);

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialog}
        onOpenChange={setUpdateMeetingDialog}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingid={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialog(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState/>}
        {isProcessing && <ProcessingState/>}
        {isCompleted && <div>Completed</div>}
        {isActive && (<ActiveState meetingId={meetingId} />)}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => setUpdateMeetingDialog(true)}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
};

// export default MeetingIdView
export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we fetch the Meetings."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="There was an error loading the Meetings. Please try again later."
    />
  );
};
