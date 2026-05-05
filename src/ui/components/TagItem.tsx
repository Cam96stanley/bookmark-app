import { useFilter } from "@/context/FilterContext";
import { cn } from "@/lib/utils";
import { Checkbox } from "../primitives/Checkbox";

export default function TagItem({
  label,
  total,
}: {
  label: string;
  total: number;
}) {
  const { selectedTags, toggleTag } = useFilter();
  const isSelected = selectedTags.includes(label);

  const id = `tag-${label}`;

  return (
    <label
      htmlFor={id}
      className={cn("text-preset-3 flex items-center cursor-pointer")}
    >
      <Checkbox
        id={id}
        checked={isSelected}
        onCheckedChange={() => toggleTag(label)}
      />
      <span className="ml-2">{label}</span>
      <span className="text-preset-5 bg-background rounded-full px-2.25 py-1 ml-auto">
        {total}
      </span>
    </label>
  );
}
