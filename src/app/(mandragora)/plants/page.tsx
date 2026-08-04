import PlantsCards from "@/components/plants-cards";

export default function PlantsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-4xl">Mis Plantas</h1>
      <PlantsCards />
    </div>
  );
}
