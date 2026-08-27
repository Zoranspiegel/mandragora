import type { CalendarTile } from "@/types";
import { cn } from "@/lib/utils";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import { useState } from "react";
import CalendarEvents from "./calendar-events";

export default function CalendarTile({
  tile,
  date,
}: {
  tile: CalendarTile;
  date: string;
}) {
  const [eventsVisibility, setEventsVisibility] = useState(false);
  const cursor =
    tile.day === +date.split("-")[0] &&
    tile.month === +date.split("-")[1] &&
    (tile.events.water || tile.events.fertilize);

  return (
    <>
      <div
        className={cn(
          "w-full aspect-[1/1.3] flex flex-col items-center justify-between rounded-lg bg-white p-1 font-heading select-none cursor-pointer",
          cursor && "animate-shake",
          tile.outline === "outside" && "opacity-50",
          tile.outline === "today" &&
            "border-2 border-leaf text-leaf font-bold",
        )}
        onClick={() => setEventsVisibility(true)}
      >
        <span className="text-lg">{tile.day}</span>
        <div className="flex items-center justify-center">
          {tile.events.water && <BsDropletFill className="text-water" />}
          {tile.events.fertilize && <GiPowderBag className="text-leaf" />}
        </div>
      </div>
      {eventsVisibility && (
        <CalendarEvents tile={tile} setEventsVisibility={setEventsVisibility} />
      )}
    </>
  );
}
