import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

function FieldGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-md", className)} {...props}>
      {children}
    </div>
  );
}

function Field({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
}

function FieldHorizontal({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-4 items-center", className)} {...props}>
      {children}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-8 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("ml-2 text-md font-bold text-destructive/70", className)}
      {...props}
    >
      {content}
    </div>
  );
}

function FieldText({
  children,
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & { size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        "ml-2 flex items-center gap-2 whitespace-nowrap",
        size === "lg" && "text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function FieldLink({
  children,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn("font-bold", className)} {...props}>
      {children}
    </Link>
  );
}

export { FieldGroup, Field, FieldError, FieldText, FieldLink, FieldHorizontal };
