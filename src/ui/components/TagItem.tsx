import { cn } from "@/lib/utils";
import { Checkbox } from "../primitives/Checkbox";
import { useFilter } from "@/context/FilterContext";

export default function TagItem({
  label,
  total,
}: {
  label: string;
  total: number;
}) {
  const { selectedTags, toggleTag } = useFilter();
  const isSelected = selectedTags.includes(label);

  return (
    <div 
      role="button"
      tabIndex={0}
      className={cn("text-preset-3 flex items-center cursor-pointer")}
      onClick={() => toggleTag(label)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") toggleTag(label);
      }}
    >
      <Checkbox checked={isSelected} onCheckedChange={() => toggleTag(label)} />
      <span className="ml-2">{label}</span>
      <span className="text-preset-5 bg-background rounded-full px-2.25 py-1 ml-auto">
        {total}
      </span>
    </div>
  );
}
