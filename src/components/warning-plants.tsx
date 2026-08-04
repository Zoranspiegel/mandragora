"use client";

import { useWarningPlants } from "@/hooks/swr/useWarningPlants";
import { PiSealWarningFill, PiSealCheckFill } from "react-icons/pi";
import { Card } from "./ui/card";
import WarningPlant from "./warning-plant";

export default function WarningPlants() {
  const { warningPlants, isLoading, error } = useWarningPlants();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <Card>
      <div className="flex items-center gap-1 mb-4 text-lg font-bold">
        {warningPlants.length === 0 ? (
          <>
            <PiSealCheckFill />
            <p>Todas tus plantas están atendidas</p>
          </>
        ) : (
          <>
            <PiSealWarningFill />
            <p> Tus plantas necesitan tu cuidado</p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {warningPlants.map((plant, i) => (
          <WarningPlant key={plant.id} separator={i !== 0} plant={plant} />
        ))}
      </div>
    </Card>
  );
}
