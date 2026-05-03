import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-preset-3 font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        // light primary
        default:
          "bg-teal-light text-primary-foreground hover:bg-teal-dark aria-expanded:bg-primary",

        // Red filled
        destructive:
          "bg-destructive text-white hover:bg-red-light focus-visible:border-destructive focus-visible:ring-destructive/30 aria-expanded:bg-destructive/90",

        // White/light filled, dark text
        secondary:
          "bg-secondary text-foreground border-border hover:bg-background aria-expanded:bg-muted dark:bg-primary dark:hover:bg-dark-hover dark:text-foreground",

        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11.5 gap-1 px-4",
        sm: "h-10.5 gap-1 px-3",
        icon: "rounded-sm",
        "icon-sm": "size-7",
        "icon-md": "size-9 h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
