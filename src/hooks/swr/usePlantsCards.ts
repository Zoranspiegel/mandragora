import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { Plant } from "../../../generated/prisma/client";

export function usePlantsCards() {
  const { data, ...args } = useSWR("/api/plants", fetcher);

  return {
    plants: data as Plant[],
    ...args,
  };
}
