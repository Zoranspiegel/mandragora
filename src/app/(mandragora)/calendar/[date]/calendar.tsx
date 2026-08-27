"use client";

import { useCalendar } from "@/hooks/swr/useCalendar";

export default function Calendar({ date }: { date: string }) {
  const { calendar, error, isLoading } = useCalendar(date);

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  console.log("API_RESPONSE: ");
  console.log(calendar);

  return (
    <div>
      <h1>{date}</h1>
    </div>
  );
}
