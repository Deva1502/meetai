import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

 export const agentsRouter = createTRPCRouter({
   // Define your procedures here
   getMany : baseProcedure.query(async()=>{
    const data = await db
    .select()
    .from(agents);
    return data;
   }),

 });
