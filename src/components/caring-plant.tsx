import { PlantNeed } from "@/types";
import { Button } from "./ui/button";
import { useModalContext } from "@/contexts/modal-context";

export default function CaringPlant({ need }: { need: PlantNeed }) {
  const { dispatch } = useModalContext();

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg">¿Deseas {defineVerb(need)} tu planta?</h3>
      <div className="w-full flex justify-around">
        <Button variant="icon" className="border-2 min-w-30 rounded-full">Si</Button>
        <Button
          variant="icon"
          className="border-2 min-w-30 rounded-full"
          onClick={() => dispatch({ type: "BACK_TO_EVENTS" })}
        >
          No
        </Button>
      </div>
    </div>
  );
}

function defineVerb(need: PlantNeed) {
  switch (need) {
    case "water":
      return "regar";
    case "fertilization":
      return "fertilizar";
  }
}
