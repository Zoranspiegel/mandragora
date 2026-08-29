"use client";

import type { PlantNeed } from "@/types";
import { GiWateringCan, GiFertilizerBag } from "react-icons/gi";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useModalContext } from "@/contexts/modal-context";

interface ComponentProps {
  need: PlantNeed;
  plantId: string;
}

export default function CaringButton({ need, plantId }: ComponentProps) {
  const { dispatch } = useModalContext();

  function handleClick() {
    switch (need) {
      case "water":
        return dispatch({
          type: "CONFIRM_WATERING",
          payload: plantId,
        });

      case "fertilization":
        return dispatch({
          type: "CONFIRM_FERTILIZATION",
          payload: plantId,
        });
    }
  }

  return (
    <Button
      variant="icon"
      className={cn(
        "rounded-full border-4 border-double border-white text-white text-3xl shadow-md",
        need === "water" && "bg-water",
        need === "fertilization" && "bg-leaf text-2xl",
      )}
      onClick={handleClick}
    >
      {need === "water" && <GiWateringCan />}
      {need === "fertilization" && <GiFertilizerBag />}
    </Button>
  );
}
