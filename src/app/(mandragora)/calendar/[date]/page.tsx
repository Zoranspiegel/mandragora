import Calendar from "./calendar";

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  console.log(date);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-heading">CalendarPage</h1>
      <Calendar date={date} />
    </div>
  );
}
