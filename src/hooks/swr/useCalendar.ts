import type { Calendar } from "@/types";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useCalendar(date: string) {
  const { data, ...args } = useSWR(`/api/calendar/${date}`, fetcher);

  return {
    calendar: data as Calendar,
    ...args
  }
}
