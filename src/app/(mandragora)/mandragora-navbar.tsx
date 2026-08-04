import { BiSolidCalendar, BiSolidHomeHeart } from "react-icons/bi";
import { ImLeaf } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarLink from "@/components/ui/navbar-link";
import NavbarDateLink from "@/components/ui/navbar-date-link";

export default function MandragoraNavbar() {
  return (
    <nav className="h-full flex items-center justify-between bg-primary px-lg text-background">
      <NavbarLink href="/home">
        <BiSolidHomeHeart fontSize={"35px"} />
        <span>Home</span>
      </NavbarLink>
      <NavbarLink href="/add">
        <AiOutlinePlus fontSize={"38px"} />
        <span>Agregar</span>
      </NavbarLink>
      <NavbarLink href="/plants">
        <ImLeaf fontSize={"30px"} />
        <span>Mis plantas</span>
      </NavbarLink>
      <NavbarDateLink href="/calendar">
        <BiSolidCalendar fontSize={"35px"} />
        <span>Calendario</span>
      </NavbarDateLink>
    </nav>
  );
}
