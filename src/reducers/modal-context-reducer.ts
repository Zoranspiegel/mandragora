import type { ModalContextAction, ModalContextState } from "@/types";

export const initialState: ModalContextState = {
  modalType: null,
  modalTitle: "",
  plantId: null,
  calendarTile: null,
};

export function modalContextReducer(
  state: ModalContextState,
  action: ModalContextAction,
): ModalContextState {
  switch (action.type) {
    case "EVENTS":
      return {
        ...state,
        modalType: "events",
        modalTitle: "Eventos",
        calendarTile: action.payload,
      };

    case "CONFIRM_WATERING":
      return {
        ...state,
        modalType: "confirm_watering",
        modalTitle: "Riego",
        plantId: action.payload,
      };

    case "CONFIRM_FERTILIZATION":
      return {
        ...state,
        modalType: "confirm_fertilization",
        modalTitle: "Fertilización",
        plantId: action.payload,
      };

    case "BACK_TO_EVENTS":
      return {
        ...state,
        modalType: "events",
        modalTitle: "Eventos",
      };

    case "CLOSE":
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
}
