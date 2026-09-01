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
  calendar: CalendarTile[][];
}

export type PlantNeed = "water" | "fertilization";

export type ModalT =
  | "confirm_watering"
  | "confirm_fertilization"
  | "events"
  | "caring_success"
  | null;

export type ModalTitle = "Eventos" | "Riego" | "Fertilización" | "";

export interface ModalContextState {
  modalType: ModalT;
  modalTitle: ModalTitle;
  calendarTile: CalendarTile | null;
  plantId: string | null;
}

export type ModalContextAction =
  | { type: "CONFIRM_WATERING"; payload: string }
  | { type: "CONFIRM_FERTILIZATION"; payload: string }
  | { type: "EVENTS"; payload: CalendarTile }
  | { type: "BACK_TO_EVENTS" }
  | { type: "CARING_SUCCESS" }
  | { type: "CLOSE" };

export interface ModalContextValue {
  state: ModalContextState;
  dispatch: React.Dispatch<ModalContextAction>;
}

export interface NewImage {
  img: string;
  img_width: number;
  img_height: number;
}
