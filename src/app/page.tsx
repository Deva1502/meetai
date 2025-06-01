"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";

export default function Home() {

  
    const { data: session} = authClient.useSession()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      name,
      password
    },{
      onError:()=>{
        window.alert("Something went wrong")
      },
      onSuccess:()=>window.alert("Success")
    })
  }

  if(session){
    return(
      <div>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>Sign out</Button>
      </div>
    )
  }
  
  return (
    <div className="P-4 flex flex-col gap-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
