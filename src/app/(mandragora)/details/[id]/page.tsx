import PlantDetails from "./plant-details";

export default async function PlantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col">
      <PlantDetails plant_id={id} />
    </div>
  );
}
