import type { CalendarTile } from "@/types";
import EventPlant from "./event-plant";

export default function PlantsEvents({ tile }: { tile: CalendarTile }) {
  return (
    <>
      {!tile.events.plants.length && (
        <p>No hay plantas por regar o fertilizar en este día.</p>
      )}
      {tile.events.plants.map((plant) => {
        const wateringDay =
          plant.next_watering && new Date(plant.next_watering).getDate();
        const wateringMonth =
          plant.next_watering && new Date(plant.next_watering).getMonth() + 1;
        const fertilizationDay =
          plant.next_fertilization &&
          new Date(plant.next_fertilization).getDate();
        const fertilizationMonth =
          plant.next_fertilization &&
          new Date(plant.next_fertilization).getMonth() + 1;

        const needsWater =
          wateringDay === tile.day && wateringMonth === tile.month;
        const needsFertilization =
          fertilizationDay === tile.day && fertilizationMonth === tile.month;

        return (
          <EventPlant
            key={plant.id}
            plant={plant}
            needsWater={needsWater}
            needsFertilization={needsFertilization}
          />
        );
      })}
    </>
  );
}
