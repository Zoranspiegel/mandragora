"use client";

import { usePlantsCards } from "@/hooks/swr/usePlantsCards";
import PlantCard from "./plant-card";
import Link from "next/link";

export default function PlantsCards() {
  const { plants, isLoading, error } = usePlantsCards();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold">Tus plantas</h2>
        <Link href="/plants" className="text-sm text-muted-foreground font-bold">
          Ver todas
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}
