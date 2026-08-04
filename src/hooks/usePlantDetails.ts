import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { PlantDetails } from "@/types";

export function usePlantDetails(plant_id: string) {
  const { data, ...args } = useSWR(`/api/plants/${plant_id}`, fetcher);

  return {
    plant: data as PlantDetails,
    ...args,
  };
}
