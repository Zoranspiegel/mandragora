import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import type { CalendarPlant, CalendarTile } from "@/types";
import { SetStateAction } from "react";
import Image from "next/image";

interface ComponentProps {
  tile: CalendarTile;
  setEventsVisibility: React.Dispatch<SetStateAction<boolean>>;
}

export default function CalendarEvents({
  tile,
  setEventsVisibility,
}: ComponentProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-10">
      <Card className="max-w-sm">
        <CardTitle>Eventos</CardTitle>
        <CardAction>
          <Button variant="icon" onClick={() => setEventsVisibility(false)}>
            <X />
          </Button>
        </CardAction>
        <CardContent>
          {!tile.events.plants.length && (
            <p>No hay plantas por regar o fertilizar en este día.</p>
          )}
          {tile.events.plants.map((plant) => (
            <EventPlant key={plant.id} plant={plant} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function EventPlant({ plant }: { plant: CalendarPlant }) {
  return (
    <div className="h-14 flex items-center justify-between">
      <div className="h-full flex gap-2 items-center">
        <div className="relative h-full aspect-square rounded-xl overflow-hidden">
          <Image src={plant.img} alt={plant.name} fill />
        </div>
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-bold">{plant.name}</h3>
          <h4 className="italic">{plant.scientific}</h4>
        </div>
      </div>

      <div className="h-full flex items-center gap-2">BTN</div>
    </div>
  );
}
