import { BiSolidCalendar, BiSolidHomeHeart } from "react-icons/bi";
import { ImLeaf } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarLink from "@/components/ui/navbar-link";
import NavbarDateLink from "@/components/ui/navbar-date-link";
import { ToyBrick } from "lucide-react";

export default function MandragoraNavbar() {
  return (
    <nav className="h-full flex items-center justify-between bg-primary px-lg text-background">
      <NavbarLink text="Home" href="/home">
        <BiSolidHomeHeart fontSize={"35px"} />
      </NavbarLink>
      <NavbarLink text="Agregar" href="/add">
        <AiOutlinePlus fontSize={"38px"} />
      </NavbarLink>
      <NavbarLink text="Mis plantas" href="/plants">
        <ImLeaf fontSize={"30px"} />
      </NavbarLink>
      <NavbarDateLink text="Calendario" href="/calendar">
        <BiSolidCalendar fontSize={"35px"} />
      </NavbarDateLink>
      <NavbarLink text="Motion" href="/motion">
        <ToyBrick fontSize={"35px"} />
      </NavbarLink>
    </nav>
  );
}
