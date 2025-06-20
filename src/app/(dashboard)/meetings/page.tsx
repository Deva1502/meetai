import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/meeting/params";
import MeetingListHeader from "@/modules/meeting/ui/components/meeting-list-header";
import {
  MeetingView,
  MeetingViewError,
  MeetingViewLoading,
} from "@/modules/meeting/ui/view/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams:Promise<SearchParams>
}
const Page = async({searchParams}:Props) => {
  const params = await loadSearchParams(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...params
  }));
  const session = await auth.api.getSession({
        headers: await headers()
      });
      if(!session)redirect("/auth/sign-in");
  return (
    <>
    <MeetingListHeader/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingViewError />}>
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
