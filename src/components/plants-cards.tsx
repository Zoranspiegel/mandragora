"use client";

import { usePlantsCards } from "@/hooks/swr/usePlantsCards";
import PlantCard from "./plant-card";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PlantsCards() {
  const pathname = usePathname();
  const { plants, isLoading, error } = usePlantsCards();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  const modPlants = pathname === "/home" ? plants.slice(0, 4) : plants;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {modPlants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
      {!plants.length && (
        <div className="w-full flex flex-col items-center mt-20 opacity-60">
          <Image
            src="/assets/images/plantHome.png"
            alt="plant"
            width={200}
            height={363}
          />
          <p className="text-lg font-bold">Aún no has agregado plantas</p>
        </div>
      )}
    </div>
  );
}
