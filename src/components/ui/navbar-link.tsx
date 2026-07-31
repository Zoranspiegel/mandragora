"use client";

import dateFormater from "@/lib/dateFormater";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarLink({
  href,
  children,
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const [today] = useState(dateFormater(new Date().getTime()));

  return (
    <Link
      href={href === "/calendar" ? `${href}/${today}` : href}
      className={cn(
        "h-navlink flex items-center gap-1 font-bold [&>span]:hidden",
        pathname === href &&
          "rounded-lg bg-background px-2 text-primary [&>span]:block",
      )}
    >
      {children}
    </Link>
  );
}
