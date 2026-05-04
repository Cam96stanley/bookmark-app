"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { loginSchema } from "@/lib/validators/user";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid email or password.");
      return;
    }

    router.push("/");
  };

  const inputs = [
    {
      id: "email",
      label: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: "password",
    },
  ];

  return (
    <div className="w-[343px] md:w-[448px] bg-secondary rounded-sm border px-5 py-8">
      <Image src="/logo-light-theme.svg" alt="" width={214} height={32} />
      <div className="py-8">
        <h1 className="text-preset-1">Log in to your account</h1>
        <p className="text-preset-4-md text-light-text my-1.5">
          Welcome back! Please enter your details.
        </p>
      </div>
      <form onSubmit={login}>
        {inputs.map((input) => (
          <div key={input.id} className="pb-4">
            <label className="text-preset-4" htmlFor={input.id}>
              {input.label} <span className="text-red-500">*</span>
            </label>
            <Input
              id={input.id}
              value={input.value}
              onChange={input.onChange}
              className="mt-2"
              type={input.type}
            />
            {errors[input.id] && (
              <p className="text-red-500 text-preset-5 mt-1">
                {errors[input.id]}
              </p>
            )}
          </div>
        ))}
        <div className="w-full">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center pt-8 gap-3">
        <p className="text-preset-4-md">
          Forgot password?{" "}
          <Link
            className="text-preset-4 hover:underline"
            href={"/reset-password"}
          >
            Reset it
          </Link>
        </p>
        <p className="text-preset-4-md">
          Don't have an account?{" "}
          <Link className="text-preset-4 hover:underline" href={"/signup"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
