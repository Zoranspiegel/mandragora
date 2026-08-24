"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { usePlantDetails } from "@/hooks/swr/usePlantDetails";
import Image from "next/image";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";
import { PiPottedPlantFill, PiPencilLight } from "react-icons/pi";
import PlantTags from "@/components/plant-tags";

export default function PlantDetails({ plant_id }: { plant_id: string }) {
  const { plant, error, isLoading } = usePlantDetails(plant_id);

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  const lastWatering = plant.waterings.length
    ? new Date(plant.waterings[plant.waterings.length - 1]).toLocaleDateString(
        "es",
        {
          month: "long",
          day: "numeric",
        },
      )
    : "N/A";

  return (
    <div className="flex flex-col gap-4 pt-40">
      <div className="absolute top-0 left-0 right-0 h-[38dvh] -z-10">
        <Image
          src={plant.img}
          alt={plant.scientific || plant.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{plant.name}</CardTitle>
          <CardDescription>{plant.scientific}</CardDescription>
          <CardAction>
            <PiPencilLight />
          </CardAction>
        </CardHeader>

        <CardContent>
          <PlantDetailsAttribute
            type="watering"
            period={plant.watering}
            date={lastWatering}
          />
          <PlantDetailsAttribute
            type="fertilization"
            period={plant.fertilization}
            date={lastWatering}
          />
          <PlantDetailsAttribute
            type="location"
            locationType={plant.location_type}
            locationPlace={plant.location_place}
          />
        </CardContent>
      </Card>

      <PlantTags tags={plant.tags} />

      <Card>
        <CardHeader>
          <CardTitle className="text-leaf">NOTAS</CardTitle>
          <hr className="border border-leaf" />
          <CardAction>
            <PiPencilLight />
          </CardAction>
        </CardHeader>

        <CardContent>
          <ul className="pl-4">
            {plant.notes.map((note) => (
              <li key={note.id} className="list-disc">
                {note.content}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

type PlantDetailsAttributeProps = {
  type: "watering" | "fertilization" | "location";
  period?: number;
  date?: string;
  locationType?: string;
  locationPlace?: string;
};

function PlantDetailsAttribute({
  type,
  period,
  date,
  locationType,
  locationPlace,
}: PlantDetailsAttributeProps) {
  return (
    <div className="flex items-center gap-6">
      {type === "watering" && (
        <BsDropletFill className="text-water" size={30} />
      )}
      {type === "fertilization" && (
        <GiPowderBag className="text-foreground" size={30} />
      )}
      {type === "location" && (
        <PiPottedPlantFill className="text-leaf" size={30} />
      )}
      <div className="flex flex-col">
        <div className="flex gap-2">
          {type === "watering" && <span>Riego cada</span>}
          {type === "fertilization" && <span>Fertilizante cada</span>}
          {period && (
            <>
              <span className="font-bold">{period}</span>
              <span>días</span>
            </>
          )}
          {locationType && (
            <span className="capitalize">{locationType.toLowerCase()}</span>
          )}
        </div>

        <div className="flex gap-2">
          {type === "watering" && <span>Último riego:</span>}
          {type === "fertilization" && <span>Última fertilización:</span>}
          {date && <span className="font-bold">{date}</span>}
          {locationPlace && <span className="font-bold">{locationPlace}</span>}
        </div>
      </div>
    </div>
  );
}
