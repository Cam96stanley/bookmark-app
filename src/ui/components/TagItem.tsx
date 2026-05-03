import { cn } from "@/lib/utils";
import { Checkbox } from "../primitives/Checkbox";

export default function TagItem({
  label,
  total,
}: {
  label: string;
  total: number;
}) {
  return (
    <div className={cn("text-preset-3 flex items-center")}>
      <Checkbox />
      <span className="ml-2">{label}</span>
      <span className="text-preset-5 bg-background rounded-full px-2.25 py-1 ml-auto">
        {total}
      </span>
    </div>
  );
}
