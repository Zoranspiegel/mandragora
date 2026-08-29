"use client";

import type { ModalContextValue } from "@/types";
import PlantsEvents from "@/app/(mandragora)/calendar/[date]/plants-events";
import Dialog from "@/components/ui/dialog";
import {
  initialState,
  modalContextReducer,
} from "@/reducers/modal-context-reducer";
import { createContext, useContext, useReducer } from "react";
import CaringPlant from "@/components/caring-plant";

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(modalContextReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
      <Dialog
        title={state.modalTitle}
        open={state.modalType !== null}
        onClose={() => dispatch({ type: "CLOSE" })}
      >
        {state.modalType === "events" && state.calendarTile && (
          <PlantsEvents tile={state.calendarTile} />
        )}
        {state.modalType === "confirm_watering" && <CaringPlant need="water" />}
        {state.modalType === "confirm_fertilization" && <CaringPlant need="fertilization" />}
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("useModalContext must be used inside ModalContextProvider");

  return context;
}
