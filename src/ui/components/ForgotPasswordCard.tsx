import Image from "next/image";
import Link from "next/link";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";

const inputs = [{ id: 1, label: "Email", placeholder: "Jdoe@example.com" }];

export default function ForgotPasswordCard() {
  return (
    <div className="w-[343px] md:w-[448px] bg-secondary rounded-sm border px-5 py-8">
      <Image src="/logo-light-theme.svg" alt="" width={214} height={32} />
      <div className="py-8">
        <h1 className="text-preset-1">Forgot your password?</h1>
        <p className="text-preset-4-md text-light-text my-1.5">
          Enter your email address below and we’ll send you a link to reset your
          password.
        </p>
      </div>
      <form action="">
        {inputs.map((input) => (
          <div key={input.id} className="pb-4">
            <label className="text-preset-4" htmlFor="">
              {input.label} <span className="text-red-500">*</span>
            </label>
            <Input className="mt-2" placeholder={input.placeholder} />
          </div>
        ))}
        <div className="w-full">
          <Button className="w-full">Send reset link</Button>
        </div>
      </form>
      <div className="flex flex-col items-center pt-8 gap-3">
        <Link className="text-preset-4" href={"/login"}>
          Back to login
        </Link>
      </div>
    </div>
  );
}
