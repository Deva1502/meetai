import { auth } from "@/lib/auth";
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from "@/modules/meeting/ui/view/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  //todo prefetch gettranscript

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<h1><MeetingIdViewLoading/></h1>}>
        <ErrorBoundary fallback={<h1><MeetingIdViewError/></h1>}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
