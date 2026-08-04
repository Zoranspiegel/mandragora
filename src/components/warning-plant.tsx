import dateFormater from "@/lib/dateFormater";
import type { WarningPlant } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import NeedTag from "./need-tag";

export default function WarningPlant({
  separator,
  plant,
}: {
  separator: boolean;
  plant: WarningPlant;
}) {
  const urgencyDate = dateFormater(new Date(plant.urgency).getTime());

  return (
    <>
      {separator && <hr />}
      <div className="h-warning-item flex items-center justify-between gap-2">
        <div className="relative h-full aspect-square rounded-xl overflow-hidden">
          <Image src={plant.img} fill alt={plant.name} />
        </div>

        <div className="h-full flex flex-1 flex-col justify-between">
          <div className="text-foreground font-bold">
            <h2 className="font-bold">{plant.name}</h2>
            <h3 className="text-sm text-muted-foreground">
              {plant.scientific}
            </h3>
          </div>
          <div className="flex gap-2">
            {plant.needs.map((need, i) => (
              <NeedTag key={i} need={need} />
            ))}
          </div>
        </div>

        <Link href={`/calendar/${urgencyDate}`}>
          <IoIosArrowForward />
        </Link>
      </div>
    </>
  );
}
