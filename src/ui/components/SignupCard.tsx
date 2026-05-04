"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { createUserSchema } from "@/lib/validators/user";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";

export default function SignupCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const inputs = [
    {
      id: "name",
      label: "Full name",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
      type: "text",
    },
    {
      id: "email",
      label: "Email address",
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

  const signup = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const parsed = createUserSchema.safeParse({ name, email, password });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Failed to create account.");
        return;
      }

      toast.success("Account created successfully.");
      router.push("/login");
    } catch (_error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-[343px] md:w-[448px] bg-secondary rounded-sm border px-5 py-8">
      <Image src="/logo-light-theme.svg" alt="" width={214} height={32} />
      <div className="py-8">
        <h1 className="text-preset-1">Create your account</h1>
        <p className="text-preset-4-md text-light-text my-1.5">
          Join us and start saving your favorite links — organized, searchable,
          and always within reach.
        </p>
      </div>
      <form onSubmit={signup}>
        {inputs.map((input) => (
          <div key={input.id} className="pb-4">
            <label className="text-preset-4" htmlFor={input.id}>
              {input.label} <span className="text-red-500">*</span>
            </label>
            <Input
              value={input.value}
              onChange={input.onChange}
              id={input.id}
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
            Create Account
          </Button>
        </div>
      </form>
      <div className="flex justify-center pt-8">
        <p className="text-preset-4-md">
          Already have an account?{" "}
          <Link className="text-preset-4 hover:underline" href={"/login"}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
