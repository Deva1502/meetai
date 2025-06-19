"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loadiing-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meeting-filter";
import { DataPagination } from "@/components/data-pagination";

export const MeetingView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,

  }));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* {JSON.stringify(data?.items)} */}
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
      <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />
      {data.items.length === 0 && (
        <EmptyState
          title="Creater your first Meeting"
          description="Meetings will appear here once created."
        />
      )}
    </div>
  );
};
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
