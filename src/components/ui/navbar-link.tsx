"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function NavbarLink({
  href,
  text,
  children,
}: React.ComponentProps<typeof Link> & { text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "h-navlink flex items-center gap-1 font-bold",
        isActive && "rounded-lg bg-background px-2 text-primary",
      )}
    >
      {children}
      <motion.span
        className={cn(
          "w-0 opacity-0 overflow-hidden whitespace-nowrap",
          isActive && "opacity-100",
        )}
        animate={{ width: isActive ? "auto" : 0 }}
      >
        {text}
      </motion.span>
    </Link>
  );
}
