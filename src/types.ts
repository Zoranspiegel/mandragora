import { Prisma } from "../generated/prisma/client";

export type WarningPlantNeed = "regar" | "fertilizar";

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

export type PlantDetails = Prisma.PlantGetPayload<{
  include: {
    tags: true;
    notes: true;
  };
}>;
