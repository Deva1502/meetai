"use client"
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loadiing-state';
import { useTRPC } from '@/trpc/client'
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const AgentView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      {JSON.stringify(data, null, 2)}
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
