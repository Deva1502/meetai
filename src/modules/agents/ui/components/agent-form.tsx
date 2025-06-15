import React from "react";
import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
// import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { Button } from "react-day-picker";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
//   const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async() => {
        await queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions(),
        );
        if(initialValues?.id){
            await queryClient.invalidateQueries(
                trpc.agents.getOne.queryOptions({
                    id: initialValues.id,
                })
            )
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create agent");

        //todo if error is forbidden redirect to "/upgrade"
      },
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      console.log("TODO : update agent");
    } else {
      createAgent.mutate(values);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16  h-10"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <textarea {...field} placeholder="Enter your instructions" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-5">
          {onCancel && (
            <Button
              variant={"ghost"}
              type="button"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
