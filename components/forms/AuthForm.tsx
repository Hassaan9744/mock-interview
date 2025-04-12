"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "../FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Sign up successful");
        router.push("/sign-in");
        console.log("[Sign up]values", values);
      } else {
        toast.success("Sign in successful");
        router.push("/");
        console.log("[Sign in]values", values);
      }
    } catch (error) {
      console.log("[AuthForm]", error);
      toast.error(`There was an error.${error}`);
    }
    console.log(values);
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center ">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">Prep Wise</h2>
        </div>
        <h3>Practice for your next Job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 form space-y-6"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="yourmail@example.com"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center ">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
