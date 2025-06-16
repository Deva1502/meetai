"use client"
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loadiing-state';
import { useTRPC } from '@/trpc/client'
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';

const AgentView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
      <DataTable columns={columns} data={data} />
      {data.length===0 &&(
        <EmptyState title='Create your first agent' description='Agents will appear here once created.' />
      )}
    </div>
  )
}

export default AgentView

export const AgentViewLoading = ()=>{
    return(
        <LoadingState title = "Loading Agents" description = "Please wait while we fetch the agents." />
    )
}

export const AgentViewError = () => {
    return (
        <ErrorState 
            title="Error Loading Agents"
            description="There was an error loading the agents. Please try again later."
        />
    )
}
