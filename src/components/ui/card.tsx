import { cn } from "@/lib/utils";
import Image from "next/image";

function Card({
  children,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-size={size}
      className={cn(
        "relative w-full flex flex-col rounded-4xl bg-card p-4 shadow-md data-[size=sm]:w-44 data-[size=sm]:aspect-1/1.45",
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardImage({ src, alt, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <div className="relative w-full aspect-square rounded-4xl overflow-hidden mb-4">
      <Image src={src} alt={alt} fill {...props} />
    </div>
  );
}

function CardHeader({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col")} {...props}>
      {children}
    </div>
  );
}
function CardContent({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col")} {...props}>
      {children}
    </div>
  );
}
function CardFooter({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col")} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardFooter, CardImage };
