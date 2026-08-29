"use client";

import { useCalendar } from "@/hooks/swr/useCalendar";
import CalendarTile from "./calendar-tile";

export default function Calendar({ date }: { date: string }) {
  const { calendar, error, isLoading } = useCalendar(date);

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="capitalize">
        {calendar.month} {calendar.year}
      </h2>

      <div>
        <div className="flex justify-between">
          {calendar.weekDays.map((day) => (
            <div key={day} className="w-full text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {calendar.calendar.map((row, i) => (
            <div key={i} className="flex justify-between gap-3">
              {row.map((tile, j) => (
                <CalendarTile key={j + tile.day} tile={tile} date={date} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
