import CaringButton from "@/components/caring-button";
import type { CalendarPlant } from "@/types";
import Image from "next/image";

interface ComponentProps {
  plant: CalendarPlant;
  needsWater: boolean;
  needsFertilization: boolean;
}

export default function EventPlant({
  plant,
  needsWater,
  needsFertilization,
}: ComponentProps) {
  return (
    <div className="relative h-14 flex items-center justify-between">
      <div className="h-full flex gap-2 items-center">
        <div className="relative h-full aspect-square rounded-xl overflow-hidden">
          <Image src={plant.img} alt={plant.name} fill />
        </div>
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-bold">{plant.name}</h3>
          <h4 className="italic">{plant.scientific}</h4>
        </div>
      </div>

      <div className="h-full flex items-center gap-1">
        {needsWater && <CaringButton need="water" plantId={plant.id} />}
        {needsFertilization && <CaringButton need="fertilization" plantId={plant.id} />}
      </div>
    </div>
  );
}
