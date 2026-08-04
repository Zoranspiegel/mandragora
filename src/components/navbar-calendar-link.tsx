"use client";

import dateFormater from "@/lib/dateFormater";
import { useState } from "react";
import NavbarLink from "./ui/navbar-link";
import { BiSolidCalendar } from "react-icons/bi";

export default function NavbarCalendarLink() {
  const [today] = useState(dateFormater(new Date().getTime()));
  const href = `/calendar/${today}`;

  return (
    <NavbarLink href={href}>
      <BiSolidCalendar fontSize={"35px"} />
      <span>Calendario</span>
    </NavbarLink>
  );
}
