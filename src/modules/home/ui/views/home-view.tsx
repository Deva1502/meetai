"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>...Loading</p>;
  }
  return (
    <div>
      <div>
        <p>Logged in as {session?.user?.name}</p>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: { onSuccess: () => router.push("/auth/sign-in") },
            })
          }
        >
          SignOut
        </Button>
      </div>
    </div>
  );
};

export default HomeView;
