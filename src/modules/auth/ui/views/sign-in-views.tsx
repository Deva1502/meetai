"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export const SignInViews = () => {
    const router = useRouter();
    const [error,setError] = useState<string | null>(null);
    const [pending,setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setPending(true);
    setError(null);
    authClient .signIn.email(
        {
            email:data.email,
            password:data.password,
        },
        {
            onSuccess:()=>{
                setPending(false);
                router.push("/");
            },
            onError:({error})=>{
                setError(error.message);
            }
        }
    )
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid md:grid-cols-2 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error &&(
                    <Alert className=" bg-destructive/15 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}
                <Button type="submit" className="w-full bg-blue-500 cursor-pointer">
                    SignIn
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2 ">Or Continue with</span>
                </div>
                <div className="grid grid-cols-2 gap-4 c">
                    <Button variant="outline" type="button" className="cursor-pointer">Google</Button>
                    <Button variant="outline" type="button" className=" cursor-pointer">Github</Button>

                </div>
                <div>
                    Don&apos;t have an account? <Link href="/auth/sign-up" className="text-blue-500">Sign Up</Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-600 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-2xl text-white">Meet.ai</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:hover:text-primary text-center text-xs text-balance *:underline *:underline-offset-4">By continuing, you agree to our <a href="#">Terms of Service</a>  and <a href="#">Privacy Policy</a> </div>
    </div>
  );
};
