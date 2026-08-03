import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import type { WarningPlant } from "@/types";

export function useWarningPlants() {
  const { data, ...args } = useSWR("/api/plants/warning", fetcher);

  return {
    warningPlants: data as WarningPlant[],
    ...args,
  };
}
