import Calendar from "./calendar";

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-heading">Calendario</h1>
      <Calendar date={date} />
    </div>
  );
}
