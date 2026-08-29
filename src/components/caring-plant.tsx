import { PlantNeed } from "@/types";
import { Button } from "./ui/button";
import { useModalContext } from "@/contexts/modal-context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCalendar } from "@/hooks/swr/useCalendar";
import { usePathname } from "next/navigation";
import LoadingButton from "./ui/loading-button";

export default function CaringPlant({ need }: { need: PlantNeed }) {
  const pathname = usePathname();
  const date = pathname.split("/")[2];
  const { mutate } = useCalendar(date);
  const { state, dispatch } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function carePlant() {
    setIsLoading(true);

    const res = await fetch(`/api/plants/${state.plantId}/${need}`, {
      method: "PUT",
    });

    if (res.ok) {
      mutate();
      dispatch({ type: "CARING_SUCCESS" });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(true);
    }
  }

  if (error)
    return (
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl">Algo salió mal...</h2>
        <LoadingButton loading={isLoading} variant="leaf" onClick={carePlant}>
          Inténtalo de nuevo
        </LoadingButton>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg">¿Deseas {defineVerb(need)} tu planta?</h3>
      <div className="w-full flex justify-around">
        {!isLoading ? (
          <>
            <Button
              variant="icon"
              className="border-2 min-w-30 rounded-full"
              onClick={carePlant}
            >
              Si
            </Button>
            <Button
              variant="icon"
              className="border-2 min-w-30 rounded-full"
              onClick={() => dispatch({ type: "BACK_TO_EVENTS" })}
            >
              No
            </Button>
          </>
        ) : (
          <Loader2 className="animate-spin" />
        )}
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
