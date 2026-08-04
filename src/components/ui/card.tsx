import { cn } from "@/lib/utils";
import Image from "next/image";

function Card({
  className,
  children,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-size={size}
      className={cn(
        "relative w-full flex flex-col gap-3 rounded-4xl bg-card p-6 shadow-md data-[size=sm]:p-4 data-[size=sm]:w-44 data-[size=sm]:aspect-1/1.45",
        className,
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

function CardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative flex flex-col", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-2xl font-bold", className)} {...props}>
      {children}
    </div>
  );
}

function CardDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-md text-muted-foreground font-bold", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("absolute top-0 right-0 text-leaf text-xl", className)} {...props} />;
}

function CardContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
}

export {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
};
