import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "secondary" | "outlined" | "leaf" | "icon";
  asChild?: boolean;
}

export function Button({
  variant = "default",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      className={cn(
        "h-button flex items-center justify-center gap-1 rounded-2xl text-xl font-bold cursor-pointer",
        variant === "default" && "w-full bg-primary text-primary-foreground",
        variant === "secondary" &&
          "w-full bg-secondary text-secondary-foreground",
        variant === "leaf" && "w-full bg-leaf text-foreground",
        variant === "outlined" && "w-full border-2 border-primary text-primary",
        variant === "icon" && "w-button h-button text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
