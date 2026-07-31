"use client";

import { usePlantsCards } from "@/hooks/swr/usePlantsCards";
import PlantCard from "./plant-card";

export default function PlantsCards() {
  const { plants, isLoading, error } = usePlantsCards();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
