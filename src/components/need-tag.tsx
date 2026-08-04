import { cn } from "@/lib/utils";
import { WarningPlantNeed } from "@/types";
import { GiPowderBag } from "react-icons/gi";
import { BsDropletFill } from "react-icons/bs";

export default function NeedTag({ need }: { need: WarningPlantNeed }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 text-sm text-primary-foreground font-bold",
        need === "fertilizar" && "bg-leaf",
        need === "regar" && "bg-water",
      )}
    >
      {need === "fertilizar" && <GiPowderBag />}
      {need === "regar" && <BsDropletFill />}
      <span className="capitalize">{need}</span>
    </div>
  );
}
