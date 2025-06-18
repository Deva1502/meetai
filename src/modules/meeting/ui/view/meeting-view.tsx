"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loadiing-state";
import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <div>
            {/* {JSON.stringify(data?.items)} */}
            Todo : Data table
        </div>
    )
}
export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we fetch the Meetings."
    />
  );
};

export const MeetingViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="There was an error loading the Meetings. Please try again later."
    />
  );
};

