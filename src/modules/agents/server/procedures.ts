import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { z } from "zod";
import {eq, getTableColumns, sql} from "drizzle-orm"

 export const agentsRouter = createTRPCRouter({

  //TODO change getmany to use protectedProcedure

   // Define your procedures here
   getOne : protectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{
    const [existingAgents] = await db
    .select({
      meetingCount:sql<number>`5`,
      ...getTableColumns(agents),
    })
    .from(agents)
    .where(eq(agents.id, input.id));
    return existingAgents;
   }),
   getMany : protectedProcedure.query(async()=>{
    const data = await db
    .select({
      meetingCount:sql<number>`5`,
      ...getTableColumns(agents),
    })
    .from(agents);
    return data;
   }),

   create:protectedProcedure
   .input(agentInsertSchema)
   .mutation(async({input,ctx})=>{
    const [createdAgent] = await db
    .insert(agents)
    .values({
      ...input,
      userId: ctx.auth.user.id,
    }).returning();
    return createdAgent;
   }),
 });
