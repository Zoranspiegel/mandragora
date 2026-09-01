import AddPlantForm from "./add-plant-form";

export default function AddPlantPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-4xl">Agregar Planta</h1>
      <AddPlantForm />
    </div>
  );
}
