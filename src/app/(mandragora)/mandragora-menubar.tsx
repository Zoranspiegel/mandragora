"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MandragoraMenubar() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-nav flex flex-row-reverse items-center justify-between p-lg text-3xl text-primary",
        pathname === "/home" && "bg-primary text-primary-foreground",
      )}
    >
      <RxHamburgerMenu />
    </div>
  );
}
