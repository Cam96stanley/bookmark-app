import { CheckIcon } from "@phosphor-icons/react/ssr";

export type DropdownItem = {
  id: number;
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
};

type DropdownProps = {
  items: DropdownItem[];
  activeItem: string | null;
  onSelect: (item: string | null) => void;
};

export default function Dropdown({
  items,
  activeItem,
  onSelect,
}: DropdownProps) {
  return (
    <div className="bg-secondary border w-[200px] rounded-sm">
      {items.map((item) => (
        <button
          className="cursor-pointer flex items-center justify-between w-full px-4 py-2 hover:bg-background text-left"
          onClick={() => {
            item.onClick?.();
            onSelect?.(item.label === activeItem ? null : item.label);
          }}
          key={item.id}
          type="button"
        >
          <div className="flex items-center gap-2">
            {item.iconLeft && item.iconLeft}
            <p className="text-preset-4">{item.label}</p>
          </div>
          {!item.iconLeft &&
            (item.iconRight
              ? item.iconRight
              : activeItem === item.label && <CheckIcon />)}
        </button>
      ))}
    </div>
  );
}
