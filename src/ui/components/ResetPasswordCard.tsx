import Image from "next/image";
import Link from "next/link";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";

const inputs = [
  { id: 1, label: "New Password", placeholder: "**********" },
  { id: 2, label: "Confirm Password", placeholder: "**********" },
];

export default function ResetPasswordCard() {
  return (
    <div className="w-[343px] md:w-[448px] bg-secondary rounded-sm border px-5 py-8">
      <Image src="/logo-light-theme.svg" alt="" width={214} height={32} />
      <div className="py-8">
        <h1 className="text-preset-1">Reset Your Password</h1>
        <p className="text-preset-4-md text-light-text my-1.5">
          Enter your new password below. Make sure it’s strong and secure.
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
          <Button className="w-full">Reset password</Button>
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
