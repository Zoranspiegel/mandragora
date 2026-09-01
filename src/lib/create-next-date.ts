export function createNextDate(frequency: number, dates: string[]) {
  const MILLISECOND_TIME = 1000;
  const SECOND_TIME = 60;
  const MINUTE_TIME = 60;
  const HOUR_TIME = 24;

  const lastDateTime = new Date(dates[dates.length - 1]).getTime();

  if (!lastDateTime) throw new Error("Invalid date");

  const nextDateTime =
    lastDateTime +
    MILLISECOND_TIME * SECOND_TIME * MINUTE_TIME * HOUR_TIME * frequency;

  return new Date(nextDateTime).toISOString();
}
