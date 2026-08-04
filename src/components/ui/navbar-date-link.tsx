"use client";

import dateFormater from "@/lib/dateFormater";
import NavbarLink from "./navbar-link";
import { useState } from "react";

export default function NavbarDateLink({
  href,
  children,
}: React.ComponentProps<typeof NavbarLink>) {
  const [today] = useState(dateFormater(new Date().getTime()));
  const modHref = `${href}/${today}`;

  return <NavbarLink href={modHref}>{children}</NavbarLink>;
}
