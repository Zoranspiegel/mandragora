import { Prisma } from "../generated/prisma/client";

type WarningPlantNeed = "regar" | "fertilizar";

export interface WarningPlant extends Prisma.PlantGetPayload<{
  select: {
    id: true;
    name: true;
    scientific: true;
    img: true;
  };
}> {
  urgency: Date;
  needs: WarningPlantNeed[];
}
