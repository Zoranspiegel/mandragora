import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "secondary" | "outlined";
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
        "w-full h-13 flex items-center justify-center rounded-2xl text-md font-bold cursor-pointer shadow-lg shadow-black/40",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "outlined" && "border-2 border-primary text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
