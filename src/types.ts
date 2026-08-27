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

export interface CalendarPlant extends Prisma.PlantGetPayload<{
  select: {
    id: true;
    name: true;
    scientific: true;
    img: true;
  };
}> {
  next_fertilization?: Date;
  next_watering?: Date;
}

export interface CalendarTile {
  month: number;
  day: number;
  outline: "inside" | "outside" | "today";
  events: {
    water: boolean;
    fertilize: boolean;
    plants: CalendarPlant[];
  };
}

type WeekDay = "Lun" | "Mar" | "Mie" | "Jue" | "Vie" | "Sab" | "Dom";

export interface Calendar {
  year: number;
  month: string;
  weekDays: WeekDay[];
  calendar: CalendarTile[][]
}
